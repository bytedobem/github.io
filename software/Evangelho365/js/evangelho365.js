console.log("evangelho365.js> **** Esta Carregando o evangelho365.js ****");

var numHoje = 0;      // Leitura para hoje
var numPend = 0;      // Primeira leitura pendente

$(document).ready(function(){
    console.log("evangelho365.js> **** Esta Executando o Ready ****");

    /*-- Executa o padrao.js --*/
    /*-------------------------*/

    iniciaPadrao("evangelho365"); 


    //**-- Guarda a URL da pagina na sessionStorage --**/
    //**----------------------------------------------**/

    sessionStorage.urlPage = window.location.href;     // Returns full URL
    console.log("evangelho365.js> sessionStorage.urlPage: " + sessionStorage.urlPage);


    //**-- Decodifica os parametros da URL --**
    //**-------------------------------------**

    var pageURL , subPage , numDia;
    var vars = [];
    vars = decodificaURL();
    pageURL  = vars["page"];
    subPage  = vars["subp"];
    numDia   = vars["ndia"];
    console.log("evangelho365.js> pageURL original: " + pageURL);
    console.log("evangelho365.js> subPage: " + subPage);
    console.log("evangelho365.js> numDia.: " + numDia);

    if ( pageURL == undefined || pageURL == null || pageURL == "" ) {
        pageURL  = "home";
        inicializaLeituras();
        carregaPagina( pageURL , 0 );
    } else {
        if ( pageURL == "home" ) {
            switch( subPage ) {
                case "leitura":
                    pageURL = "leitura";
                    carregaPagina( pageURL , numDia );
                    break;
                case "status":
                    pageURL = "status";
                    carregaPagina( pageURL , 0 );
                    break;
                case "restart":
                    pageURL = "restart";
                    carregaPagina( pageURL , 0 );
                    break;
                default:
                    inicializaLeituras();
                    carregaPagina( pageURL , 0 );
            } 
        }
    };
    console.log("evangelho365.js> pageURL final...: " + pageURL);

    //**-- Captura a pagina a ser exibida --**
    //**------------------------------------**

    /*
    carregaPagina( pageURL , subPage , numDia );
    $.get(pageURL + ".html", function(data, status){
        console.log("evangelho365.js> get(pageURL) status: " + status);
        if ( status === "success" ) {
            // console.log("evangelho365.js> data: " + data);
            $("#corpoPagina").html(data);
        } else {
            data = "<h3>Pagina não encontrada...</h3>";
            $("#corpoPagina").html(data);
        }
    });
    */

    //**-- Realça o Menu ativo/atual --**
    //**-------------------------------**
    
    $( "#menu_home"    ).removeClass( "ativado" );
    $( "#menu_contato" ).removeClass( "ativado" );
    $( "#menu_sobre"   ).removeClass( "ativado" );
    $( "#menu_" + pageURL ).addClass( "ativado" );


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

function inicializaLeituras() {
    console.log("evangelho365> Executando o inicializaLeituras()");
    numHoje = 10;
    numPend = 5;

    $("#id_leituraDoDia").attr("href", "index.html?page=home&subp=leitura&ndia=" + numHoje); 
    $("#id_leituraPendente").attr("href", "index.html?page=home&subp=leitura&ndia=" + numPend); 

};

function carregaPagina( page , ndia ) {
    console.log("evangelho365> Executando o carregaPagina()");

    $.get( page + ".html", function(data, status){
        console.log("evangelho365.js> get(page) status: " + status);
        if ( status === "success" ) {
            // console.log("evangelho365.js> data: " + data);
            $("#corpoPagina").html(data);
            if ( page == "home" ) {
                console.log("evangelho365> Entrou no page = home");
                $("#id_leituraDoDia").attr("href", "index.html?page=home&subp=leitura&ndia=" + numHoje); 
                $("#id_leituraPendente").attr("href", "index.html?page=home&subp=leitura&ndia=" + numPend); 
            };
            if ( page == "leitura" ) {
                console.log("evangelho365> Entrou no page = leitura");
                $("#id_nomeEvangelho").html("<h2> Evangelho de São Mateus </h2>" + "Leitura: " + ndia);
            };
        } else {
            data = "<h3>Pagina não encontrada...</h3>";
            $("#corpoPagina").html(data);
        };
    });

};
