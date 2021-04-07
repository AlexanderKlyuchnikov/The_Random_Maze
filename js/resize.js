if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    //------------------------------------------------------parallax
    function bgMove(e) {
        var x = e.clientX / window.innerWidth;
        var y = e.clientY / window.innerHeight;
        bg.style.transform = "translate(-" + x * 50 + "px, -" + y * 50 + "px)";
    }
    var bg = document.getElementById("bg");
    window.addEventListener("mousemove", function (e) {bgMove(e)});
    document.getElementById("game_window").addEventListener("mousemove", function (e) { bgMove(e) });

    //------------------------------------------------------parallax
    document.getElementById("main").style.marginLeft = (window.innerWidth - 960) / 2 + "px";
    document.addEventListener("DOMContentLoaded", function (event) {
        window.onresize = function () {
            document.getElementById("main").style.marginLeft = (window.innerWidth - 960) / 2 + "px";
        };
    });
}
else
{
    document.getElementById("main").clientHeight = window.innerHeight;
}