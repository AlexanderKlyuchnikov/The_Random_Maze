var VisCells = [];
    walllength = 40;
    wallwidth = 4;
    height = 17;
    width = 25;
    maxheight = 17;
    maxwidth = 25;
    windowwidth = document.getElementById("game_window").clientWidth;
    windowheight = document.getElementById("game_window").clientHeight;
    mazewidth = walllength * width - wallwidth * (width - 1);
    mazeheight = walllength * height - wallwidth * (height - 1);
    loffset = (windowwidth - mazewidth) / 2;
    toffset = null;
    renderType = 'Canvas';
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    renderType = 'DOM';
    width = Math.floor((windowwidth - wallwidth) / (walllength - wallwidth));
    height = Math.floor((windowheight - 30 - wallwidth) / (walllength - wallwidth));
}                
else
{
    renderType = 'Canvas';    
}
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
                },
                "img/finish.png": {
                    tile: 32,
                    tileh: 32,
                    map: {
                        finish: [0, 0]
                    }
                }
            }
        };
Crafty.load(game_assets);

Crafty.sprite(32, "img/sprite.png", {
  player: [0, 0],
});


//-------------------------------------------------------------------------------------------menu scene entities
var user_width = Crafty.e("2D, HTML, Persist").append('<input id="user_width" type="number" min="5" max="25" value="25" class="input_size"></input>')
    .attr({
            x: (windowwidth - 2 * document.getElementById("user_width").clientWidth) / 3,
            y: 150
        });
document.getElementById("user_width").oninput = function () {
    this.value = this.value.replace(/[^0-9]/g, "");
}
document.getElementById("user_width").onkeyup = function () {
    if (Number(this.value) > 25) this.value = maxwidth;
};
var user_height = Crafty.e("2D, HTML, Persist").append('<input id="user_height" type="number" min="5" max="17" value="17" class="input_size">')
    .attr({
        x: 2 * (windowwidth - 2 * document.getElementById("user_width").clientWidth) / 3 + document.getElementById("user_width").clientWidth,
        y: 150
    });
document.getElementById("user_height").oninput = function () {
    this.value = this.value.replace(/[^0-9]/g, "");
};
document.getElementById("user_height").onkeyup = function () {
    if (Number(this.value) > 17) this.value = maxheight;
}
var user_alg = Crafty.e("2D, HTML, Persist").append(
    '<div class="radio-container">'+
        '<div class="form-item radio-btn nth-3">'+
            '<input type="radio" name="alg_name" id="radio1">'+
            '<label class="radio_input" for="radio1">Алгоритм Прима</label>'+
        '</div>'+
        '<div class="form-item radio-btn nth-3">'+
            '<input type="radio" name="alg_name" id="radio2" checked>'+
            '<label class="radio_input" for="radio2">Recursive Backtracker</label>'+
        '</div>'+
        '<div class="form-item radio-btn nth-3">'+
            '<input type="radio" name="alg_name" id="radio3">'+
            '<label class="radio_input" for="radio3">Hunt and Kill</label>'+
        '</div>'+
    '</div>')
    .attr({ x: (windowwidth - 700) / 2, y: 300, w: 700, h: 100 });
var start_gen = Crafty.e("2D, HTML, Persist")
    .append('<input id="start_gen" type="button" class="buttons" value="СГЕНЕРИРОВАТЬ">')
    .attr({ x: (windowwidth - 200) / 2, y: 380 });    

document.getElementById("start_gen").onclick = function () {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        width = Number(document.getElementById("user_width").value, 10);
        height = Number(document.getElementById("user_height").value, 10);
        if (width < 5) {
          width = 5;
          document.getElementById("user_width").value = "5";
        }
        if (height < 5) {
          height = 5;
          document.getElementById("user_height").value = "5";
        }
    }
    mazewidth = walllength * width - wallwidth * (width - 1);
    mazeheight = walllength * height - wallwidth * (height - 1);
    loffset = (windowwidth - mazewidth) / 2;
    Crafty.enterScene("game");

    var algorithm = document.getElementsByName("alg_name");
    if (algorithm[0].checked) {
      Prims_algorithm();
    }
    if (algorithm[1].checked) {
      recursive_backtracker();
    }
    if (algorithm[2].checked) {
      hunt_and_kill();
    }
}      
//-------------------------------------------------------------------------------------------menu scene entities



