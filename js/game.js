var VisCells = [];
    walllength = 40;
    wallwidth = 6;
    height = 13;
    width = 25;
    windowwidth = document.getElementById("game_window").clientWidth;
    windowheight = document.getElementById("game_window").clientHeight;
    mazewidth = walllength * width - wallwidth * (width - 1);
    mazeheight = walllength * height - wallwidth * (height - 1);
    loffset = (windowwidth - mazewidth) / 2;
Crafty.init(windowwidth, windowheight, document.getElementById("game_window"));
var game_assets = {
            "sprites": {
                "img/twall.png": {
                    tile: 40,
                    tileh: 6,
                    map: {
                        twall: [0, 0]
                    }
                },
                "img/lwall.png":{
                    tile: 6,
                    tileh: 40,
                    map: {
                        lwall: [0, 0]
                    }
                }
            }
        };
Crafty.load(game_assets);
for (var i = 0; i <= height; ++i) {
    if (i < height)
        VisCells[i] = [];
    for (var j = 0; j <= width; ++j) {
        if (i != height)
        var al = Crafty.e("2D, Canvas, Collision, wall, lwall, lwall" + i + '_' + j)
            .attr({ x: loffset + walllength * j - j * wallwidth, y: walllength * i - i * wallwidth, z:2})
        if (j != width)
        var at = Crafty.e("2D, Canvas, Collision, wall, twall, twall" + i + '_' + j)
            .attr({ x: loffset + walllength * j - j * wallwidth, y: walllength * i - i * wallwidth, z:2})
        if (j < width && i < height)
            VisCells[i].push(false);
    }
}

Crafty.sprite(16, "img/sprite.png", {
  player: [0, 0],
});

var lastOKPosition = { x: 0, y: 0 };
var player = Crafty.e("2D, Canvas, Collision, Fourway, player, SpriteAnimation")
    .attr({ x: loffset + wallwidth + 2, y: wallwidth + 2, z:1})
    .fourway(100)
    .reel("walk_left", 600, 6, 0, 3)
    .reel("walk_right", 600, 9, 0, 3)
    .reel("walk_up", 600, 3, 0, 3)
    .reel("walk_down", 600, 0, 0, 3)
    .collision(2, 1, 14, 1, 14, 16, 2, 16)
    .bind('Move', function() {
        
        if (this.hit("wall"))
        {
            this.x = lastOKPosition.x;
            this.y = lastOKPosition.y;
        }
        else
        {
            lastOKPosition.x = this.x;
            lastOKPosition.y = this.y;
        }
    })
    .bind("NewDirection", function (direction) {
            if (direction.x < 0) {
                if (!this.isPlaying("walk_left"))
                    this.animate("walk_left", -1);
            }
            if (direction.x > 0) {
                if (!this.isPlaying("walk_right"))
                    this.animate("walk_right", -1);
            }
            if (direction.y < 0) {
                if (!this.isPlaying("walk_up"))
                    this.animate("walk_up", -1);
            }
            if (direction.y > 0) {
                if (!this.isPlaying("walk_down"))
                    this.animate("walk_down", -1);
            }
            if(!direction.x && !direction.y) {
                this.pauseAnimation();
            }
    });
var currPos = [Crafty.math.randomInt(0, height - 1), Crafty.math.randomInt(0, width - 1)];
    way = [];
    UnVisNeigh = [];
way.push(currPos);
while (way.length > 0) {
    UnVisNeigh = [];
    VisCells[currPos[0]][currPos[1]] = true;
    FindUnVisNeigh(currPos[0], currPos[1]);
    if (UnVisNeigh.length > 0)
    {
        var chosen = UnVisNeigh[Crafty.math.randomInt(0, UnVisNeigh.length - 1)];
        BreakWall(currPos, chosen);
        way.push(chosen);
        currPos = chosen;
    }
    else
    {
        currPos = way.pop();
    }
}
function BreakWall(firstP, secondP) {
    if (firstP[0] == secondP[0] + 1)
    {
        Crafty("twall" + firstP[0] + "_" + firstP[1]).destroy();
    }
    if (firstP[0] == secondP[0] - 1)
    {
        Crafty("twall" + secondP[0] + "_" + secondP[1]).destroy();
    } 
    if (firstP[1] == secondP[1] + 1)
    {
        Crafty("lwall" + firstP[0] + "_" + firstP[1]).destroy();
    }
    if (firstP[1] == secondP[1] - 1)
    {
        Crafty("lwall" + secondP[0] + "_" + secondP[1]).destroy();
    }  
}
function FindUnVisNeigh(y, x) {
        if (inside(y + 1, x) && VisCells[y + 1][x] == false)
            UnVisNeigh.push([y + 1, x]);
        if (inside(y - 1, x) && VisCells[y - 1][x] == false)
            UnVisNeigh.push([y - 1, x]);
        if (inside(y, x + 1) && VisCells[y][x + 1] == false)
            UnVisNeigh.push([y, x + 1]);
        if (inside(y, x - 1) && VisCells[y][x - 1] == false)
            UnVisNeigh.push([y, x - 1]);
}

function inside(y, x) {
    return y < height && y >= 0 && x < width && x >= 0 ? true : false;
}
/*var canvas = document.getElementById("canvas"),
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
};*/