
$(document).ready(function(){



    var data;
    // var profile = googleUser.getBasicProfile();
    // console.log("login.js> profile.getId()...:" + profile.getId());

 // var profile = auth2.currentUser.get().getBasicProfile();
    
 



    //**-- Carrega a pagina para retornar apos o Login/Logout  --**/
    //**---------------------------------------------------------**/
    if ( sessionStorage.urlPage == null || sessionStorage.urlPage == undefined ) {
      $("#setaRetorno").attr("href", "index.html"); 
      $(".btn-voltar").attr("href", "index.html"); 
    } else {
      $("#setaRetorno").attr("href", sessionStorage.urlPage); 
      $(".btn-voltar").attr("href", sessionStorage.urlPage); 
    }
    // console.log('login.js> sessionStorage.urlPage.....: ' + sessionStorage.urlPage );

    //**-- Verifica se tem usuario logado --**/
    //**------------------------------------**/
    $("#loader").hide();
    $("#paginaLogin").hide();
    $("#paginaLogado").hide();
    $("#paginaLogin").removeClass("invisible");
    $("#paginaLogado").removeClass("invisible");
    console.log('login.js> ******* INICIO LOGIN.JS *******');
    console.log('login.js> sessionStorage.userID......: ' + sessionStorage.userID );
    console.log('login.js> sessionStorage.userName....: ' + sessionStorage.userName );
    console.log('login.js> sessionStorage.userImageURL: ' + sessionStorage.userImageURL );
    console.log('login.js> sessionStorage.userEmail...: ' + sessionStorage.userEmail );
    if ( sessionStorage.userID == "null" ) {
        console.log('login.js> Entrou no IF do null ');
    };
    if ( sessionStorage.userID == "undefined" ) {
        console.log('login.js> Entrou no IF do undefined ');
    };
    if ( sessionStorage.userID == "null" || sessionStorage.userID == "undefined" ) {
        $("#tituloLogin").text("Login");
        $("#paginaLogin").show();
    } else {
        $("#tituloLogin").text("Logout");
        $("#userImageURL").attr("src", sessionStorage.userImageURL); 
        $("#userName").text(sessionStorage.userName); 
        $("#userEmail").text(sessionStorage.userEmail); 
        $("#paginaLogado").show();
    };

    $("#btn-logout").click(function(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            // console.log('login.js> Entrou na funcao do signOut()');
            console.log('login.js> ******* FUNCAO LOGOUT *******');
            sessionStorage.userID       = undefined;
            sessionStorage.userName     = undefined;
            sessionStorage.userImageURL = undefined;
            sessionStorage.userEmail    = undefined;
            console.log('login.js> sessionStorage.userEmail...: ' + sessionStorage.userEmail );
            $("#tituloLogin").text("Login");
            $("#paginaLogado").hide();
            $("#paginaLogin").show();
        });
    });

});

function onSignIn(googleUser) {
    console.log('login.js> ******* FUNCAO LOGIN *******');
    var profile = googleUser.getBasicProfile();
    // console.log('Google> ID.......: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Google> Name.....: ' + profile.getName());
    //console.log('Google> Image URL: ' + profile.getImageUrl());
    console.log('Google> Email....: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //**-- Carrega os dados do Usuario na sessao --*/
    sessionStorage.userID       = profile.getId();
    sessionStorage.userName     = profile.getName();
    sessionStorage.userImageURL = profile.getImageUrl();
    sessionStorage.userEmail    = profile.getEmail();
    $("#tituloLogin").text("Logout");
    $("#paginaLogin").hide();
    $("#userImageURL").attr("src", sessionStorage.userImageURL); 
    $("#userName").text(sessionStorage.userName); 
    $("#userEmail").text(sessionStorage.userEmail); 
    $("#paginaLogado").show();
}

function onFailure(error) {
    console.log(error);
}

