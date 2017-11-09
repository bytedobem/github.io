/*=============================================================================================*/
/* Projeto......: Byte do Bem
/* Modulo.......: common.js 
/* Objetivo.....: JavaScript comum a todo o site
/*=============================================================================================*/
/* Vrs001-08-11-2017-Nivaldo-Implantacao
/*=============================================================================================*/
console.log("common.js> **** CARREGANDO ****");

/*==============================================================
                       Funções da NAVBAR
==============================================================*/

/*-------------------*/
function cm_openNav() {
/*-------------------*/
    document.getElementById("cm_myNav").style.width = "100%";
};
  
/*--------------------*/
function cm_closeNav() {
/*--------------------*/
    document.getElementById("cm_myNav").style.width = "0%";
};

/*==============================================================
                       Funções DIVERSAS
==============================================================*/

/*------------------------*/
function cm_gravaUrlPage() {
/*------------------------*/
    sessionStorage.urlPage = window.location.href;        // Returns full URL
    console.log("common.js> sessionStorage.urlPage: " + sessionStorage.urlPage);
};

/*---------------------------*/
function cm_setaIconRetorno() {
/*---------------------------*/
    if ( sessionStorage.urlPage == null || sessionStorage.urlPage == undefined ) {
        $( "#id_iconRetorno" ).attr( "href", "index.html" ); 
        console.log("common.js> cm_setaIconRetorno: index.html" );
    } else {
        $( "#id_iconRetorno" ).attr( "href", sessionStorage.urlPage ); 
        console.log("common.js> cm_setaIconRetorno: " + sessionStorage.urlPage );
    };
};
