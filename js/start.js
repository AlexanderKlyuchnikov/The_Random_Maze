!(function () {
    document.getElementById("start_gen").onclick = function () { 
        width = Number.parseInt(document.getElementById("user_width").value);
        height = Number.parseInt(document.getElementById("user_height").value);
        mazewidth = walllength * width - wallwidth * (width - 1);
        mazeheight = walllength * height - wallwidth * (height - 1);
        loffset = (windowwidth - mazewidth) / 2;
        Crafty.enterScene("game");
        var algorithm = document.getElementsByName("alg_name");
        if (algorithm[0].checked){
            Prims_algorithm();
        }
        if (algorithm[1].checked) {
            recursive_backtracker();
        }
        if (algorithm[2].checked) {
            hunt_and_kill();
        }
    }
})();