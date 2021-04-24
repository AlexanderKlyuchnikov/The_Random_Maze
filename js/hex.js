function hex() {
    function BreakWallHEX(firstP, secondP)
    {
        if (firstP[0] == secondP[0] + 1 && firstP[1] == secondP[1])
            Crafty("twall" + firstP[0] + "_" + firstP[1]).destroy();
        if (firstP[0] == secondP[0] - 1 && firstP[1] == secondP[1])
            Crafty("twall" + secondP[0] + "_" + secondP[1]).destroy();
        if (firstP[1] % 2 == 0)
        {
            if (firstP[0] == secondP[0] + 1 && firstP[1] == secondP[1] + 1)
                Crafty("ltwall" + firstP[0] + "_" + firstP[1]).destroy();
            if (firstP[0] == secondP[0] && firstP[1] == secondP[1] + 1)
                Crafty("lbwall" + firstP[0] + "_" + firstP[1]).destroy();
            if (firstP[0] == secondP[0] + 1 && firstP[1] == secondP[1] - 1)
                Crafty("lbwall" + secondP[0] + "_" + secondP[1]).destroy();
            if (firstP[0] == secondP[0] && firstP[1] == secondP[1] - 1)
                Crafty("ltwall" + secondP[0] + "_" + secondP[1]).destroy();
        }
        else
        {
            if (firstP[0] == secondP[0] && firstP[1] == secondP[1] + 1)
                Crafty("ltwall" + firstP[0] + "_" + firstP[1]).destroy();
            if (firstP[0] == secondP[0] - 1 && firstP[1] == secondP[1] + 1)
                Crafty("lbwall" + firstP[0] + "_" + firstP[1]).destroy();
            if (firstP[0] == secondP[0] && firstP[1] == secondP[1] - 1)
                Crafty("lbwall" + secondP[0] + "_" + secondP[1]).destroy();
            if (firstP[0] == secondP[0] - 1 && firstP[1] == secondP[1] - 1)
                Crafty("ltwall" + secondP[0] + "_" + secondP[1]).destroy();
        }
    }
    function FindUnVisNeighHEX(y, x) {
        if (inside(y - 1, x) && VisCells[y - 1][x] == false)
            UnVisNeigh.push([y - 1, x])
        if (inside(y + 1, x) && VisCells[y + 1][x] == false)
            UnVisNeigh.push([y + 1, x])
        if (x % 2 == 0)
        {
            if (inside(y - 1, x - 1) && VisCells[y - 1][x - 1] == false)
                UnVisNeigh.push([y - 1, x - 1])
            if (inside(y - 1, x + 1) && VisCells[y - 1][x + 1] == false)
                UnVisNeigh.push([y - 1, x + 1])
        }
        else
        {
            if (inside(y + 1, x - 1) && VisCells[y + 1][x - 1] == false)
                UnVisNeigh.push([y + 1, x - 1])
            if (inside(y + 1, x + 1) && VisCells[y + 1][x + 1] == false)
                UnVisNeigh.push([y + 1, x + 1])
            
        }
        if (inside(y, x - 1) && VisCells[y][x - 1] == false)
            UnVisNeigh.push([y, x - 1])
        if (inside(y, x + 1) && VisCells[y][x + 1] == false)
            UnVisNeigh.push([y, x + 1])
    }
    var currPos = [Crafty.math.randomInt(0, height - 1), Crafty.math.randomInt(0, width - 1)];
        way = [];
        UnVisNeigh = [];
    way.push(currPos);
    while (way.length > 0) {
        UnVisNeigh = [];
        VisCells[currPos[0]][currPos[1]] = true;
        FindUnVisNeighHEX(currPos[0], currPos[1]);
        if (UnVisNeigh.length > 0)
        {
            var chosen = UnVisNeigh[Crafty.math.randomInt(0, UnVisNeigh.length - 1)];
            BreakWallHEX(currPos, chosen);
            way.push(chosen);
            currPos = chosen;
        }
        else
        {
            currPos = way.pop();
        }
    }
}