//***************************************************************************************************
// Projeto......: ByteDoBem   
// Site.........: www.bytedobem.com   
// Aplicativo...: Evangelho365    
// Modulo.......: evangelho365.js
// Autor........: Nivaldo   
// Data.........: 25/10/2017   
//***************************************************************************************************
// Versao 001-25/10/2017-(Nivaldo) Implantação.
//***************************************************************************************************
//
//      **-- DADOS ARMAZENADOS NA SESSIONSTORAGE --**
//      **------------------------------------------*      
//
//      **-- Dados de usuario logado --**
//      sessionStorage.ev365_telaBenvindo     --> "S" ou "N"
//      sessionStorage.ev365_leituraAtiva     --> "S" ou "N"
//      sessionStorage.ev365_tipoLogin        --> local ou google ou facebook
//      sessionStorage.ev365_emailLogin       --> email do usuario (se google ou facebook)
//
//      **-- Dados das Leituras --**
//      sessionStorage.ev365_dataInicial      --> data inicial das leituras temporaria
//      sessionStorage.ev365_arrayLidas       --> array de lidas temporario
//
//      **-- DADOS ARMAZENADOS NA LOCALSTORAGE --**
//      **------------------------------------------*      
//
//      **-- Dados das Leituras --**
//      localStorage(ev365_temRegistro)       --> "S" para tem dados gravados
//      localStorage(ev365_dataInicial)       --> data inicial das leituras temporaria
//      localStorage(ev365_arrayLidas)        --> array de lidas temporario
//
//***************************************************************************************************
console.log("evangelho365.js> **** Esta Carregando o evangelho365.js ****");

var ws_temLogado    = "N";
var ws_loginSession = "local";
var ws_emailSession = "-";       
var ws_nameSession  = "-";       
var ws_imageSession = "-";       

var ws_numHoje = 0;               // Leitura para hoje
var ws_numPend = 0;               // Primeira leitura pendente

var ws_dataInicial;               // data inicial das leituras (sem formatar)
var ws_dataAtual;                 // data de hoje (sem formatar)
var ws_dataInicialLocal;          // data inicial das leituras (formatada)
var ws_dataAtualLocal;            // data de hoje (formatada)
var ws_arrayDatas = new Array();  // array de leituras lidas
var ws_arrayLidas = new Array();  // array de leituras lidas
var ws_quantidadeLidas = 0;       // quantidade de leituras já lidas

var ws_inicializar = "N";         // indicador para reinicializar leituras

/* ########################################################################################
   ########################################################################################
                                   CARGA DA PAGINA (READY)
   ########################################################################################
######################################################################################## */

