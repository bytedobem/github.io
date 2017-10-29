//***************************************************************************************************
// Projeto......: ByteDoBem   
// Site.........: www.bytedobem.com   
// Aplicativo...: Site do Byte    
// Modulo.......: padrao.js
// Autor........: Nivaldo   
// Data.........: 25/10/2017   
//***************************************************************************************************
// Versao 001-25/10/2017-(Nivaldo) Implantação.
//***************************************************************************************************
//
//      **-- DADOS ARMAZENADOS NA SESSIONSTORAGE --**
//      **------------------------------------------*      
//
//      **-- Dados de Controle de Login --**
//      sessionStorage.userLogado       --> "S" ou "N"
//      sessionStorage.tipoLogin        --> google ou facebook
//      sessionStorage.clickLogin       --> "S" ou "N" (usado no login.js)
//
//      **-- Dados de usuario logado --**
//      sessionStorage.userID       
//      sessionStorage.userName
//      sessionStorage.userImageURL
//      sessionStorage.userEmail
//
//      **-- Pagina que está sendo executada --**
//      sessionStorage.urlPage          --> Usado para retornar a pagina chamadora (login, contato, etc.)
//
//***************************************************************************************************
console.log("padrão.js> **** Esta Carregando o padrao.js ****");


/*===========================================================================*/
/* Funcao:                          INICIA PADRAO                            */
/*===========================================================================*/

function iniciaPadrao(nomePage) {
    console.log("padrao.js> Executando iniciaPadrao(" + nomePage + ")");

    /*-- Verifica usuario logado na sessionStorage --*/
    /*-----------------------------------------------*/

    if ( sessionStorage.userLogado == "S" ) {
        console.log("padrao.js> Usuario já está Logado...");
        $("#botaoLogin").html("Logout");
    } else {
        sessionStorage.userLogado   = "N";
        sessionStorage.tipoLogin    = undefined;
        sessionStorage.userID       = undefined;
        sessionStorage.userName     = undefined;
        sessionStorage.userImageURL = undefined;
        sessionStorage.userEmail    = undefined;
    };

    sessionStorage.clickLogin = "N";
    console.log('padrao.js> ---- Dados gravados na sessionStorage ----');
    console.log('padrao.js> userLogado....: ' + sessionStorage.userLogado );
    console.log('padrao.js> tipoLogin.....: ' + sessionStorage.tipoLogin );
    console.log('padrao.js> userID........: ' + sessionStorage.userID );
    console.log('padrao.js> userName......: ' + sessionStorage.userName );
    console.log('padrao.js> userImageURL..: ' + sessionStorage.userImageURL );
    console.log('padrao.js> userEmail.....: ' + sessionStorage.userEmail );
    console.log('padrao.js> clickLogin....: ' + sessionStorage.clickLogin );

};


/*===========================================================================*/
/* Funcao:                         DECODIFICA URL                            */
/*===========================================================================*/

function decodificaURL() {
    console.log("padrao.js> Executando decodificaURL()");

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

