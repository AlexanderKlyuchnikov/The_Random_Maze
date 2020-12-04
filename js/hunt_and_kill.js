!(function () {
    var width = Number.parseInt(document.getElementById("user_width").value);
    var height = Number.parseInt(document.getElementById("user_height").value);
    if (width % 2 == 0) width++;
    if (height % 2 == 0) height++;
    currPos = [0, 0];

    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");
        wallcolor = "rgb(178,113,2)";
        passcolor = "rgb(219,199,180)";
        playercolor = "red";
        finishcolor = "blue";
        k = 10;
        maze = [];
        UnVisNeigh = [];
    canvas.width = width * k;
    canvas.height = height * k;
    canvas.style.marginLeft = (document.getElementById("game_window").clientWidth - canvas.width) / 2 + "px";
    canvas.style.marginTop = (document.getElementById("game_window").clientHeight - canvas.height) / 2 + "px";

    var finish_gif = document.getElementById("finish_gif");
    finish_gif.style.height = "";
    finish_gif.style.width = "";
    finish_gif.style.visibility = "hidden";
    if (width < height) finish_gif.style.width = width * k + "px";
    else finish_gif.style.height = height * k + "px";
    finish_gif.style.left =canvas.offsetLeft + (canvas.width - finish_gif.width) / 2 + "px";
    finish_gif.style.top = canvas.offsetTop + (canvas.height - finish_gif.height) / 2 + "px";

    for (var y = 0; y < height; y++) {
        maze[y] = [];
        var pass_or_wall = 1;
        for (var x = 0; x < width; x++) {
            maze[y][x] = [];
            if (y % 2 == 1)
            {
                maze[y][x] = "wall";
                ctx.fillStyle = wallcolor;
            }
            else
            if (pass_or_wall == 1) {
                maze[y][x].push("cell",false);
                ctx.fillStyle = passcolor;
            }
            else {
                maze[y][x] = "wall";
                ctx.fillStyle = wallcolor;
            }
            ctx.fillRect(x * k, y * k, k, k);
            pass_or_wall *= -1;
        }
    }

    
    function inside(y, x) {
        return y < height && y >= 0 && x < width && x >= 0 ? true : false;
    }
    function makePass(y, x) {
        maze[y][x] = "pass";
        ctx.fillStyle = passcolor;
        ctx.fillRect(x * k, y * k, k, k);
    }
    function FindUnVisNeigh(y, x) {
        if (inside(y + 2, x) && maze[y + 2][x][1] == false)
            UnVisNeigh.push([[y + 2, x], [y + 1, x]]);
        if (inside(y - 2, x) && maze[y - 2][x][1] == false)
            UnVisNeigh.push([[y - 2, x], [y - 1, x]]);
        if (inside(y, x + 2) && maze[y][x + 2][1] == false)
            UnVisNeigh.push([[y, x + 2], [y, x + 1]]);
        if (inside(y, x - 2) && maze[y][x - 2][1] == false)
            UnVisNeigh.push([[y, x - 2], [y, x - 1]]);
    }
    function FindVisNeigh(y, x) {
        if (inside(y + 2, x) && maze[y + 2][x][1] == true)
            VisNeigh.push([[y + 2, x], [y + 1, x]]);
        if (inside(y - 2, x) && maze[y - 2][x][1] == true)
            VisNeigh.push([[y - 2, x], [y - 1, x]]);
        if (inside(y, x + 2) && maze[y][x + 2][1] == true)
            VisNeigh.push([[y, x + 2], [y, x + 1]]);
        if (inside(y, x - 2) && maze[y][x - 2][1] == true)
            VisNeigh.push([[y, x - 2], [y, x - 1]]);
    }
    maze[currPos[0]][currPos[1]][1] = true;
    var ready = false;
    while (!ready) {
        do {
            UnVisNeigh = [];
            FindUnVisNeigh(currPos[0], currPos[1]);
            if (UnVisNeigh.length > 0) {
                var chosen = UnVisNeigh[Math.floor(Math.random() * UnVisNeigh.length)];
                makePass(chosen[1][0], chosen[1][1]);
                maze[chosen[0][0]][chosen[0][1]][1] = true;
                currPos = chosen[0];
            }
            
        } while (UnVisNeigh.length > 0)
        var VisNeigh = [];
        top:
        for (var y = 0; y < height; y+=2) {
            for (var x = 0; x < width; x += 2) {
                if (maze[y][x][1] == false) {
                    FindVisNeigh(y, x);
                    if (VisNeigh.length > 0) 
                    {
                        var chosen = VisNeigh[Math.floor(Math.random() * VisNeigh.length)];
                        makePass(chosen[1][0], chosen[1][1]);
                        currPos = chosen[0];
                        break top;
                    } 
                }
                
            }
        }
        if (VisNeigh.length == 0) ready = true;
    }  

    currPos = [0, 0];
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
        if (inside(nextPos[0], nextPos[1]) && maze[nextPos[0]][nextPos[1]] != "wall") {
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
})();