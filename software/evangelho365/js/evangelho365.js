/*=============================================================
Projeto......: ByteDoBem
Aplicativo...: Evangelho365
Modulo.......: evangelho365.js
Objetivo.....: Javascript do Evangelho365
===============================================================
Vrs001-13/11/2017-Nivaldo-Implantação.
=============================================================*/
console.log("e365.js> *** Executando evangelho365.js ***");


var ws_urlPage    = "benvindo";

var ws_numLeit    = 1;
var ws_numHoje    = 1;
var ws_numPend    = 1;

var ws_datInic    = new Date();
var ws_datHoje    = new Date();

var ws_arrayDatas = new Array();
var ws_arrayLidas = new Array();


/*-------------------------*/
$(document).ready(function(){
/*-------------------------*/
    console.log("e365.js> *** Executando o Ready ***");


    /*-- Decodifica os parametros da URL --*/
    /*-------------------------------------*/
    var vars = [];
    vars = pd_decodificaURL();
    ws_urlPage  = vars["page"];
    console.log("e365.js> ws_urlPage original: " + ws_urlPage);


    /*-- Verifica/Valida os parametros da URL --*/
    /*------------------------------------------*/
    if ( !pd_validaString( ws_urlPage ) ) {
        console.log("e365.js> Entrou no IF validaString(ws_urlPage)" );
        ws_urlPage = "benvindo";
    };


    /*-- Verifica se Usuario já está Lendo --*/
    /*---------------------------------------*/
    if ( ws_urlPage === "benvindo" ) {
        if ( sessionStorage.userLendo === "S" ) {
            console.log("e365.js> Entrou no IF do userLendo" );
            ws_urlPage = "home";
        };
    };


    /*-- Valida se é uma urlPage prevista --*/
    /*--------------------------------------*/
    switch( ws_urlPage ) {
        case "benvindo":     break;
        case "home":         break;
        case "leitura":      break; 
        case "ajuda":        break;
        case "sobre":        break;
        case "contato":      break;
        case "login":        break;
        default:             ws_urlPage = "benvindo";
    }; 
    console.log("e365.js> ws_urlPage final...: " + ws_urlPage);


    /*-- Carrega a Pagina --*/
    /*----------------------*/
    switch( ws_urlPage ) {
        case "benvindo":
            pd_gravaUrlPage();
            carregaPaginaBenvindo();
            break;
        case "home":
            pd_gravaUrlPage();
            preparaPaginaHome();
            carregaPaginaHome();
            break;
        case "leitura":
            preparaInicioLeitura();
            carregaPaginaLeitura();
            break;
        case "ajuda":
            carregaPaginaAjuda();
            break;
        case "sobre":
            carregaPaginaSobre();
            break;
        case "contato":
            carregaPaginaContato();
            break;
        case "login":
            carregaPaginaLogin();
            break;
        default:
    }; 
    
});


/*======================================================================
========================================================================
                             PAGINA LEITURA
========================================================================
======================================================================*/


/*======================================================
        CARREGA/ALTERA LEITURA ATUAL (ws_numLeit)
======================================================*/

/*-----------------------------*/
function carregaPaginaLeitura() {
/*-----------------------------*/
console.log("e365.js> *** Executando carregaPaginaLeitura() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Leitura" , "page" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "" , "leitura" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "leitura" );

};


/*-----------------------------*/
function alteraPaginaLeitura() {
/*-----------------------------*/
console.log("e365.js> *** Executando alteraPaginaLeitura() ***");

    /*-- Acerta o titulo da View --*/
    carregaTitViewLeitura();

    /*-- Carrega os dados da Leitura --*/
    preparaPaginaLeitura();

};


/*-----------------------------*/
function preparaPaginaLeitura() {
/*-----------------------------*/
console.log("e365.js> *** Executando preparaPaginaLeitura() ***");

    $("#id_dataLeitura").text( "Leitura indicada para o dia " + ws_arrayDatas[ws_numLeit] );

    $("#id_nomeEvangelho").text( recuperaNomeEvangelho() );

    $("#id_versLeitura").text( recuperaVersicLeitura() );

    $("#id_textoLeitura").html("<div>Leitura recuperada...</div>");

};


