console.log("evangelho365.js> **** Esta Carregando o evangelho365.js ****");

$(document).ready(function(){
    console.log("evangelho365.js> **** Esta Executando o Ready ****");

    /*-- Executa o padrao.js --*/
    /*-------------------------*/

    iniciaPadrao("evangelho365"); 


    //**-- Guarda a URL da pagina na sessionStorage --**/
    //**----------------------------------------------**/

    sessionStorage.urlPage = window.location.href;     // Returns full URL
    console.log("evangelho365.js> sessionStorage.urlPage: " + sessionStorage.urlPage);


    
    /*
    var pageParm;        // parametro "page" da URL.
    var pageURL;         // caminho para o parametro "page" da URL.
    */

    //**-- Decodifica os parametros da URL --**
    //**-------------------------------------**

    var pageURL;
    var vars = [];
    vars = decodificaURL();
    pageURL  = vars["page"];
    console.log("evangelho365.js> pageURL original: " + pageURL);

    if ( pageURL == undefined || pageURL == null || pageURL == "" ) {
        pageURL  = "principal";
    };

    /*
    if ( pageURL == "contato" ) {
        console.log("entrou no if do contato");
        pageURL = '../../' + pageURL;
    };   */
    console.log("evangelho365.js> pageURL final...: " + pageURL);

    //**-- Captura a pagina a ser exibida --**
    //**------------------------------------**

    $.get(pageURL + ".html", function(data, status){
        console.log("evangelho365.js> get(pageURL) status: " + status);
        if ( status === "success" ) {
            // console.log("evangelho365.js> data: " + data);
            $("#corpoPagina").html(data);
        } else {
            data = "<h3>Pagina não encontrada...</h3>";
            $("#corpoPagina").html(data);
        }
    });

    /*
    $( "#menu_calculo" ).removeClass( "ativado" );
    $( "#menu_info"    ).removeClass( "ativado" );
    $( "#menu_contato" ).removeClass( "ativado" );
    $( "#menu_sobre"   ).removeClass( "ativado" );
    $( "#menu_" + pageParm ).addClass( "ativado" );


    $("#btn-calcular").click(function(){
        console.log("Clicou em calcular...");
        // $(this).hide();
    });

    $("#btn-limpar").click(function(){
        console.log("Clicou em limpar...");
        // $(this).hide();
    });
    */

});

