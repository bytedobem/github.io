console.log("evangelho365.js> **** Esta Carregando o padrao.js ****");

/*-- Inicializacao das Variaveis Globais --*/
var estaLogado;

/*-- Dados da sessionStorage utilizados --*/
//      **-- Dados de usuario logado --**
//      sessionStorage.userLogado
//      sessionStorage.tipoLogin
//      sessionStorage.googleID       
//      sessionStorage.googleName
//      sessionStorage.googleImageURL
//      sessionStorage.googleEmail
//      **-- Pagina que está sendo executada --**
//      sessionStorage.urlPage


/*-- Funcao: iniciaPadrao --*/
/*--------------------------*/

function iniciaPadrao(nomePage) {
    console.log("padrao.js> Executando iniciaPadrao(" + nomePage + ")");

    /*-- Verifica usuario logado na sessionStorage --*/
    /*-----------------------------------------------*/

    if ( sessionStorage.userLogado == "true" ) {
        console.log("padrao.js> Usuario já está Logado...");
        $("#menuLogin").html("<span class='glyphicon glyphicon-log-out'></span> Logout");
    } else {
        sessionStorage.userLogado     = false;
        sessionStorage.tipoLogin      = undefined;
        sessionStorage.googleID       = undefined;
        sessionStorage.googleName     = undefined;
        sessionStorage.googleImageURL = undefined;
        sessionStorage.googleEmail    = undefined;
    };
    console.log('padrao.js> sessionStorage.userLogado..: ' + sessionStorage.userLogado );
    console.log('padrao.js> sessionStorage.tipoLogin...: ' + sessionStorage.tipoLogin );
    console.log('padrao.js> sessionStorage.userID......: ' + sessionStorage.googleID );
    console.log('padrao.js> sessionStorage.userName....: ' + sessionStorage.googleName );
    console.log('padrao.js> sessionStorage.userImageURL: ' + sessionStorage.googleImageURL );
    console.log('padrao.js> sessionStorage.userEmail...: ' + sessionStorage.googleEmail );

};


/*-- Funcao: decodificaURL --*/
/*---------------------------*/

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

