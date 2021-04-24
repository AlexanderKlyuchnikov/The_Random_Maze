var VisCells = [];
    walllength = 40;
    wallwidth = 4;
    height = 25;
    width = 17;
    maxheight = 17;
    maxwidth = 25;
    windowwidth = document.getElementById("game_window").clientWidth;
    windowheight = document.getElementById("game_window").clientHeight;
    mazewidth = walllength * width - wallwidth * (width - 1);
    mazeheight = walllength * height - wallwidth * (height - 1);
    loffset = (windowwidth - mazewidth) / 2;
    toffset = null;
    renderType = 'Canvas';
    hwallwidth = 0.75 * wallwidth;
    hwalllength = 0.75 * walllength;
    hex_width = hwalllength * 2;
    hex_height = hwalllength * Math.sqrt(3);
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    renderType = 'DOM';
    walllength = 36;
    width = Math.floor((windowwidth - wallwidth) / (walllength - wallwidth));
    height = Math.floor((windowheight - 100 - 30 - wallwidth) / (walllength - wallwidth));
}                
else
{
    renderType = 'Canvas';    
}
mazewidth = walllength * width - wallwidth * (width - 1);
mazeheight = walllength * height - wallwidth * (height - 1);

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
                },
                "img/finish_hex.png":{
                    tile: 45,
                    tileh: 29,
                    map: {
                        finish_hex: [0, 0]
                    }
                }
            }
        };
Crafty.load(game_assets);

Crafty.sprite(32, "img/finish_animation.png",{
    finish_animation: [0, 0]
})

Crafty.sprite(32, "img/sprite.png", {
    player: [0, 0],
});

//-------------------------------------------------------------------------------------------menu scene entities
var user_alg = Crafty.e("2D, HTML, Persist").append(
    '<div class="radio-container">'+
        '<div class="top-radio-container">'+
            '<div class="radio-btn">'+
                '<input type="radio" name="alg_name" id="radio1">'+
                '<label class="radio_input" for="radio1">Алгоритм Прима</label>'+
            '</div>'+
            '<div class="radio-btn">'+
                '<input type="radio" name="alg_name" id="radio2" checked>'+
                '<label class="radio_input" for="radio2">Recursive Backtracker</label>'+
            '</div>'+
            '<div class="radio-btn">'+
                '<input type="radio" name="alg_name" id="radio3">'+
                '<label class="radio_input" for="radio3">Hunt and Kill</label>'+
            '</div>'+
        '</div>' +
        '<div class="radio-btn" id="radio-btn4">' +
            '<input type="radio" name="alg_name" id="radio4">'+
            '<label class="radio_input" for="radio4">Шестиугольный</label>' +
        '</div>' +
    '</div>');
var start_gen = Crafty.e("2D, HTML, Persist")
    .append('<input id="start_gen" type="button" class="buttons" value="СГЕНЕРИРОВАТЬ">');
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    user_alg.attr({ x: (windowwidth - 250) / 2, y: 300, w: 250 });
    start_gen.attr({ x: (windowwidth - 200) / 2, y: 480 });
    var full_window = Crafty.e("2D, HTML, Persist")
        .append('<input id="full_window" type="button" class="buttons" value="НА ВЕСЬ ЭКРАН">')
        .attr({ x: 10, y: 10 });
    full_window._element.firstChild.style.width = (windowwidth - 20) + "px";
    full_window._element.firstChild.onclick = function () {
        document.documentElement.requestFullscreen();
    }
    document.addEventListener('fullscreenchange', function () {
        if (full_window.visible == true)
            full_window.visible = false;
        else 
            if (user_alg.visible == true) full_window.visible = true;
            
    })
}
else
{
    user_alg.attr({ x: (windowwidth - 700) / 2, y: 280, w: 700 });
    start_gen.attr({ x: (windowwidth - 200) / 2, y: 380 });
    var user_width = Crafty.e("2D, HTML, Persist").append('<input id="user_width" type="number" min="5" max="' + maxwidth + '" value="25" class="input_size"></input>')
    .attr({
            x: (windowwidth - 2 * document.getElementById("user_width").clientWidth) / 3,
            y: 150
        });
    user_width._element.firstChild.oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    }
    user_width._element.firstChild.onkeyup = function () {
        if (Number(this.value) > maxwidth) this.value = maxwidth;
    };
    var user_height = Crafty.e("2D, HTML, Persist").append('<input id="user_height" type="number" min="5" max="' + maxheight + '" value="17" class="input_size">')
        .attr({
            x: 2 * (windowwidth - 2 * document.getElementById("user_width").clientWidth) / 3 + document.getElementById("user_width").clientWidth,
            y: 150
        });
    user_height._element.firstChild.oninput = function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    };
    user_height._element.firstChild.onkeyup = function () {
        if (Number(this.value) > maxheight) this.value = maxheight;
    };
    var algorithm = document.getElementsByName("alg_name");
    for (var i = 0; i < algorithm.length; ++i)
        algorithm[i].addEventListener("change", function () {
            if (algorithm[3].checked)
            {
                maxwidth = 22;
                maxheight = 12;
                if (Number(user_width._element.firstChild.value) > maxwidth) user_width._element.firstChild.value = maxwidth;
                if (Number(user_height._element.firstChild.value) > maxheight) user_height._element.firstChild.value = maxheight;
            }
            else {
                maxwidth = 25;
                maxheight = 17;
            }
        })
}

