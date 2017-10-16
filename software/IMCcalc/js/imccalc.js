
$(document).ready(function(){

    //**-- Verifica se tem usuario logado --**/
    //**------------------------------------**/
    if ( sessionStorage.userID == null || sessionStorage.userID == undefined ) {
        $("#userLogado").hide();
    } else {
        $("#userLogado").show();
    };
    console.log('sessionStorage.userID......: ' + sessionStorage.userID );
    console.log('sessionStorage.userName....: ' + sessionStorage.userName );
    console.log('sessionStorage.userImageURL: ' + sessionStorage.userImageURL );
    console.log('sessionStorage.userEmail...: ' + sessionStorage.userEmail );

    //**-- Guarda a URL da pagina na sessionStorage --**/
    //**----------------------------------------------**/
    sessionStorage.urlPage = window.location.href;     // Returns full URL
    console.log("sessionStorage.urlPage.....: " + sessionStorage.urlPage);



    var pageParm;        // parametro "page" da URL.
    var pageURL;         // caminho para o parametro "page" da URL.

    //**-- Decodifica os parametros da URL --**
    //**-------------------------------------**

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    pageParm = vars["page"];
    pageURL  = vars["page"];
    console.log("pageURL: " + pageURL);

    //**-- Captura a pagina a ser exibida --**
    //**------------------------------------**

    if ( pageURL == undefined ) {
        console.log("entrou no if do undefined");
        pageURL  = "calculo";
        pageParm = "calculo";
    };

    if ( pageURL == "" ) {
        console.log("entrou no if do haspas");
    };

    if ( pageURL == "contato" ) {
        console.log("entrou no if do contato");
        pageURL = '../../' + pageURL;
    };

    console.log("pageURL antes do get: " + pageURL);
    $.get(pageURL + ".html", function(data, status){
        console.log("status: " + status);
        if ( status === "success" ) {
            console.log("entrou no if do status");
        //    console.log("data: " + data);
            $("#corpoPagina").html(data);
        } else {
            console.log("entrou no ELSE do status");
            data = "<h3>Pagina não encontrada...</h3>";
        //    console.log("data: " + data);
            $("#corpoPagina").html(data);
        }
    });

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

});

