document.getElementById("main").style.marginLeft = (window.innerWidth - 960) / 2 + "px";

document.getElementById("canvas").width = 450;
document.getElementById("canvas").height = 300;
document.getElementById("canvas").style.marginLeft = (document.getElementById("game_window").clientWidth - canvas.width) / 2 + "px";
document.getElementById("canvas").style.marginTop = (document.getElementById("game_window").clientHeight - canvas.height) / 2 + "px";


document.addEventListener("DOMContentLoaded", function (event) {
    window.onresize = function () {
        document.getElementById("main").style.marginLeft = (window.innerWidth - 960) / 2 + "px";
        
        document.getElementById("canvas").style.marginLeft = (document.getElementById("game_window").clientWidth - document.getElementById("canvas").width) / 2 + "px";
        document.getElementById("canvas").style.marginTop = (document.getElementById("game_window").clientHeight - document.getElementById("canvas").height) / 2 + "px";
    };
});