$(document).ready(function(){
    console.log("evangelho365.js> **** Esta Executando o Ready ****");


    /*======== EXECUTA O PADRAO.JS ========*/
    /*=====================================*/

    iniciaPadrao("evangelho365"); 


    /*======== GUARDA A URL DA PAGINA NA SESSIONSTORAGE ========*/
    /*==========================================================*/

    sessionStorage.urlPage = window.location.href;     // Returns full URL
    console.log("evangelho365.js> sessionStorage.urlPage: " + sessionStorage.urlPage);


    /*======== DECODIFICA E TRATA OS PARAMETROS DA URL ========*/
    /*=========================================================*/

    var pageURL , numDia;
    var vars = [];
    vars = decodificaURL();
    pageURL  = vars["page"];
    numDia   = vars["ndia"];
    console.log("evangelho365.js> pageURL original: " + pageURL);
    console.log("evangelho365.js> numDia  original: " + numDia);
    if ( pageURL == undefined || pageURL == null || pageURL == "" ) {
        pageURL  = "home";
    };
    if ( numDia == undefined || numDia == null || numDia == "" ) {
        numDia = 0;
    };
    if ( pageURL == "leitura" ) {
        console.log("parametro numDia: " + typeof numDia);
        if ( isNaN(numDia) ) {
            console.log("parametro numDia: Entrou no NaN");
            pageURL = "home";
            numDia = 0;
        } else {   
            if ( numDia <= 0 || numDia > 365 ) {
                console.log("parametro numDia: Entrou no <= ou >");
                pageURL = "home";
                numDia = 0;
            };
        };
    };
    if ( pageURL == "home" || pageURL == "ajuda" || pageURL == "sobre" || pageURL == "leitura" || pageURL == "status" || pageURL == "restart" ) {
        console.log("evangelho365.js> page a ser executado: " + pageURL);
    } else {
        pageURL  = "home";
    };
    if ( pageURL == "home" || pageURL == "ajuda" || pageURL == "sobre" || pageURL == "status" || pageURL == "restart" ) {
        numDia = 0;
    }
    if ( sessionStorage.ev365_telaBenvindo != "S" ) {
        sessionStorage.ev365_telaBenvindo = "S";
        pageURL  = "benvindo";
    };
    console.log("evangelho365.js> pageURL final...: " + pageURL);
    console.log("evangelho365.js> numDia  final...: " + numDia);


    /*======== CARREGA E TRATA A PAGINA HTML DA PAGEURL ========*/
    /*==========================================================*/

    $.get(pageURL + ".html", function(data, status){
        console.log("evangelho365.js> get(pageURL) status: " + status);
        if ( status === "success" ) {
            $("#corpoPagina").html(data);
            /*-- trata as especifidades da pagina --*/
            switch( pageURL ) {
                case "home":
                    carregaHome();
                    break;
                case "leitura":
                    carregaLeitura(numDia);
                    break;
                case "benvindo":
                    carregaBenvindo();
                    break;
                case "status":
                    break;
                case "restart":
                    break;
                case "ajuda":
                    break;
                case "sobre":
                    break;
                default:
            } 
        } else {
            data = "<h3>Erro: Não foi possível carregar a pagina " + pageURL + ".html...</h3>";
            $("#corpoPagina").html(data);
        }
    });


    /*======== REALÇA NO MENU A PAGINA ATIVA ========*/
    /*===============================================*/
    
    $( "#id_menuhome"  ).removeClass( "active" );
    $( "#id_menuajuda" ).removeClass( "active" );
    $( "#id_menusobre" ).removeClass( "active" );
    if ( pageURL == "home" || pageURL == "benvindo" || pageURL == "leitura" ) {
        $( "#id_menuhome" ).addClass( "active" );
    };
    if ( pageURL == "ajuda" || pageURL == "sobre" ) {
        $( "#id_menu" + pageURL ).addClass( "active" );
    };


    /*
    $("#btn-calcular").click(function(){
        console.log("Clicou em calcular...");
        // $(this).hide();
    });

    $("#btn-limpar").click(function(){
        console.log("Clicou em limpar...");
        // $(this).hide();
    });
    */

});

/* ########################################################################################
   ########################################################################################
                                      CARREGA A PAGINA "HOME"
   ########################################################################################
######################################################################################## */


