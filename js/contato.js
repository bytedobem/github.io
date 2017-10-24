console.log("contato.js> **** Esta Carregando o contato.js ****");

$(document).ready(function(){
    console.log("contato.js> **** Esta Executando o Ready ****");

    $("#loader").hide();
    $("#pag-contato").removeClass("invisible");
    $("#pag-contato").show();

    /*-- Executa o padrao.js --*/
    /*-------------------------*/

    iniciaPadrao("contato"); 

    //**-- Carrega a pagina para retornar apos o Contato  --**/
    //**----------------------------------------------------**/

    if ( sessionStorage.urlPage == null || sessionStorage.urlPage == undefined ) {
      $("#setaRetorno").attr("href", "index.html"); 
      $(".btn-voltar").attr("href", "index.html"); 
    } else {
      $("#setaRetorno").attr("href", sessionStorage.urlPage); 
      $(".btn-voltar").attr("href", sessionStorage.urlPage); 
    }
    console.log('contato.js> sessionStorage.urlPage.....: ' + sessionStorage.urlPage );

    console.log("contato.js> **** Fim do Ready ****");
});

