/*=============================================================
Projeto......: ByteDoBem
Aplicativo...: Evangelho365
Modulo.......: evangelho365.js
Objetivo.....: Javascript do Evangelho365
===============================================================
Vrs001-13/11/2017-Nivaldo-Implantação.
=============================================================*/
console.log("e365.js> *** Executando evangelho365.js ***");

var ev_urlPage    = "benvindo";

var ev_userLendo  = "N";
var ev_userTipo   = "local";
var ev_userName   = "";
var ev_userImage  = "";
var ev_userEmail  = "";

var ev_dtInicLeit;
var ev_arrayLidas;

var ev_numLeit;
var ev_numHoje;
var ev_numPend;
var ev_dtHoje;
var ev_arrayDatas;


/*-------------------------*/
$(document).ready(function(){
/*-------------------------*/
    console.log("e365.js> *** Executando o Ready ***");


    /*-- Carga inicial das variaveis --*/
    /*---------------------------------*/
    ev_dtInicLeit = new Date();
    ev_arrayLidas = le_converteLidasEmArray("");
    ev_numLeit    = 1;
    ev_numHoje    = 1;
    ev_numPend    = 1;
    ev_dtHoje     = le_transformDataLocal( new Date() );
    ev_arrayDatas = le_carregaArrayDatas( ev_dtInicLeit );


    /*-- Decodifica os parametros da URL --*/
    /*-------------------------------------*/
    var vars = [];
    vars = pd_decodificaURL();
    ev_urlPage  = vars["page"];
    console.log("e365.js> ev_urlPage original: " + ev_urlPage);


    /*-- Verifica/Valida os parametros da URL --*/
    /*------------------------------------------*/
    var strVal = pd_validaString( ev_urlPage );
    if ( strVal === "N" ) {
        console.log("e365.js> Entrou no IF validaString(" + ev_urlPage + ")" );
        ev_urlPage = "benvindo";
    };


    /*-- Recupera dados do userLogado e userLendo --*/
    /*----------------------------------------------*/
    pe_recuperaUserLendoSession();
    pd_recuperaUserLogadoSession();


    /*-- Verifica se Usuario já está Lendo --*/
    /*---------------------------------------*/
    if ( ev_urlPage === "benvindo" || ev_urlPage === "home" ) {
        if ( ev_userLendo === "S" ) {
            if ( ws_userSession === "S" ) {
                if ( ws_userTipo === ev_userTipo && ws_userEmail === ev_userEmail ) {
                    console.log("e365.js> Tem LOGADO lendo: Vai para Home" );
                    ev_urlPage = "home";
                } else {
                    console.log("e365.js> Tem LOGADO mas diferente do LENDO: Vai para Benvindo" );
                    ev_urlPage = "benvindo";
                };
            } else {
                if ( ev_userTipo === "local" ) {
                    console.log("e365.js> Tem LOCAL lendo: Vai para Home" );
                    ev_urlPage = "home";
                } else {
                    console.log("e365.js> Nao tem LOGADO nas estava LENDO um Logado: Vai para Benvindo" );
                    ev_urlPage = "benvindo";
                };
            };
        } else {
            console.log("e365.js> Não tem ninguem LENDO: Vai para Benvindo" );
            ev_urlPage = "benvindo";
        };
    };


    /*-- Valida se é uma urlPage prevista --*/
    /*--------------------------------------*/
    switch( ev_urlPage ) {
        case "benvindo":     break;
        case "home":         break;
        case "leitura":      break; 
        case "ajuda":        break;
        case "sobre":        break;
        case "contato":      break;
        case "login":        break;
        default:             ev_urlPage = "benvindo";
    }; 
    console.log("e365.js> ev_urlPage final...: " + ev_urlPage);


    /*-- Carrega a Pagina --*/
    /*----------------------*/
    switch( ev_urlPage ) {
        case "benvindo":
            pd_gravaUrlPage();
            ev_preparaPaginaBenvindo();
            ev_carregaPaginaBenvindo();
            break;
        case "home":
            pd_gravaUrlPage();
            ev_preparaPaginaHome();
            ev_carregaPaginaHome();
            break;
        case "leitura":
            le_preparaPaginaLeitura();
            le_carregaPaginaLeitura();
            break;
        case "ajuda":
            ev_carregaPaginaAjuda();
            break;
        case "sobre":
            ev_carregaPaginaSobre();
            break;
        case "contato":
            ev_carregaPaginaContato();
            break;
        case "login":
            ev_carregaPaginaLogin();
            break;
        default:
    }; 
    
});


/*======================================================
                CARGA DA PAGINA BENVINDO
======================================================*/