/*--------------------*/
function carregaHome() {
/*--------------------*/
    console.log("evangelho365> Executando carregaHome()");

    var temLeitor    = "S";
    var loginLeitura = "-";     // tipo de login carregado na Leitura
    var emailLeitura = "-";     // email do usuario carregado na Leitura       

    var validado;

    console.log("evangelho365> sessionStorage.ev365_leituraAtiva..: " + sessionStorage.ev365_leituraAtiva);
    if ( sessionStorage.ev365_leituraAtiva == "S" ) {
        /*-- Se tiver leitura ativa verifica o tipo de usuario e email que está lendo --*/
        validado = "S";
        if ( sessionStorage.ev365_tipoLogin == "local" ||
             sessionStorage.ev365_tipoLogin == "google" || 
             sessionStorage.ev365_tipoLogin == "facebook" ) {
            loginLeitura = sessionStorage.ev365_tipoLogin;
            if ( sessionStorage.ev365_emailLogin !== undefined ) {
                emailLeitura = sessionStorage.ev365_emailLogin;
            } else {
                validado = "N";
            };       
        } else {
            validado = "N";
        };
        if ( validado == "N" ) {
            temLeitor = "N";
            loginLeitura = "local";
            emailLeitura = "-";       
        };
    } else {
        temLeitor = "N";
        loginLeitura = "local";
        emailLeitura = "-";       
    };
    console.log("evangelho365> tem Leitor.......: " + temLeitor);
    

    /*-- Verifica o usuario e email que está logado no sistema --*/
    verificaUserLogado();
    console.log("evangelho365> tem Logado.......: " + ws_temLogado);
    console.log("Usuario ---> Leitura: " + loginLeitura + " Logado: " + ws_loginSession);
    console.log("Email   ---> Leitura: " + emailLeitura + " Logado: " + ws_emailSession);


    /*-- Se tiver leitor verifica se continua o mesmo que está logado/não logado --*/
    if ( temLeitor == "S" ) {
        console.log("evangelho365> Vai validar se o leitor continua o mesmo");
        if ( loginLeitura != ws_loginSession || emailLeitura != ws_emailSession ) {
            console.log("evangelho365> Usuario não é o mesmo que estava lendo...");
            temLeitor = "N";
        };
    };
    

    /*-- Se tiver leitor verifica se os registros da Session são validos --*/
    if ( temLeitor == "S" ) {
        console.log("evangelho365> Vai validar os dados gravados na sessionStorage: dtIni e Lidas");
        if ( sessionStorage.ev365_dataInicial == undefined ) {
            console.log("evangelho365> ev365_dataInicial está undefined...");
            temLeitor = "N";
        };
        if ( sessionStorage.ev365_arrayLidas == undefined ) {
            console.log("evangelho365> ev365_arrayLidas está undefined...");
            temLeitor = "N";
        };
    };


    /*-- Carrega os dados da session, da local ou do google/facebook --*/
    ws_inicializar = "N";
    if ( temLeitor == "S" ) {
        console.log("evangelho365> Vai usar os dados gravados na sessionStorage...");
        ws_dataInicial = new Date(sessionStorage.ev365_dataInicial);
        ws_arrayLidas  = converteLidasEmArray(sessionStorage.ev365_arrayLidas);
    } else {
        // Obs.: se houve erro no resgate dos dados mover "S" para ws_inicializar
        if ( ws_temLogado == "S" ) {
            console.log("evangelho365> Vai carregar os dados do Logado Google ou Face...");
            carregaDadosLogado();
        } else {
            console.log("evangelho365> Vai carregar os dados da localStorage...");
            carregaDadosLocalStorage();
        };
    };
    console.log("evangelho365> ws_inicializar..........: " + ws_inicializar);
    console.log("evangelho365> ws_dataInicial a validar: " + ws_dataInicial);
    console.log("evangelho365> ws_arrayLidas...........: " + ws_arrayLidas);
    console.log("evangelho365> ws_arrayLidas[1]........: " + ws_arrayLidas[1]);
    console.log("evangelho365> ws_arrayLidas[2]........: " + ws_arrayLidas[2]);
    console.log("evangelho365> ws_arrayLidas[365]......: " + ws_arrayLidas[365]);
    console.log("evangelho365> ws_arrayLidas  a validar: " + ws_arrayLidas.length);


    /*-- Valida os dados carregados ws_dataInicial e ws_arrayLidas --*/
    if ( ws_inicializar == "N" ) {
        if ( ws_dataInicial == undefined ) {
            console.log("evangelho365> Entrou no IF do ws_dataInicial == undefined");
            ws_inicializar = "S";
        };
        if ( ws_arrayLidas == undefined ) {
            console.log("evangelho365> Entrou no IF do ws_arrayLidas == undefined");
            ws_inicializar = "S";
        };
        if ( ws_arrayLidas.length < 366 || ws_arrayLidas.length > 366 ) {
            console.log("evangelho365> Entrou no IF do ws_arrayLidas.length <> 366");
            ws_inicializar = "S";
        };
    };


    /*-- Inicializa as Leituras de necessário --*/
    if ( ws_inicializar == "S" ) {
        console.log("evangelho365> Vai inicializar ws_dataInicial e ws_arrayLidas...");
        ws_dataInicial = new Date(); 
        ws_arrayLidas = converteLidasEmArray("");
        gravaLeituraNaSession();
        gravaLeituraNoUsuario();
    };
    console.log("evangelho365> ******* DADOS A SEREM UTILIZADOS *******");
    console.log("evangelho365> ws_dataInicial carregado: " + ws_dataInicial);
    console.log("evangelho365> ws_arrayLidas  carregado: " + ws_arrayLidas.length);
    console.log("evangelho365> ****************************************");


    /*-- Carrega as leituras de Hoje e Pendente --*/
    carregaNumHojePend();
    console.log("evangelho365> Qtde ws_arrayDatas....: " + ws_arrayDatas.length);


    /*-- Move os numeros das Leituras para as URLs da pagina home --*/   
    $("#id_leituraDoDia").attr("href", "index.html?page=leitura&ndia=" + ws_numHoje); 
    $("#id_leituraPendente").attr("href", "index.html?page=leitura&ndia=" + ws_numPend); 
    $("#id_inicioLeituras").text(ws_dataInicialLocal); 
    $("#id_quantidadeLidas").text(ws_quantidadeLidas); 

    if ( ws_temLogado == "S" ) {
//        $( "#id_boxLeitorLogado" ).hide();

//        $( "#id_userImage" ).  src="https://lh3.googleusercontent.com/-zg5PuHuJL_8/AAAAAAAAAAI/AAAAAAAAADg/w0QbffyEuN0/s96-c/photo.jpg">
        $( "#id_userName" ).text( "Nivaldo Hydalgo" );
        $( "#id_userEmail" ).text( "nivaldohydalgo@gmail.com" );

    };


};


