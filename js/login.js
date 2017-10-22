console.log("login.js> **** Esta Carregando o login.js ****");

$(document).ready(function(){
    console.log("login.js> **** Esta Executando o Ready ****");

    $("#loader").hide();
    $("#pag-logout").hide();
    $("#pag-login").hide();
    $("#pag-logout").removeClass("invisible");
    $("#pag-login").removeClass("invisible");

    /*-- Executa o padrao.js --*/
    /*-------------------------*/

    iniciaPadrao("login"); 

    //**-- Carrega a pagina para retornar apos o Login/Logout  --**/
    //**---------------------------------------------------------**/

    if ( sessionStorage.urlPage == null || sessionStorage.urlPage == undefined ) {
      $("#setaRetorno").attr("href", "index.html"); 
      $(".btn-voltar").attr("href", "index.html"); 
    } else {
      $("#setaRetorno").attr("href", sessionStorage.urlPage); 
      $(".btn-voltar").attr("href", sessionStorage.urlPage); 
    }
    console.log('login.js> sessionStorage.urlPage.....: ' + sessionStorage.urlPage );


    //**-- Prepara a pagina para Login/Logout --**/
    //**----------------------------------------**/

    var titPage; 

    console.log('login.js> sessionStorage.userLogado..: ' + sessionStorage.userLogado );
    if ( sessionStorage.userLogado == "true" ) {
        titPage = "Logout"
        $("#pag-logout").show();
        $("#pag-login").hide();
    } else {
        titPage = "Login"
        $("#pag-login").show();
        $("#pag-logout").hide();
    };
    $("#tituloLogin").text(titPage);

    if ( sessionStorage.userLogado == "true" ) {
        $("#userImageURL").attr("src", sessionStorage.userImageURL); 
        $("#userName").text(sessionStorage.userName); 
        $("#userEmail").text(sessionStorage.userEmail); 
    };

    /*-- Click do Botao de LOGOUT --*/
    $("#btn-logout").click(function(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            sessionStorage.userLogado   = false;
            sessionStorage.tipoLogin    = undefined;
            sessionStorage.userID       = undefined;
            sessionStorage.userName     = undefined;
            sessionStorage.userImageURL = undefined;
            sessionStorage.userEmail    = undefined;
            $("#tituloLogin").text("Login");
            $("#pag-logout").hide();
            $("#pag-login").show();
        });
    });

    /*-- Click no Botao de Login do Google --*/
    $("#my-signin2").click(function(){
        console.log("login.js> ###### clicou no botao do LOGIN ######");
        sessionStorage.clickLogin = true;
    });
   
    console.log("login.js> **** Fim do Ready ****");
});

/*--     Funcoes do GOOGLE     --*/
/*-------------------------------*/

function onSignIn(googleUser) {
    console.log('login.js> ******* FUNCAO LOGIN *******');
    console.log('login.js> sessionStorage.clickLogin: ' + sessionStorage.clickLogin);
    var profile = googleUser.getBasicProfile();
    //**-- Carrega os dados do Usuario na sessao --*/
    if ( sessionStorage.clickLogin == "true" ) {
        console.log('login.js> entroi no IF do clickLogin');
        sessionStorage.userLogado   = true;
        sessionStorage.tipoLogin    = "google";
        sessionStorage.userID       = profile.getId();
        sessionStorage.userName     = profile.getName();
        sessionStorage.userImageURL = profile.getImageUrl();
        sessionStorage.userEmail    = profile.getEmail();
        //**-- Prepara a pagina de Logout --**//
        $("#tituloLogin").text("Logout");
        $("#pag-login").hide();
        $("#pag-logout").show();
        $("#userImageURL").attr("src", sessionStorage.userImageURL); 
        $("#userName").text(sessionStorage.userName); 
        $("#userEmail").text(sessionStorage.userEmail);
        //**-- Retorna o clickLogin para false --*/
        sessionStorage.clickLogin = false; 
    };
};

function onFailure(error) {
    console.log(error);
};

