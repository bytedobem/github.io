
function trataTopnav() {
    var x = document.getElementById("myTopnav");
    if ( x.className === "topnav" ) {
        x.className += " responsive";
        console.log("x.className: " + x.className);
    } else {
        x.className = "topnav";
        console.log("x.className: " + x.className);
    }
}
