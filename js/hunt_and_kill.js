function hunt_and_kill(){
    var currPos = [Crafty.math.randomInt(0, height - 1), Crafty.math.randomInt(0, width - 1)];
        UnVisNeigh = [];
    function FindVisNeigh(y, x) {
            if (inside(y + 1, x) && VisCells[y + 1][x] == true)
                VisNeigh.push([y + 1, x]);
            if (inside(y - 1, x) && VisCells[y - 1][x] == true)
                VisNeigh.push([y - 1, x]);
            if (inside(y, x + 1) && VisCells[y][x + 1] == true)
                VisNeigh.push([y, x + 1]);
            if (inside(y, x - 1) && VisCells[y][x - 1] == true)
                VisNeigh.push([y, x - 1]);
    }
    do{
        do {
            UnVisNeigh = [];
            VisCells[currPos[0]][currPos[1]] = true;
            FindUnVisNeigh(currPos[0], currPos[1]);
            if (UnVisNeigh.length > 0)
            {
                var chosen = UnVisNeigh[Crafty.math.randomInt(0, UnVisNeigh.length - 1)];
                BreakWall(currPos, chosen);
                currPos = chosen;
            }
        } while (UnVisNeigh.length > 0)
        var VisNeigh = [];
        top:
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                if (VisCells[y][x] == false) {
                    FindVisNeigh(y, x);
                    if (VisNeigh.length > 0) 
                    {
                        currPos = [y, x];
                        var chosen = VisNeigh[Crafty.math.randomInt(0, UnVisNeigh.length - 1)];
                        BreakWall(currPos, chosen);
                        break top;
                    } 
                }
                
            }
        }
    }while (VisNeigh.length > 0)
}