/*---------------------------------*/
function ev_preparaPaginaBenvindo() {
/*---------------------------------*/
console.log("e365.js> *** Executando ev_preparaPaginaBenvindo() ***");
    

    /*-- Inicializa as variaveis gravadas da LEITURA --*/
    /*-------------------------------------------------*/
    ev_dtInicLeit = new Date();
    ev_arrayLidas = le_converteLidasEmArray("");


    /*-- Inicializa as variaveis de trabalho da LEITURA --*/
    /*----------------------------------------------------*/
    ev_numLeit    = 1;
    ev_numHoje    = 1;
    ev_numPend    = 1;
    ev_dtHoje     = le_transformDataLocal( new Date() );
    ev_arrayDatas = le_carregaArrayDatas( ev_dtInicLeit );


    /*-- Grava o User que esta iniciando a leitura (local ou logado) --*/
    /*-----------------------------------------------------------------*/
    ev_userLendo  = "S";
    if ( ws_userSession === "S" ) {
        // $( "#id_userNaoLogado" ).hide(); 
        ev_userTipo   = ws_userTipo;
        ev_userName   = ws_userName;
        ev_userImage  = ws_userImage;
        ev_userEmail  = ws_userEmail;
    } else {
        // $( "#id_userLogado" ).hide(); 
        ev_userTipo   = "local";
        ev_userName   = "";
        ev_userImage  = "";
        ev_userEmail  = "";
    };
    pe_gravaUserLendoSession();
    
};


/*---------------------------------*/
function ev_carregaPaginaBenvindo() {
/*---------------------------------*/
console.log("e365.js> *** Executando ev_carregaPaginaBenvindo() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Benvindo" , "home" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "" , "benvindo" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );

};


/*-------------------------------*/
function ev_trataPaginaBenvindo() {
/*-------------------------------*/
console.log("e365.js> *** Executando ev_trataPaginaBenvindo() ***");
    

    if ( ws_userSession === "S" ) {
        $( "#id_userNaoLogado" ).hide(); 
    } else {
        $( "#id_userLogado" ).hide(); 
    };

    
};


/*======================================================
                 CARGA DA PAGINA HOME
======================================================*/

/*-----------------------------*/
function ev_preparaPaginaHome() {
/*-----------------------------*/
console.log("e365.js> *** Executando ev_preparaPaginaHome() ***");
    
    /*-- Recupera dados da LEITURA gravados --*/
    /*----------------------------------------*/
    switch( ev_userTipo ) {
        case "google":
            pe_recuperaLeituraGoogle();
            break;
        case "facebook":
            pe_recuperaLeituraFacebook();
            break;
        default:
            pe_recuperaLeituraLocalStorage();
    }; 


    /*-- Carrega variaveis de trabalho da LEITURA --*/
    /*----------------------------------------------*/
    ev_dtHoje     = le_transformDataLocal( new Date() );
    ev_arrayDatas = le_carregaArrayDatas( ev_dtInicLeit );
    ev_numHoje    = le_verificaLeituraHoje( ev_arrayDatas , ev_dtHoje );
    ev_numPend    = le_verLeituraPendente( ev_arrayLidas );
    ev_numLeit    = ev_numHoje;


    console.log("e365.js> =======<<<  DADOS INICIAIS DA LEITURA  >>>=======");
    console.log("e365.js> ev_dtInicLeit.: " + ev_dtInicLeit);
    console.log("e365.js> ev_numLeit....: " + ev_numLeit);
    console.log("e365.js> ev_numHoje....: " + ev_numHoje);
    console.log("e365.js> ev_numPend....: " + ev_numPend);
    console.log("e365.js> -------------------------------------------");
    console.log("e365.js> ev_arrayLidas.: " + ev_arrayLidas[ev_numLeit]);
    console.log("e365.js> ev_dtHoje.....: " + ev_dtHoje);
    console.log("e365.js> ev_arrayDatas.: " + ev_arrayDatas[ev_numLeit]);
    console.log("e365.js> =================================================");



};


/*-----------------------------*/
function ev_carregaPaginaHome() {
/*-----------------------------*/
console.log("e365.js> *** Executando ev_carregaPaginaHome() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Home" , "home" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "" , "home" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );

};


/*---------------------------*/
function ev_trataPaginaHome() {
/*---------------------------*/
console.log("e365.js> *** Executando ev_trataPaginaHome() ***");
    

    
};


/*======================================================
                 CARGA DA PAGINA AJUDA
======================================================*/

/*------------------------------*/
function ev_carregaPaginaAjuda() {
/*------------------------------*/
console.log("e365.js> *** Executando ev_carregaPaginaAjuda() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Ajuda" , "page" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "" , "ajuda" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );

};


/*======================================================
                CARGA DA PAGINA SOBRE
======================================================*/

/*------------------------------*/
function ev_carregaPaginaSobre() {
/*------------------------------*/
console.log("e365.js> *** Executando ev_carregaPaginaSobre() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Sobre" , "page" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "" , "sobre" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );

};


/*======================================================
                CARGA DA PAGINA CONTATO
======================================================*/

/*--------------------------------*/
function ev_carregaPaginaContato() {
/*--------------------------------*/
console.log("e365.js> *** Executando ev_carregaPaginaContato() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Contato" , "page" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "../../" , "contato" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );

};


/*======================================================
                CARGA DA PAGINA LOGIN
======================================================*/

/*------------------------------*/
function ev_carregaPaginaLogin() {
/*------------------------------*/
console.log("e365.js> *** Executando ev_carregaPaginaLogin() ***");

    /*-- Get do Navbar Top --*/
    pe_getaNavbarTop( "Login" , "page" );

    /*-- Get do Corpo da Pagina --*/
    pe_getaHtmlPagina( "../../" , "login" ); 

    /*-- Get do Navbar Bottom --*/
    pe_getaNavbarBottom( "home" );

};
