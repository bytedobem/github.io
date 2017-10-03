
$(document).ready(function(){

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
    var pageURL = vars["page"];
    console.log("pageURL: " + pageURL);

    //**-- Captura a pagina a ser exibida --**
    //**------------------------------------**

    if ( pageURL == undefined ) {
        console.log("entrou no if do undefined");
        pageURL = "principal";
    };

    if ( pageURL == "" ) {
        console.log("entrou no if do haspas");
    };

    console.log("pageURL antes do get: " + pageURL);
    $.get(pageURL + ".html", function(data, status){
        console.log("status: " + status);
        if ( status === "success" ) {
            console.log("entrou no if do status");
            console.log("data: " + data);
            $("#corpoPagina").html(data);
        } else {
            console.log("entrou no ELSE do status");
            data = "<h3>Pagina não encontrada...</h3>";
            console.log("data: " + data);
            $("#corpoPagina").html(data);
        }
    });



/*
    var textoURL = getPagina(pageURL);
    console.log("voltou da função");
    console.log("textoURL: " + textoURL);
    $("#corpoPagina").html(textoURL);
*/
    /*
    switch(pageURL) {
    case "ajuda":
        console.log("case ajuda");
        $("#corpoPagina").html(getPagina(pageURL));
        break;
    case "contato":
        console.log("case contato");
        break;
    case "sobre":
        console.log("sobre");
        break;
    default:
        console.log("dafault");
    }
    */
    /*
    $.get("principal.html", function(data, status){
        if ( status === 0 ) {
            $("#corpoPagina").html(data);
        } else {
            $("#corpoPagina").html("<h3>Pagina não encontrada...</h3>");
        }
    });
    */      

    $("#btn-calcular").click(function(){
        console.log("Clicou em calcular...");
        // $(this).hide();
    });

    $("#btn-limpar").click(function(){
        console.log("Clicou em limpar...");
        // $(this).hide();
    });

});


/*
function getPagina(nomePagina) {
    console.log("entrou no getPagina");
    console.log("nomePagina: " + nomePagina);

    if ( nomePagina == undefined ) {
        console.log("entrou no if do undefined");
        nomePagina = "principal";
    };

    if ( nomePagina == "" ) {
        console.log("entrou no if do haspas");
    };

    console.log("nomePagina antes do get: " + nomePagina);
    $.get(nomePagina + ".html", function(data, status){
        console.log("status: " + status);
        if ( status === "success" ) {
            console.log("entrou no if do status");
            console.log("data: " + data);
    return data;
        } else {
            console.log("entrou no ELSE do status");
            data = "<h3>Pagina não encontrada...</h3>";
            console.log("data: " + data);
    return data;
        }
    });

};
*/

/*
$(document).ready(function(){
    
    console.log("Carregou a pagina...");
    $.get("principal.html", function(data, status){
        // alert("Data: " + data + "\n\n\n **** Status ****: " + status);
        $("#corpoPagina").html(data);
        // $("#corpoPagina").text("Já carregou a pagina...");
    });
});
*/