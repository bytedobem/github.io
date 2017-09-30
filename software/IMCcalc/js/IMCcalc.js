
$(document).ready(function(){
    
    $("#btn-calcular").click(function(){
        console.log("Clicou em calcular...");
        // $(this).hide();
    });

    $("#btn-limpar").click(function(){
        console.log("Clicou em limpar...");
        // $(this).hide();
    });

});

$(document).ready(function(){
    
    console.log("Carregou a pagina...");
    $.get("principal.html", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});