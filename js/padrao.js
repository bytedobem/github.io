/*=============================================================
Projeto......: ByteDoBem
Aplicativo...: Site do ByteDoBem
Modulo.......: padrao.js
Objetivo.....: Javascript padrão
===============================================================
Vrs001-13/11/2017-Nivaldo-Implantação.
=============================================================*/
console.log("padr.js> *** Executando padrao.js ***");


/*
    <<====  VARIAVEIS DA SESSION STORAGE - PADRÃO ====>>
    sessionStorage.urlPage    -> URL da pagina chamadora (para retorno)
    sessionStorage.userLogado -> "S" se tem user logado
    sessionStorage.userTipo   -> user que está lendo (google ou facebook)
    sessionStorage.userNome   -> Nome do usuario que está lendo
    sessionStorage.userImage  -> URL da imagem do usuario que está lendo
    sessionStorage.userEmail  -> Enail do usuario que está lendo

    <<====  VARIAVEIS DA SESSION STORAGE - EVANGELHO365 ====>>
    sessionStorage.userLendo  -> "S" se usuario já estiver lendo (pula tela Benvindo)
    sessionStorage.iniLeitur  -> data de inicio da Leitura
    sessionStorage.arrayLidas -> array de Leituras Lidas
*/



/*==============================================================
                       Funções DIVERSAS
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


/*----------------------------------*/
function pd_validaString( textoVal ) {
/*----------------------------------*/
    console.log("padr.js> *** Executando validaString(" + textoVal + ") ***");
    var result = true;

    if ( textoVal === undefined ) {
        console.log("padr.js> textoVal é undefined");
        result = false;
    } else {
        if ( textoVal === null ) {
            console.log("padr.js> textoVal é null");
            result = false;
        } else {
            if ( textoVal === "" ) {
                console.log("padr.js> textoVal é branco");
                result = false;
            };
        };
    };

    return result;
};


/*---------------------------------------*/
function pd_setaIconRetorno( urlDefault ) {
/*---------------------------------------*/

    if ( sessionStorage.urlPage === undefined || sessionStorage.urlPage === null || sessionStorage.urlPage === "" ) {
        $( "#id_iconRetorno" ).attr( "href", urlDefault ); 
        console.log("padr.js> setaIconRetorno: (urlPage undefined)" );
    } else {
        $( "#id_iconRetorno" ).attr( "href", sessionStorage.urlPage ); 
        console.log("padr.js> setaIconRetorno: " + sessionStorage.urlPage );
    };

};


/*------------------------*/
function pd_gravaUrlPage() {
/*------------------------*/

    sessionStorage.urlPage = window.location.href;        // Returns full URL
    console.log("padr.js> sessionStorage.urlPage: " + sessionStorage.urlPage);

};