start_gen._element.firstChild.onclick = function () {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        width = Number(user_width._element.firstChild.value, 10);
        height = Number(user_height._element.firstChild.value, 10);
        if (width < 5) {
          width = 5;
          user_width._element.firstChild.value = "5";
        }
        if (height < 5) {
          height = 5;
          user_height._element.firstChild.value = "5";
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
    if (algorithm[3].checked) {
        hex();
    }
}      
//-------------------------------------------------------------------------------------------menu scene entities

//-------------------------------------------------------------------------------------------game scene entities
var rebuild_game_scene = Crafty.e("2D, HTML, Persist")
    .append('<input id="rebuild_game_scene" type="button"  class="buttons" value="ПЕРЕСТРОИТЬ">')
    .attr({ x: (windowwidth - 150) / 2, y: 0, z: 5 });
var finish = Crafty.e("2D, " + renderType + ", finish, Collision, Persist")
    .attr({
        x: -200,
        y: -200,
        w: walllength - 2 * wallwidth,
        h: walllength - 2 * wallwidth,
        z:1
    })
    .collision(6, 6, 32, 0, 32, 32, 0, 32)
    .checkHits("player")
    .bind("HitOn", function () {
        Crafty.enterScene("finish");
    });
var finish_hex = Crafty.e("2D, " + renderType + ", finish_hex, Collision, Persist")
    .attr({
        x: -200,
        y: -200,
        w: hex_width * 3 / 4,
        h: hex_width / 2,
        z:1
    })
    .checkHits("player")
    .bind("HitOn", function () {
        Crafty.enterScene("finish");
    })
var lastOKPosition = { x: 0, y: 0 };
var player = Crafty.e("2D, " + renderType + ", Collision, Motion, Fourway, player, SpriteAnimation, Persist")
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
toffset = rebuild_game_scene._element.firstChild.clientHeight;
rebuild_game_scene._element.firstChild.onclick = function () {
    Crafty.enterScene('menu');
}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    var control_entity = Crafty.e("2D, HTML, Persist").append(
        '<div id="contol_btns_container">' +
            '<div id="left" class="control_btns"></div>' +
            '<div id="up_down" class="control_btns_updown">' +
                '<div id="up" class="control_btns"></div>' +
                '<div id="down" class="control_btns"></div>' +
            '</div>' +
            '<div id="right" class="control_btns"></div>' +
        '</div>'
    ).attr({ x: (windowwidth - mazewidth) / 2, y: mazeheight + 30, w: mazewidth, h: 100 });
    control_entity._element.firstChild.style.width = mazewidth + "px";
    control_entity._element.firstChild.style.height = '100px';
    
    var keys = [37, 38, 40, 39];
        i = 0;
    for (var el of document.getElementsByClassName("control_btns")) {
        let key = keys[i];
        el.addEventListener("touchstart", function (e) {
            e.target.style.boxShadow = "0 0 8px black inset";
            document.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': key }));
        });
        el.addEventListener("touchend", function (e) {
            e.target.style.boxShadow = "0 0 0 black inset";
            document.dispatchEvent(new KeyboardEvent('keyup', { 'keyCode': key }));
        });
        i++;
    }
}
//-------------------------------------------------------------------------------------------game scene entities

//-------------------------------------------------------------------------------------------finish scene entities
var rebuild_on_finish = Crafty.e("2D, HTML, Persist")
    .append('<div id="rebuild_on_finish"></div>')
    .attr({ x: (windowwidth - 50) / 2, y: 400 });
rebuild_on_finish._element.firstChild.onclick = function () {
    Crafty.enterScene("menu");
};
//-------------------------------------------------------------------------------------------finish scene entities

