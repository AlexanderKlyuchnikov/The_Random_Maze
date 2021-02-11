var width = Number.parseInt(document.getElementById("user_width").value);
    height = Number.parseInt(document.getElementById("user_height").value);
if (width % 2 == 0) width++;
if (height % 2 == 0) height++;

!(function () {
    document.body.onkeydown = null;
    currPos = [0, 0];
    maze = [];
    var wallsInProcess = [];   
    canvas.width = width * k;
    canvas.height = height * k;
    canvas.style.marginLeft = (document.getElementById("game_window").clientWidth - canvas.width) / 2 + "px";
    canvas.style.marginTop = (document.getElementById("game_window").clientHeight - canvas.height) / 2 + "px";
    
        
    ctx.fillStyle = wallcolor;
    ctx.fillRect(0, 0, width * k, height * k);    
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
    gif_size();
    currPos = [0, 0];
    document.body.onkeydown = game;
})();
