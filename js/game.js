var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
    wallcolor = "rgb(178,113,2)";
    passcolor = "rgb(219,199,180)";
    playercolor = "red";
    finishcolor = "blue";
    k = 10;
    maze = [];
    currPos = [0,0];
    
function inside(y, x) {
    return y < height && y >= 0 && x < width && x >= 0 ? true : false;
}

function makePass(y, x) {
    maze[y][x] = "pass";
    ctx.fillStyle = passcolor;
    ctx.fillRect(x * k, y * k, k, k);
}



function gif_size() {
    var finish_gif = document.getElementById("finish_gif");
    finish_gif.style.height = "";
    finish_gif.style.width = "";
    finish_gif.style.visibility = "hidden";
    if (width < height) finish_gif.style.width = width * k + "px";
    else finish_gif.style.height = height * k + "px";
    finish_gif.style.left =
    canvas.offsetLeft + (canvas.width - finish_gif.width) / 2 + "px";
    finish_gif.style.top =
    canvas.offsetTop + (canvas.height - finish_gif.height) / 2 + "px";

}


function game(e) {
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