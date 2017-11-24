/*=============================================================
Projeto......: ByteDoBem
Aplicativo...: Site do ByteDoBem
Modulo.......: padrao.js
Objetivo.....: Javascript padrão
===============================================================
Vrs001-13/11/2017-Nivaldo-Implantação.
=============================================================*/
console.log("padr.js> *** Executando padrao.js ***");


/*-- Varaveis do Usuario logado na sessionStorage --*/
var ws_userSession = "N";
var ws_userTipo    = "";
var ws_userName    = "";
var ws_userImage   = "";
var ws_userEmail   = "";


/*==============================================================
                      Funções de USUÁRIO
==============================================================*/

/*----------------------------------*/
function pd_gravaUserLogadoSession() {
/*----------------------------------*/
console.log("padr.js> *** Executando pd_gravaUserLogadoSession() ***");

    console.log("padr.js> sessionStorage.userLogado(antes): " + sessionStorage.userLogado);
    var myObj = pd_geraJsonUserLogado();
    var myJSON = JSON.stringify(myObj);
    console.log("padr.js> myJSON..........................: " + myJSON);
    sessionStorage.userLogado  = myJSON;
    console.log("padr.js> sessionStorage.userLogado(atual): " + sessionStorage.userLogado);
    console.log("padr.js> -----------------------------------------------------------");

};


/*-------------------------------------*/
function pd_recuperaUserLogadoSession() {
/*-------------------------------------*/
console.log("padr.js> *** Executando pd_recuperaUserLogadoSession() ***");

    console.log("padr.js> sessionStorage.userLogado.......: " + sessionStorage.userLogado);

    try {
        var obj = JSON.parse( sessionStorage.userLogado ); 
        ws_userSession = "S";
        ws_userTipo    = obj.userTipo;
        ws_userName    = obj.userName;
        ws_userImage   = obj.userImage;
        ws_userEmail   = obj.userEmail;
    } catch(err) {
        console.log("padr.js> err.message,....................: " + err.message);
        ws_userSession = "N";
        ws_userTipo    = "";
        ws_userName    = "";
        ws_userImage   = "";
        ws_userEmail   = "";
    };
    console.log("padr.js> ws_userSession.........: " + ws_userSession);
    console.log("padr.js> ws_userTipo............: " + ws_userTipo);
    console.log("padr.js> ws_userName............: " + ws_userName);
    console.log("padr.js> ws_userImage...........: " + ws_userImage);
    console.log("padr.js> ws_userEmail...........: " + ws_userEmail);
    console.log("padr.js> -----------------------------------------------------------");

};

/*-----------------------------------*/
function pd_deletaUserLogadoSession() {
/*-----------------------------------*/
console.log("padr.js> *** Executando pd_deletaUserLogadoSession() ***");

    console.log("padr.js> sessionStorage.userLogado(antes): " + sessionStorage.userLogado);
    sessionStorage.userLogado  = undefined;
    ws_userSession = "N";
    ws_userTipo    = "";
    ws_userName    = "";
    ws_userImage   = "";
    ws_userEmail   = "";
    console.log("padr.js> sessionStorage.userLogado(atual): " + sessionStorage.userLogado);
    console.log("padr.js> -----------------------------------------------------------");

};


/*------------------------------*/
function pd_geraJsonUserLogado() {
/*------------------------------*/
console.log("padr.js> *** Executando pd_geraJsonUserLogado() ***");

    return { "userTipo": ws_userTipo , "userName": ws_userName , "userImage": ws_userImage , "userEmail": ws_userEmail };

};


/*==============================================================
                        Funções de URL
==============================================================*/

/*-------------------------*/
function pd_decodificaURL() {
/*-------------------------*/
console.log("padr.js> *** Executando decodificaURL() ***");

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
};


/*---------------------------------------*/
function pd_recuperaUrlPage( urlDefault ) {
/*---------------------------------------*/
console.log("padr.js> *** Executando recuperaUrlPage(" + urlDefault + ") ***");

    var inUrlValida = "S";
    var urlHaRetornar = "index.html";

    try {
        if ( sessionStorage.urlPage === undefined ) { inUrlValida = "N"; };
        if ( sessionStorage.urlPage === null ) { inUrlValida = "N"; };
        if ( sessionStorage.urlPage === "" ) { inUrlValida = "N"; };
    } catch(err) {
        inUrlValida = "N";
    };

    if ( inUrlValida === "S" ) {
        urlHaRetornar = sessionStorage.urlPage; 
        console.log("padr.js> urlHaRetornar: (moveu da sessionStorage)" );
    } else {
        if ( urlDefault.length > 0 ) {
            urlHaRetornar = urlDefault; 
            console.log("padr.js> urlHaRetornar: (moveu da urlDefault)" );
        };
    };

    console.log("padr.js> urlHaRetornar: " + urlHaRetornar );
    return urlHaRetornar;
};


/*------------------------*/
function pd_gravaUrlPage() {
/*------------------------*/

    sessionStorage.urlPage = window.location.href;  // Returns full URL
    console.log("padr.js> sessionStorage.urlPage: " + sessionStorage.urlPage);

};


/*---------------------------*/
function pd_setaIconRetorno() {          // ACERTAR para colocar try err
/*---------------------------*/
                
    if ( sessionStorage.urlPage === undefined || sessionStorage.urlPage === null || sessionStorage.urlPage === "" ) {
        $( "#id_iconRetorno" ).attr( "href", "index.html" ); 
        console.log("padr.js> setaIconRetorno: (urlPage undefined)" );
    } else {
        $( "#id_iconRetorno" ).attr( "href", sessionStorage.urlPage ); 
        console.log("padr.js> setaIconRetorno: " + sessionStorage.urlPage );
    };

};


/*==============================================================
                       Funções DIVERSAS
==============================================================*/

/*----------------------------------*/
function pd_validaString( textoVal ) {
/*----------------------------------*/
console.log("padr.js> *** Executando pd_validaString(" + textoVal + ") ***");

    var result = "S";

    if ( textoVal === undefined ) {
        console.log("padr.js> textoVal é undefined");
        result = "N";
    } else {
        if ( textoVal === null ) {
            console.log("padr.js> textoVal é null");
            result = "N";
        } else {
            if ( textoVal === "" ) {
                console.log("padr.js> textoVal é branco");
                result = "N";
            };
        };
    };

    return result;
};

