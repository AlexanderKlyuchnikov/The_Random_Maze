var width = Number.parseInt(document.getElementById("user_width").value);
    height = Number.parseInt(document.getElementById("user_height").value);
if (width % 2 == 0) width++;
if (height % 2 == 0) height++;

!(function () {
    document.body.onkeydown = null;
    currPos = [0, 0];
    maze = [];
    var UnVisNeigh = [];
    canvas.width = width * k;
    canvas.height = height * k;
    canvas.style.marginLeft = (document.getElementById("game_window").clientWidth - canvas.width) / 2 + "px";
    canvas.style.marginTop = (document.getElementById("game_window").clientHeight - canvas.height) / 2 + "px";
    

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

    ctx.fillStyle = playercolor;
    ctx.fillRect(0, 0, k, k);
    ctx.fillStyle = finishcolor;
    ctx.fillRect(k * (width - 1), k * (height - 1), k, k);
    gif_size();
    currPos = [0, 0];
    document.body.onkeydown = game;
})();