/*======================================================
           PREPARACAO DO INICIA DAS LEITURAS
======================================================*/

/*-----------------------------*/
function preparaInicioLeitura() {
/*-----------------------------*/
console.log("e365.js> *** Executando preparaInicioLeitura() ***");

    /*-- Verifica o registro de leitura do USUARIO --*/
    // Carrega:  ws_datInic e ws_arrayLidas
    verificaLeituraUsuario();
    //console.log("e365.js> ws_datInic......: " + ws_datInic);


    /*-- Carrega a data de Hoje no formato DD/MM/AAAA --*/
    ws_datHoje = transformDataLocal( new Date() );
    //console.log("e365.js> ws_datHoje......: " + ws_datHoje);


    /*-- Carrega o array de Datas no formato DD/MM/AAAA --*/
    ws_arrayDatas = carregaArrayDatas( ws_datInic );
    //console.log("e365.js> ws_arrayDatas[000]: " + ws_arrayDatas[0]);
    //console.log("e365.js> ws_arrayDatas[001]: " + ws_arrayDatas[1]);
    //console.log("e365.js> ws_arrayDatas[010]: " + ws_arrayDatas[10]);
    //console.log("e365.js> ws_arrayDatas[365]: " + ws_arrayDatas[365]);


    /*-- Marca Leitura de Hoje --*/
    ws_numHoje = verificaLeituraHoje( ws_arrayDatas , ws_datHoje );
    console.log("e365.js> ws_numHoje......: " + ws_numHoje);
    

    /*-- Seta a leitura inicial a ser mostrada --*/
    ws_numLeit = ws_numHoje;
    console.log("e365.js> ws_numLeit......: " + ws_numLeit);

};


/*======================================================
             CARREGA LOG LEITURA DO USUARIO
======================================================*/

/*-------------------------------*/
function verificaLeituraUsuario() {
/*-------------------------------*/
console.log("e365.js> *** Executando verificaLeituraUsuario() ***");

    /*-- Inicia nova leitura dos 365 --*/
    inicializarStatusLeituras();
    // ACERTAR -> Gravar o status inicializado para o usuario ou no local



};


/*======================================================
               FUNCOES DO LISTA LEITURA
======================================================*/


/*------------------------*/
function btnListaLeituras() {
/*------------------------*/
console.log("e365.js> *** Executando btnListaLeituras() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Lista Leituras" , "page" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "" , "lista" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );


};


/*-----------------------------*/
function preparaListaLeituras() {
/*-----------------------------*/
console.log("e365.js> *** Executando preparaListaLeituras() ***");


};


/*--------------------------------------*/
function btnClikListaLeitura( nLeitura ) {
/*--------------------------------------*/
console.log("e365.js> *** Executando btnbtnClikListaLeitura(" + nLeitura + ") ***");

    ws_numLeit = nLeitura;
    carregaPaginaLeitura();

};


/*======================================================
              FUNCOES DO PESQUISA LEITURA
======================================================*/


/*---------------------------*/
function btnPesquisaLeitura() {
/*---------------------------*/
console.log("e365.js> *** Executando btnPesquisaLeitura() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Pesquisa" , "page" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "" , "pesquisa" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );

};


/*-------------------------------*/
function preparaPesquisaLeitura() {
/*-------------------------------*/
console.log("e365.js> *** Executando preparaPesquisaLeitura() ***");


};


/*------------------------*/
function btnPesquisaHoje() {
/*------------------------*/
console.log("e365.js> *** Executando btnPesquisaHoje() ***");

    ws_numLeit = ws_numHoje;
    carregaPaginaLeitura();

};


