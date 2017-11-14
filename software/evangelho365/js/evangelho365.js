/*=============================================================
Projeto......: ByteDoBem
Aplicativo...: Evangelho365
Modulo.......: evangelho365.js
Objetivo.....: Javascript do Evangelho365
===============================================================
Vrs001-13/11/2017-Nivaldo-Implantação.
=============================================================*/
console.log("e365.js> *** Executando evangelho365.js ***");


var ws_urlPage = "benvindo";
var ws_numLeit = 1;


/*-------------------------*/
$(document).ready(function(){
/*-------------------------*/
    console.log("e365.js> *** Executando o Ready ***");


    /*-- Decodifica os parametros da URL --*/
    /*-------------------------------------*/
    var vars = [];
    vars = decodificaURL();
    ws_urlPage  = vars["page"];
    console.log("e365.js> ws_urlPage original: " + ws_urlPage);


    /*-- Verifica/Valida os parametros da URL --*/
    /*------------------------------------------*/
    if ( !validaString( ws_urlPage ) ) {
        console.log("e365.js> Entrou no IF validaString(ws_urlPage)" );
        ws_urlPage = "benvindo";
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
            carregaPaginaBenvindo();
            break;
        case "home":
            carregaPaginaHome();
            break;
        case "leitura":
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

/*
    $("#id_iconPrevious").click(function(){
        console.log("evangelho365.js> Clicou Previous");
        clicouLeituraAnterior();
    });


    $("#id_iconNext").click(function(){
        console.log("evangelho365.js> Clicou Next");
        clicouProximaLeitura();
    });
*/  
    
});


/*======================================================================
                             PAGINA BENVINDO
======================================================================*/

/*------------------------------*/
function carregaPaginaBenvindo() {
/*------------------------------*/
console.log("e365.js> *** Executando carregaPaginaBenvindo() ***");

    /*-- Grava a URL da pagina para retorno --*/
    gravaUrlPage();

    /*-- Get do Navbar Top --*/
    getaNavbarTop();

    /*-- Get da pagina Benvindo --*/
    getaHtmlPagina();

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom();



};


/*------------------------------*/
function preparaPaginaBenvindo() {
/*------------------------------*/
console.log("e365.js> *** Executando preparaPaginaBenvindo() ***");


};


/*======================================================================
                               PAGINA HOME
======================================================================*/

/*--------------------------*/
function carregaPaginaHome() {
/*--------------------------*/
console.log("e365.js> *** Executando carregaPaginaHome() ***");

    /*-- Grava a URL da pagina para retorno --*/
    gravaUrlPage();

    /*-- Get do Navbar Top --*/
    getaNavbarTop();

    /*-- Get da pagina Benvindo --*/
    getaHtmlPagina();

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom();



};


/*--------------------------*/
function preparaPaginaHome() {
/*--------------------------*/
console.log("e365.js> *** Executando preparaPaginaHome() ***");


};


/*======================================================================
                             PAGINA LEITURA
======================================================================*/

/*-----------------------------*/
function carregaPaginaLeitura() {
/*-----------------------------*/
console.log("e365.js> *** Executando carregaPaginaLeitura() ***");

    ws_numLeit = numeroLeitura();

    /*-- Get do Navbar Top --*/
    getaNavbarTop();

    /*-- Get da pagina Benvindo --*/
    getaHtmlPagina();

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom();



};


/*-----------------------------*/
function preparaPaginaLeitura() {
/*-----------------------------*/
console.log("e365.js> *** Executando preparaPaginaLeitura() ***");



};


/*--------------------------------*/
function preparaNavBottomLeitura() {
/*--------------------------------*/
console.log("e365.js> *** Executando preparaNavBottomLeitura() ***");



};


/*---------------------------*/
function btnLeituraAnterior() {
/*---------------------------*/
console.log("e365.js> *** Executando btnLeituraAnterior() ***");



};


/*--------------------------*/
function btnProximaLeitura() {
/*--------------------------*/
console.log("e365.js> *** Executando btnProximaLeitura() ***");



};


/*------------------------*/
function btnLeituraDoDia() {
/*------------------------*/
console.log("e365.js> *** Executando btnLeituraDoDia() ***");



};


/*------------------------*/
function btnBuscaLeitura() {
/*------------------------*/
console.log("e365.js> *** Executando btnBuscaLeitura() ***");



};


/*----------------------*/
function numeroLeitura() {
/*----------------------*/
    console.log("e365.js> *** Executando numeroLeitura() ***");

    var nLeitura = 10;


    return parseInt(nLeitura);
};


/*======================================================================
                             PAGINA AJUDA
======================================================================*/

/*---------------------------*/
function carregaPaginaAjuda() {
/*---------------------------*/
console.log("e365.js> *** Executando carregaPaginaAjuda() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop();

    /*-- Get da pagina Benvindo --*/
    getaHtmlPagina();

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom();



};


/*======================================================================
                             PAGINA SOBRE
======================================================================*/

/*---------------------------*/
function carregaPaginaSobre() {
/*---------------------------*/
console.log("e365.js> *** Executando carregaPaginaSobre() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop();

    /*-- Get da pagina Benvindo --*/
    getaHtmlPagina();

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom();



};


/*======================================================================
                             PAGINA LOGIN
======================================================================*/

/*---------------------------*/
function carregaPaginaLogin() {
/*---------------------------*/
    console.log("padr.js> *** Executando carregaPaginaLogin() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop();

    /*-- Get da pagina Benvindo --*/
    getaHtmlPagina();

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom();
    
};


/*==============================================================
                         PAGINA CONTATO
==============================================================*/

/*-----------------------------*/
function carregaPaginaContato() {
/*-----------------------------*/
    console.log("padr.js> *** Executando carregaPaginaContato() ***");

    /*-- Get do Navbar Top --*/
    getaNavbarTop();

    /*-- Get da pagina Benvindo --*/
    getaHtmlPagina();

    /*-- Get do Navbar Bottom --*/
    getaNavbarBottom();

};


/*======================================================================
                          FUNÇÕES AUXILIARES
======================================================================*/

/*-----------------------*/
function getaHtmlPagina() {
/*-----------------------*/
console.log("e365.js> *** Executando getaHtmlPagina() ***");

    var localPage = "";
    if ( ws_urlPage === "contato" || ws_urlPage === "login" ) {
        localPage = "../../";
    };

    $.get( localPage + ws_urlPage + ".html", function(data, status){
        console.log("e365.js> $.get(" + localPage + ws_urlPage + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_corpoPagina").html(data);
            switch( ws_urlPage ) {
                case "benvindo":   preparaPaginaBenvindo();   break; 
                case "home":       preparaPaginaHome();       break; 
                case "leitura":    preparaPaginaLeitura();    break; 
                case "contato":    preparaPaginaContato();    break; 
                case "login":      preparaPaginaLogin();      break; 
                default:     
            }; 
        };
    });

};


/*----------------------*/
function getaNavbarTop() {
/*----------------------*/
console.log("e365.js> *** Executando getaNavbarTop() ***");

    var navTop = "html/nav-top-home";
    switch( ws_urlPage ) {
        case "leitura":    navTop = "html/nav-top-page";    break; 
        case "ajuda":      navTop = "html/nav-top-page";    break; 
        case "sobre":      navTop = "html/nav-top-page";    break; 
        case "contato":    navTop = "html/nav-top-page";    break; 
        case "login":      navTop = "html/nav-top-page";    break; 
        default:      
    }; 

    $.get( navTop + ".html", function(data, status){
        console.log("e365.js> $.get(" + navTop + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_navbarTop").html(data);
            /*-- Executa procedimentos complementares --*/
            switch( ws_urlPage ) {
                case "leitura":   
                    preparaViewRetorno( "Leitura " + ws_numLeit ); 
                    break; 
                case "ajuda":     
                    preparaViewRetorno( "Ajuda" );   
                    break; 
                case "sobre":     
                    preparaViewRetorno( "Sobre" );   
                    break; 
                case "contato":     
                    preparaViewRetorno( "Contato" );   
                    break; 
                case "login":     
                    preparaViewRetorno( "Login" );   
                    break; 
                default:     
            }; 
        };
    });

};


/*-------------------------------------*/
function preparaViewRetorno( nomeView ) {
/*-------------------------------------*/
console.log("e365.js> *** Executando preparaNavbarTop(" + nomeView + ") ***");

    $("#id_nomeView").text( nomeView );
    setaIconRetorno( "index.html" );  

};


/*-------------------------*/
function getaNavbarBottom() {
/*-------------------------*/
console.log("e365.js> *** Executando getaNavbarBottom() ***");

    var navBottom = "html/nav-bot-home";
    switch( ws_urlPage ) {
        case "leitura":    navBottom = "html/nav-bot-leitura";    break; 
        default:     
    }; 

    $.get( navBottom + ".html", function(data, status){
        console.log("e365.js> $.get(" + navBottom + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_navbarBottom").html(data);
            /*-- Executa procedimentos complementares --*/
            switch( ws_urlPage ) {
                case "leitura":    preparaNavBottomLeitura();    break; 
                default:     
            }; 
        };
    });

};

