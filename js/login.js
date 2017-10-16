
$(document).ready(function(){

    //**-- Carrega a pagina para retornar apos o Login/Logout  --**/
    //**---------------------------------------------------------**/
    if ( sessionStorage.urlPage == null || sessionStorage.urlPage == undefined ) {
      $("#setaRetorno").attr("href", "index.html"); 
    } else {
      $("#setaRetorno").attr("href", sessionStorage.urlPage); 
    }
    console.log('sessionStorage.urlPage.....: ' + sessionStorage.urlPage );

    //**-- Verifica se tem usuario logado --**/
    //**------------------------------------**/
    if ( sessionStorage.userID == null || sessionStorage.userID == undefined ) {
        $("#tituloLogin").text("Login");
        $("#userImageURL").attr("src",undefined);
    } else {
        $("#tituloLogin").text("Logout");
        $("#userImageURL").attr("src",sessionStorage.userImageURL);
    };
    console.log('sessionStorage.userID......: ' + sessionStorage.userID );
    console.log('sessionStorage.userName....: ' + sessionStorage.userName );
    console.log('sessionStorage.userImageURL: ' + sessionStorage.userImageURL );
    console.log('sessionStorage.userEmail...: ' + sessionStorage.userEmail );

});
