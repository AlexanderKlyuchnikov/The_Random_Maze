var width = Number.parseInt(document.getElementById("user_width").value);
    height = Number.parseInt(document.getElementById("user_height").value);
if (width % 2 == 0) width++;
if (height % 2 == 0) height++;

!(function () {
    document.body.onkeydown = null;
    currPos = [0, 0];
    maze = [];
    var way = [];
        UnVisNeigh = [];
    canvas.width = width * k;
    canvas.height = height * k;
    canvas.style.marginLeft = (document.getElementById("game_window").clientWidth - canvas.width) / 2 + "px";
    canvas.style.marginTop = (document.getElementById("game_window").clientHeight - canvas.height) / 2 + "px";

    ctx.fillStyle = wallcolor;
    ctx.fillRect(0, 0, width * k, height * k);
    for (var y = 0; y < height; y++) {
        maze[y] = [];
        for (var x = 0; x < width; x++) 
            maze[y][x] = "wall";
    }

    function FindUnVisNeigh(y, x) {
        if (inside(y + 2, x) && maze[y + 1][x] == "wall" && maze[y + 2][x] == "wall")
            UnVisNeigh.push([[y + 2, x], [y + 1, x]]);
        if (inside(y - 2, x) && maze[y - 1][x] == "wall" && maze[y - 2][x] == "wall")
            UnVisNeigh.push([[y - 2, x], [y - 1, x]]);
        if (inside(y, x + 2) && maze[y][x + 1] == "wall" && maze[y][x + 2] == "wall")
            UnVisNeigh.push([[y, x + 2], [y, x + 1]]);
        if (inside(y, x - 2) && maze[y][x - 1] == "wall" && maze[y][x - 2] == "wall")
            UnVisNeigh.push([[y, x - 2], [y, x - 1]]);
    }
    
    makePass(currPos[0], currPos[1]);
    way.push(currPos);
    while (way.length > 0) {
        UnVisNeigh = [];
        FindUnVisNeigh(currPos[0], currPos[1]);
        if (UnVisNeigh.length > 0)
        {
            var chosen = UnVisNeigh[Math.floor(Math.random() * UnVisNeigh.length)];
            makePass(chosen[0][0], chosen[0][1]);
            makePass(chosen[1][0], chosen[1][1]);
            way.push(chosen[0]);
            currPos = chosen[0];

        }
        else
        {
            currPos = way.pop();    
        }
    }  

    ctx.fillStyle = playercolor;
    ctx.fillRect(0, 0, k, k);
    ctx.fillStyle = finishcolor;
    ctx.fillRect(k * (width - 1), k * (height - 1), k, k);
    gif_size();
    currPos = [0, 0];
    document.body.onkeydown = game;
})();