//-------------------------------------------------------------------------------------------menu scene
Crafty.defineScene('menu', function () {
    player.visible = false;
    finish.visible = false;
    finish_hex.visible = false;
    rebuild_game_scene.visible = false;
    rebuild_on_finish.visible = false;

    user_alg.visible = true;
    start_gen.visible = true;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        control_entity.visible = false;
        if (document.fullscreenElement == null)
            full_window.visible = true;
    }
    else
    {
        user_height.visible = true;
        user_width.visible = true;
        Crafty.e("2D, DOM, Text")
            .attr({ x: (windowwidth - 300) / 2, y: 50, w: 300, h: 40 })
            .text("РАЗМЕРЫ ЛАБИРИНТА")
            .textAlign("center")
            .textFont({ size: '22px', weight: 'bold', family: 'Arial'})
            .textColor("rgb(74, 51, 10)")
            .css({'cursor':'default'});
        Crafty.e("2D, DOM, Text")
            .attr({
                x: (windowwidth - 2 * user_width._element.firstChild.clientWidth) / 3,
                y: 120, w: 110, h: 40
            })
            .text("ШИРИНА")
            .textAlign("center")
            .textFont({ size: '18px', weight: 'bold', family: 'Arial'})
            .textColor("rgb(74, 51, 10)")
            .css({'cursor':'default'});
        Crafty.e("2D, DOM, Text")
            .attr({
                x: 2 * (windowwidth - 2 * user_width._element.firstChild.clientWidth) / 3 + user_width._element.firstChild.clientWidth,
                y: 120, w: 110, h: 40
            })
            .text("ВЫСОТА")
            .textAlign("center")
            .textFont({ size: '18px', weight: 'bold', family: 'Arial'})
            .textColor("rgb(74, 51, 10)")
            .css({'cursor':'default'});
    }
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
    start_gen.visible = false;
    rebuild_on_finish.visible = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        control_entity.visible = true;
        full_window.visible = false;
    }
    else
    {
        user_height.visible = false;
        user_width.visible = false;
    }
    rebuild_game_scene.visible = true;
    player.visible = true;
    var algorithm = document.getElementsByName("alg_name");
    if (!algorithm[3].checked) {
        rebuild_game_scene._element.firstChild.style.borderRadius = "6px 6px 0 0";
        toffset = rebuild_game_scene._element.firstChild.clientHeight;
        finish.visible = true;
        finish_hex.visible = false;
        finish_hex.attr({ x: -200, y: -200 });
        player.attr({ x: loffset + wallwidth, y: wallwidth + toffset, z: 1 }).animate("down", 1).pauseAnimation();
        finish.attr({
        x: loffset + walllength * (width - 1) - (width - 1) * wallwidth + 6,
        y: walllength * (height - 1) - (height - 1) * wallwidth + 6 + toffset,
        });
        for (var i = 0; i <= height; ++i) {
            if (i < height)
                VisCells[i] = [];
            for (var j = 0; j <= width; ++j) {
                if (i != height)
                    Crafty.e("2D, " + renderType + ", Collision, wall, lwall, lwall" + i + '_' + j)
                        .attr({ x: loffset + walllength * j - j * wallwidth, y: walllength * i - i * wallwidth + toffset, z: 2, w: wallwidth, h: walllength })
                if (j != width)
                    Crafty.e("2D, " + renderType + ", Collision, wall, twall, twall" + i + '_' + j)
                        .attr({ x: loffset + walllength * j - j * wallwidth, y: walllength * i - i * wallwidth + toffset, z: 2, w: walllength, h: wallwidth })
                if (j < width && i < height)
                    VisCells[i].push(false);
            }
        }
    }
    else {
        rebuild_game_scene._element.firstChild.style.borderRadius = "6px";
        finish.visible = false;
        finish.attr({ x: -200, y: -200 });
        finish_hex.visible = true;
        mazewidth = Math.floor((width + 1) / 2) * hex_width + Math.floor(width / 2) * hex_width / 2 - hwallwidth * (width - 1);
        mazeheight = hex_height * (height + 0.5);
        loffset = (windowwidth - mazewidth) / 2;
        toffset = rebuild_game_scene._element.firstChild.clientHeight + 10;
        player.attr({ x: loffset + hex_width / 2 - player.w / 2, y: toffset + hex_height / 2 - player.h / 2 });
        for (var i = 0; i < height; i++) {
            VisCells[i] = [];
            for (var j = 0; j < width; ++j) {
                VisCells[i].push(false);
                var cx = loffset + hex_width / 2 + (hex_width * 3 / 4 - hwallwidth) * j;
                cy = toffset + hex_height / 2 + (hex_height - hwallwidth) * i;
                if (j % 2 == 1)
                    cy += hex_height / 2;
                Crafty.e("2D, " + renderType + ", Collision, wall, twall, twall" + i + '_' + j)
                    .attr({ x: cx - hex_width / 4, y: cy - hex_height / 2, z: 2, w: hwalllength, h: hwallwidth });
                Crafty.e("2D, " + renderType + ", Collision, wall, lwall, ltwall" + i + '_' + j)
                    .attr({ x: cx - hex_width / 4, y: cy - hex_height / 2, z: 2, w: hwallwidth, h: hwalllength })
                    .origin("top middle")
                    .rotation = 30;
                Crafty.e("2D, " + renderType + ", Collision, wall, lwall, lbwall" + i + '_' + j)
                    .attr({ x: cx - hex_width / 2, y: cy, z: 2, w: hwallwidth, h: hwalllength })
                    .origin("top middle")
                    .rotation = -30;
                if (i == 0 && j % 2 == 0) {
                    Crafty.e("2D, " + renderType + ", Collision, wall, lwall")
                        .attr({ x: cx + hex_width / 4 - hwallwidth, y: cy - hex_height / 2, z: 2, w: hwallwidth, h: hwalllength })
                        .origin("top middle")
                        .rotation = -30;
                }
                if (j == width - 1) {
                    Crafty.e("2D, " + renderType + ", Collision, wall, lwall")
                        .attr({ x: cx + hex_width / 4 - hwallwidth, y: cy - hex_height / 2, z: 2, w: hwallwidth, h: hwalllength })
                        .origin("top middle")
                        .rotation = -30;
                    Crafty.e("2D, " + renderType + ", Collision, wall, lwall")
                        .attr({ x: cx + hex_width / 2 - hwallwidth, y: cy, z: 2, w: hwallwidth, h: hwalllength })
                        .origin("top middle")
                        .rotation = 30;
                }
                if (i == height - 1) {
                    Crafty.e("2D, " + renderType + ", Collision, wall, twall")
                        .attr({ x: cx - hex_width / 4, y: cy + hex_height / 2 - hwallwidth, z: 2, w: hwalllength, h: hwallwidth });
                    if (j % 2 == 1)
                        Crafty.e("2D, " + renderType + ", Collision, wall, lwall")
                            .attr({ x: cx + hex_width / 2 - hwallwidth, y: cy, z: 2, w: hwallwidth, h: hwalllength })
                            .origin("top middle")
                            .rotation = 30;
                }
                if (i == height - 1 && j == width - 1)
                    finish_hex.attr({ x: cx - hex_width / 4, y: cy - wallwidth });
            }
        }
    }
})
//-------------------------------------------------------------------------------------------game scene