//-------------------------------------------------------------------------------------------game scene entities
var rebuild_game_scene = Crafty.e("2D, HTML, Persist")
    .append('<input id="rebuild_game_scene" type="button"  class="buttons" value="ПЕРЕСТРОИТЬ">')
    .attr({ x: (windowwidth - 150) / 2, y: 0 });
var finish = Crafty.e("2D, " + renderType + ", finish, Collision, Persist").attr({ x: -200, y: -200 })
        .collision(6, 6, 32, 0, 32, 32, 0, 32)
        .checkHits('player')
        .bind('HitOn', function () {
        //--------------------------------------------------------------------------finish
            Crafty.enterScene("finish");
        //--------------------------------------------------------------------------finish
        });
var lastOKPosition = { x: 0, y: 0 };
var player = Crafty.e("2D, " + renderType + ", Collision, Fourway, player, SpriteAnimation, Persist")
    .attr({x:-100, y: -100})
    .fourway(100)
    .reel("down", 500, 0, 0, 4)
    .reel("left_down", 500, 0, 1, 4)
    .reel("right_down", 500, 0, 2, 4)
    .reel("left", 500, 0, 3, 4)
    .reel("right", 500, 0, 4, 4)
    .reel("up", 500, 0, 5, 4)
    .reel("left_up", 500, 0, 6, 4)
    .reel("right_up", 500, 0, 7, 4)
    .collision(10, 8, 22, 8, 22, 24, 10, 24)
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
    .bind("NewDirection", function (e) {
        if (this.isPlaying()) {
          this.pauseAnimation();
          this.resetAnimation();
        }
        if (e.x == 0 && e.y == 1) this.animate("down", -1);
        if (e.x == 0 && e.y == -1) this.animate("up", -1);
        if (e.x == 1 && e.y == 1) this.animate("right_down", -1);
        if (e.x == 1 && e.y == -1) this.animate("right_up", -1);
        if (e.x == -1 && e.y == 1) this.animate("left_down", -1);
        if (e.x == -1 && e.y == -1) this.animate("left_up", -1);
        if (e.x == 1 && e.y == 0) this.animate("right", -1);
        if (e.x == -1 && e.y == 0) this.animate("left", -1);
    });
toffset = document.getElementById("rebuild_game_scene").clientHeight;
document.getElementById("rebuild_game_scene").onclick = function () {
    Crafty.enterScene('menu');
}
//-------------------------------------------------------------------------------------------game scene entities



//-------------------------------------------------------------------------------------------finish scene entities
var rebuild_on_finish = Crafty.e("2D, HTML, Persist")
    .append('<div id="rebuild_on_finish"></div>')
    .attr({ x: (windowwidth - 50) / 2, y: 400 });
document.getElementById("rebuild_on_finish").onclick = function () {
    Crafty.enterScene("menu");
}
//-------------------------------------------------------------------------------------------finish scene entities



