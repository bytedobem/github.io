/*=============================================================
Projeto......: ByteDoBem
Aplicativo...: Evangelho365
Modulo.......: evangelho365.js
Objetivo.....: Javascript do Evangelho365 - PERSISTENCIA
===============================================================
Vrs001-13/11/2017-Nivaldo-Implantação.
=============================================================*/
console.log("pers.js> *** Executando persistencia.js ***");


/*-------------------------------------------------------------------------

    FUNCOES:
    -------

        RECUPERA LEITURAS GRAVADAS (LOCAL OU WWW)
            pe_recuperaLeituraLocalStorage()              -> ACERTAR
            pe_recuperaLeituraGoogle()                    -> ACERTAR
            pe_recuperaLeituraFacebook()                  -> ACERTAR

        RECUPERA PAGINAS HTML (GET)
            pe_getaNavbarTop( titPage , nomNavBar )       .. ver err
            pe_getaHtmlPagina( localPage , nomePage )     .. ver err
            pe_getaNavbarBottom( nomNavBar )              .. ver err

        MANUTENÇÃO DE USERLOGADO NA SESSIONSTORAGE 
            pe_gravaUserLendoSession()
            pe_recuperaUserLendoSession() 
            pe_deletaUserLendoSession()
            pe_geraJsonUserLendo()  

-------------------------------------------------------------------------*/


/*======================================================
        RECUPERA LEITURAS GRAVADAS (LOCAL OU WWW)
======================================================*/

/*---------------------------------------*/
function pe_recuperaLeituraLocalStorage() {
/*---------------------------------------*/
console.log("pers.js> *** Executando pe_recuperaLeituraLocalStorage() ***");


    // ===> ACERTAR para carregar as variaveis
    ev_dtInicLeit = new Date();
    ev_arrayLidas = le_converteLidasEmArray("");


};


/*---------------------------------*/
function pe_recuperaLeituraGoogle() {
/*---------------------------------*/
console.log("pers.js> *** Executando pe_recuperaLeituraGoogle() ***");


    // ===> ACERTAR para carregar as variaveis
    ev_dtInicLeit = new Date();
    ev_arrayLidas = le_converteLidasEmArray("");


};


/*-----------------------------------*/
function pe_recuperaLeituraFacebook() {
/*-----------------------------------*/
console.log("pers.js> *** Executando pe_recuperaLeituraFacebook() ***");


    // ===> ACERTAR para carregar as variaveis
    ev_dtInicLeit = new Date();
    ev_arrayLidas = le_converteLidasEmArray("");


};


/*======================================================
              RECUPERA PAGINAS HTML (GET)
======================================================*/

/*----------------------------------------------*/
function pe_getaNavbarTop( titPage , nomNavBar ) {
/*----------------------------------------------*/
console.log("pers.js> *** Executando pe_getaNavbarTop(" + titPage + ") ***");

    $.get( "html/nav-top-" + nomNavBar + ".html", function(data, status){
        console.log("pers.js> $.get(html/nav-top-" + nomNavBar + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_navbarTop").html(data);
            /*-- Executa procedimentos complementares --*/
            switch( titPage ) {
                case "Leitura":   
                    pd_setaIconRetorno( "index.html" );  
                    le_carregaTitViewLeitura();
                    break; 
                default:     
                    if ( nomNavBar === "page" ) {
                        pd_setaIconRetorno( "index.html" ); 
                        $("#id_checkLeituraLida").hide();
                        $("#id_nomeView").text( titPage );
                    };
            }; 
        };
    });

};


/*------------------------------------------------*/
function pe_getaHtmlPagina( localPage , nomePage ) {
/*------------------------------------------------*/
console.log("pers.js> *** Executando pe_getaHtmlPagina() ***");

    $.get( localPage + nomePage + ".html", function(data, status){
        console.log("pers.js> $.get(" + localPage + nomePage + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_corpoPagina").html(data);
            /*-- Executa procedimentos complementares --*/
            switch( nomePage ) {
                case "benvindo":   ev_trataPaginaBenvindo();   break; 
                case "home":       ev_trataPaginaHome();       break; 
                case "leitura":    le_trataPaginaLeitura();    break; 
                default:     
            }; 
        };
    });

};