/*---------------------------*/
function carregaDadosLogado() {
/*---------------------------*/
    console.log("evangelho365> Executando carregaDadosLogado()");


    // usar ws_loginSession e ws_emailSession

    // Implementar a consulta aos dados do Logado
    ws_inicializar = "S";

};


/*---------------------------------*/
function carregaDadosLocalStorage() {
/*---------------------------------*/
    console.log("evangelho365> Executando carregaDadosLocalStorage()");

    console.log("evangelho365> localStorage: ev365_temRegistro..: " + localStorage.getItem("ev365_temRegistro"));
    console.log("evangelho365> localStorage: ev365_dataInicial..: " + localStorage.getItem("ev365_dataInicial"));
    console.log("evangelho365> localStorage: ev365_arrayLidas...: " + localStorage.getItem("ev365_arrayLidas"));

    if ( localStorage.getItem("ev365_temRegistro") == undefined ) {
        console.log("evangelho365> localStorage: temRegistro é undefined");
        ws_inicializar = "S";
    };
    if ( localStorage.getItem("ev365_temRegistro") == null ) {
        console.log("evangelho365> localStorage: temRegistro é null");
        ws_inicializar = "S";
    };

    if ( localStorage.getItem("ev365_dataInicial") == undefined ) {
        console.log("evangelho365> localStorage: dataInicial é undefined");
        ws_inicializar = "S";
    };
    if ( localStorage.getItem("ev365_dataInicial") == null ) {
        console.log("evangelho365> localStorage: dataInicial é null");
        ws_inicializar = "S";
    };

    if ( localStorage.getItem("ev365_arrayLidas") == undefined ) {
        console.log("evangelho365> localStorage: arrayLidas é undefined");
        ws_inicializar = "S";
    };
    if ( localStorage.getItem("ev365_dataInicial") == null ) {
        console.log("evangelho365> localStorage: arrayLidas é null");
        ws_inicializar = "S";
    };

    if ( ws_inicializar == "N" ) {
        var temReg = localStorage.getItem("ev365_temRegistro");
        console.log("evangelho365> temReg..: " + temReg);

        if ( temReg == "S" ) {
            ws_dataInicial = new Date(localStorage.getItem("ev365_dataInicial"));
            ws_arrayLidas  = converteLidasEmArray(localStorage.getItem("ev365_arrayLidas"));

            if ( ws_dataInicial == undefined ) {
                console.log("evangelho365> localStorage: ws_dataInicial undefined");
                ws_inicializar = "S";
            };
            if ( ws_dataInicial == null ) {
                console.log("evangelho365> localStorage: ws_dataInicial null");
                ws_inicializar = "S";
            };
            if ( ws_arrayLidas == undefined ) {
                console.log("evangelho365> localStorage: ws_arrayLidas undefined");
                ws_inicializar = "S";
            };
            if ( ws_arrayLidas == null ) {
                console.log("evangelho365> localStorage: ws_arrayLidas null");
                ws_inicializar = "S";
            };
            if ( ws_inicializar == "N" ) {
                if ( ws_arrayLidas.length < 366 || ws_arrayLidas.length > 366 ) {
                    console.log("evangelho365> localStorage: ws_arrayLidas <> 366");
                    ws_inicializar = "S";
                };
            };
        } else {
            console.log("evangelho365> localStorage: Não tem registro");
            ws_inicializar = "S";
        };
    };

};