/*------------------------*/
function btnPesquisaPendente() {
/*------------------------*/
console.log("e365.js> *** Executando btnPesquisaPendente() ***");

    ws_numPend = 7;     // ACERTAR


    ws_numLeit = ws_numPend;
    carregaPaginaLeitura();

};


/*-----------------------------*/
function btnPesquisaInformado() {
/*-----------------------------*/
console.log("e365.js> *** Executando btnPesquisaInformado() ***");

    var nLeit = 9;    // ACERTAR

    ws_numLeit = nLeit;
    carregaPaginaLeitura();

};


/*======================================================
             FUNCOES AUXILIARES DA LEITURA
======================================================*/

/*----------------------------------*/
function inicializarStatusLeituras() {
/*----------------------------------*/
console.log("e365.js> *** Executando inicializarStatusLeituras() ***");

    ws_datInic    = new Date();
    ws_arrayLidas = converteLidasEmArray("");

};


/*------------------------------------------*/
function converteLidasEmArray( stringLidas ) {
/*------------------------------------------*/
//console.log("e365.js> *** Executando converteLidasEmArray() ***");

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


/*------------------------------------*/
function transformDataLocal( dtTrans ) {
/*------------------------------------*/
//console.log("e365.js> *** Executando transformDataLocal( dtTrans ) ***");

    var dt = new Date(dtTrans);
    var dtLocal = dt.toLocaleDateString();

    return dtLocal;
};


/*-----------------------------------*/
function carregaArrayDatas( dataIni ) {
/*-----------------------------------*/
//console.log("e365.js> *** Executando carregaArrayDatas( dataIni ) ***");
    var dt, dtlocal;

    arrayDatas = new Array();            

    dt = new Date( dataIni );
    for (i = 1; i <= 365; i++) {
        dtlocal = dt.toLocaleDateString();
        arrayDatas[i] = dtlocal;
        dt.setDate(dt.getDate() + 1);
    };

    return arrayDatas;
};


/*------------------------------------------------*/
function verificaLeituraHoje( arrayDat , datHoje ) {
/*------------------------------------------------*/
//console.log("e365.js> *** Executando verificaLeituraHoje( arrayDat , datHoje ) ***");

    for (i = 1; i <= 365; i++) {
        if ( datHoje == arrayDat[i] ) {
            return i;
        };
    };

    return 365;
};


/*------------------------------*/
function carregaTitViewLeitura() {
/*------------------------------*/

    $("#id_nomeView").text( "Leitura " + ws_numLeit );

};


/*---------------------------*/
function btnLeituraAnterior() {
/*---------------------------*/
console.log("e365.js> *** Executando btnLeituraAnterior() ***");

    if ( ws_numLeit > 1 ) {
        ws_numLeit -= 1;
        alteraPaginaLeitura(); 
    } else {
        console.log("e365.js> Já é o primeiro DIA");
    };



};


/*--------------------------*/
function btnProximaLeitura() {
/*--------------------------*/
console.log("e365.js> *** Executando btnProximaLeitura() ***");

    if ( ws_numLeit < 365 ) {
        ws_numLeit += 1;
        alteraPaginaLeitura(); 
    } else {
        console.log("e365.js> Já é o último DIA");
    };


};


/*------------------------------*/
function recuperaNomeEvangelho() {
/*------------------------------*/
//console.log("e365.js> *** Executando recuperaNomeEvangelho() ***");

    nEvang = "Evangelho de João";

    // ACERTAR

    return nEvang;
};


/*------------------------------*/
function recuperaVersicLeitura() {
/*------------------------------*/
//console.log("e365.js> *** Executando recuperaVersicLeitura ***");

    vLeitura = "Jo 2, 13-20";

    // ACERTAR

    return vLeitura;
};


/*======================================================================
========================================================================
                            DEMAIS PAGINAS
========================================================================
======================================================================*/


/*======================================================
                CARGA DA PAGINA BENVINDO
======================================================*/


/*------------------------------*/
function carregaPaginaBenvindo() {
/*------------------------------*/
console.log("e365.js> *** Executando carregaPaginaBenvindo() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Benvindo" , "home" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "" , "benvindo" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );

};


/*======================================================
                 CARGA DA PAGINA HOME
======================================================*/


/*--------------------------*/
function preparaPaginaHome() {
/*--------------------------*/
console.log("e365.js> *** Executando preparaPaginaHome() ***");
    
    sessionStorage.userLendo = "S";



};


/*--------------------------*/
function carregaPaginaHome() {
/*--------------------------*/
console.log("e365.js> *** Executando carregaPaginaHome() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Home" , "home" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "" , "home" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );

};


/*======================================================
                 CARGA DA PAGINA AJUDA
======================================================*/


/*---------------------------*/
function carregaPaginaAjuda() {
/*---------------------------*/
console.log("e365.js> *** Executando carregaPaginaAjuda() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Ajuda" , "page" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "" , "ajuda" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );

};


/*======================================================
                CARGA DA PAGINA SOBRE
======================================================*/


/*---------------------------*/
function carregaPaginaSobre() {
/*---------------------------*/
console.log("e365.js> *** Executando carregaPaginaSobre() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Sobre" , "page" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "" , "sobre" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );

};


/*======================================================
                CARGA DA PAGINA CONTATO
======================================================*/


/*-----------------------------*/
function carregaPaginaContato() {
/*-----------------------------*/
console.log("e365.js> *** Executando carregaPaginaContato() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Contato" , "page" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "../../" , "contato" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );

};


/*======================================================
                CARGA DA PAGINA LOGIN
======================================================*/


/*---------------------------*/
function carregaPaginaLogin() {
/*---------------------------*/
console.log("e365.js> *** Executando carregaPaginaLogin() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop( "Login" , "page" );

    /*-- Get do Corpo da Pagina --*/
    getaHtmlPagina( "../../" , "login" ); 

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom( "home" );

};



/*======================================================================
========================================================================
                          FUNCOES AUXILIARES
========================================================================
======================================================================*/


/*-------------------------------------------*/
function getaNavbarTop( titPage , nomNavBar ) {
/*-------------------------------------------*/
console.log("e365.js> *** Executando getaNavbarTop(" + titPage + ") ***");

    $.get( "html/nav-top-" + nomNavBar + ".html", function(data, status){
        console.log("e365.js> $.get(html/nav-top-" + nomNavBar + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_navbarTop").html(data);
            /*-- Executa procedimentos complementares --*/
            switch( titPage ) {
                case "Leitura":   
                    pd_setaIconRetorno( "index.html" );  
                    carregaTitViewLeitura();
                    break; 
                default:     
                    if ( nomNavBar === "page" ) {
                        pd_setaIconRetorno( "index.html" );  
                        $("#id_nomeView").text( titPage );
                    };
            }; 
        };
    });

};


/*---------------------------------------------*/
function getaHtmlPagina( localPage , nomePage ) {
/*---------------------------------------------*/
console.log("e365.js> *** Executando getaHtmlPagina() ***");

    $.get( localPage + nomePage + ".html", function(data, status){
        console.log("e365.js> $.get(" + localPage + nomePage + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_corpoPagina").html(data);
            /*-- Executa procedimentos complementares --*/
            switch( nomePage ) {
                case "leitura":    preparaPaginaLeitura();     break; 
                default:     
            }; 
        };
    });

};


/*------------------------------------*/
function getaNavbarBottom( nomNavBar ) {
/*------------------------------------*/
console.log("e365.js> *** Executando getaNavbarBottom() ***");

    $.get( "html/nav-bot-" + nomNavBar + ".html", function(data, status){
        console.log("e365.js> $.get(html/nav-bot-" + nomNavBar + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_navbarBottom").html(data);
            /*-- Executa procedimentos complementares --*/
            // switch( ws_urlPage ) {
            //    case "leitura":    preparaNavBottomLeitura();    break; 
            //    default:     
            // }; 
        };
    });

};