/*---------------------------------------*/
function pe_getaNavbarBottom( nomNavBar ) {
/*---------------------------------------*/
console.log("pers.js> *** Executando pe_getaNavbarBottom() ***");

    $.get( "html/nav-bot-" + nomNavBar + ".html", function(data, status){
        console.log("pers.js> $.get(html/nav-bot-" + nomNavBar + ".html) status: " + status);
        if ( status === "success" ) {
            $("#id_navbarBottom").html(data);
            /*-- Executa procedimentos complementares --*/
            // switch( ev_urlPage ) {
            //     case "leitura":   le_preparaNavBottomLeitura();    break; 
            //     default:     
            // }; 
        };
    });

};


/*==============================================================
           MANUTENÇÃO DE USERLOGADO NA SESSIONSTORAGE
==============================================================*/

/*---------------------------------*/
function pe_gravaUserLendoSession() {
/*---------------------------------*/
console.log("pers.js> *** Executando pe_gravaUserLendoSession() ***");

    console.log("pers.js> sessionStorage.UserLendo(antes): " + sessionStorage.UserLendo);
    var myObj = pe_geraJsonUserLendo();
    var myJSON = JSON.stringify(myObj);
    console.log("pers.js> myJSON..........................: " + myJSON);
    sessionStorage.UserLendo  = myJSON;
    console.log("pers.js> sessionStorage.UserLendo(atual): " + sessionStorage.UserLendo);
    console.log("pers.js> -----------------------------------------------------------");

};


/*------------------------------------*/
function pe_recuperaUserLendoSession() {
/*------------------------------------*/
console.log("pers.js> *** Executando pe_recuperaUserLendoSession() ***");

    console.log("pers.js> sessionStorage.UserLendo.......: " + sessionStorage.UserLendo);

    try {
        var obj = JSON.parse( sessionStorage.UserLendo ); 
        ev_userLendo   = "S";
        ev_userTipo    = obj.userTipo;
        ev_userName    = obj.userName;
        ev_userImage   = obj.userImage;
        ev_userEmail   = obj.userEmail;
    } catch(err) {
        console.log("pers.js> err.message,....................: " + err.message);
        ev_userLendo   = "N";
        ev_userTipo    = "";
        ev_userName    = "";
        ev_userImage   = "";
        ev_userEmail   = "";
    };
    console.log("pers.js> ev_userLendo...: " + ev_userLendo);
    console.log("pers.js> ev_userTipo....: " + ev_userTipo);
    console.log("pers.js> ev_userName....: " + ev_userName);
    console.log("pers.js> ev_userImage...: " + ev_userImage);
    console.log("pers.js> ev_userEmail...: " + ev_userEmail);
    console.log("pers.js> -----------------------------------------------------------");

};

/*----------------------------------*/
function pe_deletaUserLendoSession() {
/*----------------------------------*/
console.log("pers.js> *** Executando pe_deletaUserLendoSession() ***");

    console.log("pers.js> sessionStorage.UserLendo(antes): " + sessionStorage.UserLendo);
    sessionStorage.UserLendo  = undefined;
    ev_userLendo   = "N";
    ev_userTipo    = "";
    ev_userName    = "";
    ev_userImage   = "";
    ev_userEmail   = "";
    console.log("pers.js> sessionStorage.UserLendo(atual): " + sessionStorage.UserLendo);
    console.log("pers.js> -----------------------------------------------------------");

};


/*-----------------------------*/
function pe_geraJsonUserLendo() {
/*-----------------------------*/
console.log("pers.js> *** Executando pe_geraJsonUserLendo() ***");

    return { "userTipo": ev_userTipo ,
             "userName": ev_userName , 
             "userImage": ev_userImage , 
             "userEmail": ev_userEmail ,
    };

};