/*------------------------------*/
function gravaLeituraNaSession() {
/*------------------------------*/
    console.log("evangelho365> Executando gravaLeituraNaSession()");

    /*-- Grava na Session a Leitura Inicializada --*/
    sessionStorage.ev365_leituraAtiva = "S";
    sessionStorage.ev365_tipoLogin    = ws_loginSession;
    if ( ws_loginSession == "local ") {
        sessionStorage.ev365_emailLogin   = "-";
    } else {
        sessionStorage.ev365_emailLogin   = ws_emailSession;
    };
    sessionStorage.ev365_dataInicial  = new Date(ws_dataInicial);
    sessionStorage.ev365_arrayLidas   = converteLidasEmString(ws_arrayLidas);
    console.log("evangelho365> Gravou dados inicializados na sessionStorage...");

};


/*------------------------------*/
function gravaLeituraNoUsuario() {
/*------------------------------*/
    console.log("evangelho365> Executando gravaLeituraNoUsuario()");

    switch( sessionStorage.ev365_tipoLogin ) {
        case "google":

            // implementar a gravadao de ws_dataInicial e ws_arrayLidas para o ws_emailSession
        
            console.log("evangelho365> Gravou dados inicializados no Google (implementar)...");
            break;
        case "facebook":

            // implementar a gravadao de ws_dataInicial e ws_arrayLidas para o ws_emailSession
        
            console.log("evangelho365> Gravou dados inicializados no Facebook (implementar)...");
            break;
        default:
            localStorage.setItem("ev365_temRegistro", "S");
            localStorage.setItem("ev365_dataInicial", sessionStorage.ev365_dataInicial);
            localStorage.setItem("ev365_arrayLidas", sessionStorage.ev365_arrayLidas);
            console.log("evangelho365> Gravou dados inicializados na localStorage...");
    }; 
    
};


/*---------------------------*/
function carregaNumHojePend() {
/*---------------------------*/
    console.log("evangelho365> Executando carregaNumHojePend()");

    var dt, dtlocal;

    ws_numHoje = 0;            
    ws_numPend = 0;
    ws_arrayDatas = new Array();            
    ws_quantidadeLidas = 0;

    ws_dataAtual = new Date();
    ws_dataInicialLocal = ws_dataInicial.toLocaleDateString();
    ws_dataAtualLocal = ws_dataAtual.toLocaleDateString();
    console.log("evangelho365> ws_dataAtual.........: " + ws_dataAtual);
    console.log("evangelho365> ws_dataInicialLocal...: " + ws_dataInicialLocal);
    console.log("evangelho365> ws_dataAtualLocal.....: " + ws_dataAtualLocal);

    /*-- Carrega o ws_arrayDatas[] --*/
    dt = new Date(ws_dataInicial);
    for (i = 1; i <= 365; i++) {
        dtlocal = dt.toLocaleDateString();
        ws_arrayDatas[i] = dtlocal;
        dt.setDate(dt.getDate() + 1);
    };

    for (i = 1; i <= 365; i++) {
        if ( ws_numHoje == 0 ) {
            if ( ws_arrayDatas[i] == ws_dataAtualLocal ) {
                ws_numHoje = i;
                console.log("evangelho365> Achou o numHoje: " + ws_numHoje + "(" + ws_arrayDatas[i] + " == " + ws_dataAtualLocal);
            };
        };
        if ( ws_numPend == 0 ) {
            if ( ws_arrayLidas[i] == "N" ) {
                ws_numPend = i;
                console.log("evangelho365> Achou o numPend: " + ws_numPend);
            } else {
                ws_quantidadeLidas += 1;
            };
        };
    };

    if ( ws_numHoje == 0 ) {
        console.log("evangelho365> NÃO achou o numHoje");
    };
    if ( ws_numPend == 0 ) {
        console.log("evangelho365> NÃO achou o numPend");
    };
 
};