//-------------------------------------------------------------------------------------------menu scene
Crafty.defineScene('menu', function () {
    player.visible = false;
    finish.visible = false;
    rebuild_game_scene.visible = false;
    rebuild_on_finish.visible = false;

    user_alg.visible = true;
    user_height.visible = true;
    user_width.visible = true;
    start_gen.visible = true;
    Crafty.e("2D, DOM, Text")
        .attr({ x: (windowwidth - 300) / 2, y: 50, w: 300, h: 40 })
        .text("РАЗМЕРЫ ЛАБИРИНТА")
        .textAlign("center")
        .textFont({ size: '22px', weight: 'bold', family: 'Arial'})
        .textColor("rgb(74, 51, 10)")
        .css({'cursor':'default'});
    Crafty.e("2D, DOM, Text")
        .attr({
            x: (windowwidth - 2 * document.getElementById("user_width").clientWidth) / 3,
            y: 120, w: 110, h: 40
        })
        .text("ШИРИНА")
        .textAlign("center")
        .textFont({ size: '18px', weight: 'bold', family: 'Arial'})
        .textColor("rgb(74, 51, 10)")
        .css({'cursor':'default'});
    Crafty.e("2D, DOM, Text")
        .attr({
            x: 2 * (windowwidth - 2 * document.getElementById("user_width").clientWidth) / 3 + document.getElementById("user_width").clientWidth,
            y: 120, w: 110, h: 40
        })
        .text("ВЫСОТА")
        .textAlign("center")
        .textFont({ size: '18px', weight: 'bold', family: 'Arial'})
        .textColor("rgb(74, 51, 10)")
        .css({'cursor':'default'});
    Crafty.e("2D, DOM, Text")
        .attr({ x: (windowwidth - 300) / 2, y: 220, w: 300, h: 40 })
        .text("АЛГОРИТМ ПОСТРОЕНИЯ")
        .textAlign("center")
        .textFont({ size: '22px', weight: 'bold', family: 'Arial'})
        .textColor("rgb(74, 51, 10)")
        .css({ 'cursor': 'default' });
    
    var elems = document.getElementsByClassName("radio_input");
    for (var i = 0; i < elems.length; ++i){
        elems[i].onclick = function(event) {
            event.stopPropagation();
        }; 
    }
})
Crafty.enterScene("menu");
//-------------------------------------------------------------------------------------------menu scene



//-------------------------------------------------------------------------------------------game scene
Crafty.defineScene('game', function () {
    user_alg.visible = false;
    user_height.visible = false;
    user_width.visible = false;
    start_gen.visible = false;
    rebuild_on_finish.visible = false;

    rebuild_game_scene.visible = true;
    player.visible = true;
    finish.visible = true;
    player.attr({ x: loffset + wallwidth, y: wallwidth + toffset, z: 1 }).animate("down", 1).pauseAnimation();
    finish.attr({
      x: loffset + walllength * (width - 1) - (width - 1) * wallwidth + 6,
      y: walllength * (height - 1) - (height - 1) * wallwidth + 6 + toffset,
    });
    console.log(width + ':' + height);
    for (var i = 0; i <= height; ++i) {
        if (i < height)
            VisCells[i] = [];
        for (var j = 0; j <= width; ++j) {
            if (i != height)
                Crafty.e("2D, " + renderType + ", Collision, Delay, wall, lwall, lwall" + i + '_' + j)
                    .attr({ x: loffset + walllength * j - j * wallwidth, y: walllength * i - i * wallwidth + toffset, z: 2, w: wallwidth, h:walllength })
            if (j != width)
                Crafty.e("2D, " + renderType + ", Collision, Delay, wall, twall, twall" + i + '_' + j)
                    .attr({ x: loffset + walllength * j - j * wallwidth, y: walllength * i - i * wallwidth + toffset, z: 2, w: walllength, h: wallwidth })
            if (j < width && i < height)
                VisCells[i].push(false);
        }
    }
})
//-------------------------------------------------------------------------------------------game scene



//-------------------------------------------------------------------------------------------finish scene
Crafty.defineScene('finish', function () {
    user_alg.visible = false;
    user_height.visible = false;
    user_width.visible = false;
    start_gen.visible = false;
    rebuild_game_scene.visible = false;
    player.visible = false;
    finish.visible = false;

    rebuild_on_finish.visible = true;
    Crafty.e("2D, DOM, Text")
        .attr({ x: 200, y: 200, w: 750, h: 200 })
        .text("ЗДЕСЬ НУЖНО ЧТО-ТО КРАСИВОЕ ПРИДУМАТЬ")
        .textAlign("center")
        .textFont({ size: '18px', weight: 'bold', family: 'Arial'})
        .textColor("rgb(74, 51, 10)");
})

//-------------------------------------------------------------------------------------------finish scene

function BreakWall(firstP, secondP) {
        if (firstP[0] == secondP[0] + 1) {
            Crafty("twall" + firstP[0] + "_" + firstP[1]).destroy();
        }
        if (firstP[0] == secondP[0] - 1) {
            Crafty("twall" + secondP[0] + "_" + secondP[1]).destroy();
        }
        if (firstP[1] == secondP[1] + 1) {
            Crafty("lwall" + firstP[0] + "_" + firstP[1]).destroy();
        }
        if (firstP[1] == secondP[1] - 1) {
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


