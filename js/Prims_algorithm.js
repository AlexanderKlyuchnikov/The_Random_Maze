!(function (maze, wallsInProcess) {
        var width = Number.parseInt(document.getElementById("user_width").value);
        var height = Number.parseInt(document.getElementById("user_height").value);
        if (width % 2 == 0) width++;
        if (height % 2 == 0) height++;
        var currPos = [0, 0];

        var canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d");
            wallcolor = "rgb(178,113,2)";
            passcolor = "rgb(219,199,180)";
            playercolor = "red";
            finishcolor = "blue";
            k = 10;
            
        for (var y = 0; y < height; y++) {
            maze[y] = [];
            for (var x = 0; x < width; x++) 
                 maze[y][x] = "pass";
        }

        for (var y = 0; y < height; y++) {
            maze[y] = [];
            for (var x = 0; x < width; x++) 
                maze[y][x] = "wall";
         }
        
        canvas.width = width * k;
        canvas.height = height * k;
        canvas.style.marginLeft = (document.getElementById("game_window").clientWidth - canvas.width) / 2 + "px";
        canvas.style.marginTop = (document.getElementById("game_window").clientHeight - canvas.height) / 2 + "px";
        
        var finish_gif = document.getElementById("finish_gif");
        finish_gif.style.height = "";
        finish_gif.style.width = "";
        finish_gif.style.visibility = "hidden";
        if (width < height) 
            finish_gif.style.width = width * k + "px"; 
        else
            finish_gif.style.height = height * k + "px";
        finish_gif.style.left = canvas.offsetLeft + (canvas.width - finish_gif.width)/2 + "px";
        finish_gif.style.top = canvas.offsetTop + (canvas.height - finish_gif.height)/2 +"px";
        
        ctx.fillStyle = wallcolor;
        ctx.fillRect(0, 0, width * k, height * k);

        function inside(y, x) {
            return y < height && y >= 0 && x < width && x >= 0 ? true : false;
        }

        function makePass(y, x) {
            maze[y][x] = "pass";
            ctx.fillStyle = passcolor;
            ctx.fillRect(x * k, y * k, k, k);
        }

        function FindNeigh(y, x) {
          if (inside(y + 1, x) && maze[y + 1][x] == "wall")
            wallsInProcess.push([y + 1, x, [y, x]]);
          if (inside(y - 1, x) && maze[y - 1][x] == "wall")
            wallsInProcess.push([y - 1, x, [y, x]]);
          if (inside(y, x + 1) && maze[y][x + 1] == "wall")
            wallsInProcess.push([y, x + 1, [y, x]]);
          if (inside(y, x - 1) && maze[y][x - 1] == "wall")
            wallsInProcess.push([y, x - 1, [y, x]]);
        }

        FindNeigh(currPos[0], currPos[1]);
        makePass(currPos[0], currPos[1]);
        while (wallsInProcess.length != 0) {
            var randomWall = wallsInProcess[Math.floor(Math.random() * wallsInProcess.length)];
            var opposite = [
                randomWall[2][0] + (randomWall[0] - randomWall[2][0]) * 2,
                randomWall[2][1] + (randomWall[1] - randomWall[2][1]) * 2,
            ];
            if (inside(opposite[0], opposite[1])) {
                if (maze[opposite[0]][opposite[1]] == "pass")
                    wallsInProcess.splice(wallsInProcess.indexOf(randomWall), 1);
            else {
                makePass(randomWall[0], randomWall[1]);
                makePass(opposite[0], opposite[1]);
                FindNeigh(opposite[0], opposite[1]);
            }
            } else walls.splice(walls.indexOf(randomWall), 1);
        }  
        ctx.fillStyle = playercolor;
        ctx.fillRect(0, 0, k, k);
        ctx.fillStyle = finishcolor;
        ctx.fillRect(k * (width - 1), k * (height - 1), k, k);
        document.body.onkeydown = function (e) {
            var nextPos = currPos;
            if (e.code == "ArrowLeft") nextPos = [currPos[0], currPos[1] - 1];
            if (e.code == "ArrowUp") nextPos = [currPos[0] - 1, currPos[1]];
            if (e.code == "ArrowRight") nextPos = [currPos[0], currPos[1] + 1];
            if (e.code == "ArrowDown") nextPos = [currPos[0] + 1, currPos[1]];
            if (inside(nextPos[0], nextPos[1]) && maze[nextPos[0]][nextPos[1]] == "pass") {
                ctx.fillStyle = passcolor;
                ctx.fillRect(currPos[1] * k, currPos[0] * k, k, k);
                currPos = nextPos;
                ctx.fillStyle = playercolor;
                ctx.fillRect(currPos[1] * k, currPos[0] * k, k, k);
            }
            if (nextPos[0] == height - 1 && nextPos[1] == width - 1) {
                ctx.fillStyle = "rgba(0,0,0,0.7)";
                ctx.fillRect(0, 0, width * k, height * k);
                finish_gif.style.visibility = "visible";
                document.body.onkeydown = null;
            }
        };
})([], []);