/* ########################################################################################
   ########################################################################################
                                    CARREGA A PAGINA "LEITURA"
   ########################################################################################
######################################################################################## */


function carregaLeitura(nLeitura) {
console.log("evangelho365> Executando carregaLeitura() para nLeitura: " + nLeitura);

$("#id_nomeEvangelho").html("<h2> Evangelho de São Mateus </h2>" + "Leitura: " + nLeitura);

};



/* ########################################################################################
   ########################################################################################
                                  CARREGA A PAGINA "BENVINDO"
   ########################################################################################
######################################################################################## */


function carregaBenvindo() {
console.log("evangelho365> Executando carregaBenvindo()");

    /*-- Verifica o usuario e email que está logado no sistema --*/
    verificaUserLogado();
    console.log("evangelho365> tem Logado.......: " + ws_temLogado);
    console.log("evangelho365> loginSession.....: " + ws_loginSession);
    console.log("evangelho365> emailSession.....: " + ws_nameSession);
    console.log("evangelho365> emailSession.....: " + ws_emailSession);

    /*-- Se tiver leitor verifica se continua o mesmo que está logado/não logado --*/
    if ( ws_temLogado == "S" ) {

    } else {
        $( "#id_boxLeitorLogado" ).hide();
    };

// $("#id_nomeEvangelho").html("<h2> Evangelho de São Mateus </h2>" + "Leitura: " + nLeitura);

};



/* ########################################################################################
   ########################################################################################
                                     FUNCOES AUXILIARES
   ########################################################################################
######################################################################################## */


/*---------------------------*/
function verificaUserLogado() {
/*---------------------------*/
    console.log("evangelho365> Executando verificaUserLogado()");

    ws_temLogado = "N";
    ws_loginSession = "local";
    ws_nameSession = "-";       
    ws_emailSession = "-";       
    ws_imageSession = "";       

    if ( sessionStorage.userLogado == "S" ) {
        if ( sessionStorage.tipoLogin == "google" || sessionStorage.tipoLogin == "facebook" ) {
            ws_loginSession = sessionStorage.tipoLogin;
            if ( sessionStorage.userEmail == undefined || sessionStorage.userName == undefined ) {
                console.log("evangelho365> ===> userEmail ou userName está UNDEFINED");
                console.log("evangelho365> userEmail...: " + sessionStorage.userEmail);
                console.log("evangelho365> userName....: " + sessionStorage.userName );
            } else {
                ws_temLogado = "S";
                ws_nameSession = sessionStorage.userName;    
                ws_emailSession = sessionStorage.userEmail;    
                if ( sessionStorage.userImageURL == undefined ) {
                    console.log("evangelho365> ===> userImageURL está UNDEFINED");
                    console.log("evangelho365> userImageURL: " + sessionStorage.userImageURL);
                } else {
                    ws_imageSession = sessionStorage.userImageURL;    
                };
            };
        };
    };

};


/*----------------------------------------*/
function converteLidasEmArray(stringLidas) {
// Obs.: Para obter um array inicializado: converteLidasEmArray("")
/*----------------------------------------*/
    console.log("evangelho365> Executando converteLidasEmArray(x)");

    var arrayLidas = new Array();

    for (i = 0; i <= 365; i++) {
        if ( i == 0 ) {
            arrayLidas[i] = "X";
        } else {
            if ( i <= ( stringLidas.length ) ) {
                arrayLidas[i] = stringLidas.charAt( i-1 );
            } else {
                arrayLidas[i] = "N";
            };
        };
    };

    return arrayLidas;
};


/*----------------------------------------*/
function converteLidasEmString(arrayLidas) {
// Obs.: Para obter uma string inicializada: converteLidasEmString(new Array())
/*----------------------------------------*/
    console.log("evangelho365> Executando converteLidasEmString(x)");

    var stringLidas = "";

    for (i = 1; i <= 365; i++) {
        if ( i <= ( arrayLidas.length - 1 ) ) {
            stringLidas += arrayLidas[i];
        } else {
            stringLidas += "N";
        };
    };

    return stringLidas;
};