//-------------------------------------------------------------------------------------------finish scene
Crafty.defineScene('finish', function () {
    user_alg.visible = false;
    start_gen.visible = false;
    rebuild_game_scene.visible = false;
    player.visible = false;
    finish.visible = false;
    finish_hex.visible = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        control_entity.visible = false;
        full_window.visible = false;
    }
    else {
        user_height.visible = false;
        user_width.visible = false;
    }
    rebuild_on_finish.visible = true; 
    
    var shift = 90; 
    Crafty.e("2D, " + renderType + ", finish_animation, Tween, SpriteAnimation")
        .attr({x: windowwidth / 2 - 70/2, y:100, w:70, h:70})
        .reel("right_down", 500, 0, 0, 4)
        .reel("left_down", 500, 4, 0, 4)
        .reel("left_up", 500, 8, 0, 4)
        .reel("right_up", 500, 12, 0, 4)
        .tween({x: windowwidth / 2 - 70/2 + shift, y: 100 + shift}, 500, "smoothStep")
        .animate("right_down", 1)
        .bind("TweenEnd", function (){
            if (this.x == windowwidth / 2 - 70/2 + shift && this.y == 100 + shift)
            {
                this.tween({x: windowwidth / 2 - 70/2, y: 100 + shift + shift}, 500), "smoothStep";
                this.animate("left_down", 1);
            }
            if (this.x == windowwidth / 2 - 70/2 && this.y == 100 + shift + shift)
            {
                this.tween({x: windowwidth / 2 - 70/2 - shift, y: 100 + shift}, 500, "smoothStep");
                this.animate("left_up", 1);
            }
            if (this.x == windowwidth / 2 - 70/2 - shift && this.y == 100 + shift)
            {
                this.tween({x: windowwidth / 2 - 70/2, y: 100}, 500, "smoothStep");
                this.animate("right_up", 1);
            }
            if (this.x == windowwidth / 2 - 70/2 && this.y == 100)   
            {
                this.tween({x: windowwidth / 2 - 70/2 + shift, y: 100 + shift}, 500, "smoothStep");
                this.animate("right_down", 1);
            }
        });
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