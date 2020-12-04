!(function () {
    document.getElementById("start_gen").onclick = function() { 
        document.getElementById("maze_script").parentElement.removeChild(document.getElementById("maze_script"));

        if (parseInt(document.getElementById("user_width").value) > 95) document.getElementById("user_width").value = "95";
        if (parseInt(document.getElementById("user_height").value) > 45) document.getElementById("user_height").value = "45";
        //document.getElementById("user_height")

        var  start_script = document.createElement('script');
        start_script.id = "maze_script";

        var algorithm = document.getElementById("user_algorithm").value;
        switch (algorithm) {
            case "Алгоритм Прима":
                start_script.src = "js/Prims_algorithm.js";
                break;
            case "Recursive Backtracker":
                start_script.src = "js/recursive_backtracker.js";
                break;
            case "Hunt and Kill":
                start_script.src = "js/hunt_and_kill.js";
                break;
        }
        document.body.appendChild(start_script);
    }
})();