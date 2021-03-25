function Prims_algorithm(){
    var currPos = [Crafty.math.randomInt(0, height - 1), Crafty.math.randomInt(0, width - 1)];
        WallsInProcess = [];
    function FindNeighWallsPrims(y, x) {
        if (inside(y + 1, x) && VisCells[y + 1][x] == false) {
            WallsInProcess.push([[y, x], [y + 1, x]]);
        }
        if (inside(y - 1, x) && VisCells[y - 1][x] == false) {
            WallsInProcess.push([[y, x], [y - 1, x]]);
        }
        if (inside(y, x + 1) && VisCells[y][x + 1] == false) {
            WallsInProcess.push([[y, x], [y, x + 1]]);
        }
        if (inside(y, x - 1) && VisCells[y][x - 1] == false) {
            WallsInProcess.push([[y, x], [y, x - 1]]);
        }
    }

    FindNeighWallsPrims(currPos[0], currPos[1]);
    //-------------------------------------------------------------------------------------------------------
    // build_Prims();
    // function build_Prims()
    // {   
    //     var randomInd = Crafty.math.randomInt(0, WallsInProcess.length - 1);
    //     VisCells[WallsInProcess[randomInd][0][0]][WallsInProcess[randomInd][0][1]] = true;
    //     if (VisCells[WallsInProcess[randomInd][1][0]][WallsInProcess[randomInd][1][1]] == false)
    //     {
    //         BreakWall(WallsInProcess[randomInd][0], WallsInProcess[randomInd][1]);
    //         FindNeighWallsPrims(WallsInProcess[randomInd][1][0], WallsInProcess[randomInd][1][1]);
    //         VisCells[WallsInProcess[randomInd][1][0]][WallsInProcess[randomInd][1][1]] = true;
    //     }
    //     WallsInProcess.splice(randomInd, 1);
    //     if (WallsInProcess.length != 0)
    //     {
    //         setTimeout(build_Prims, 0);
    //     }
        
    // }
    //-------------------------------------------------------------------------------------------------------


    while (WallsInProcess.length != 0)
    {
        var randomInd = Crafty.math.randomInt(0, WallsInProcess.length - 1);
        VisCells[WallsInProcess[randomInd][0][0]][WallsInProcess[randomInd][0][1]] = true;
        if (VisCells[WallsInProcess[randomInd][1][0]][WallsInProcess[randomInd][1][1]] == false)
        {
            BreakWall(WallsInProcess[randomInd][0], WallsInProcess[randomInd][1]);
            FindNeighWallsPrims(WallsInProcess[randomInd][1][0], WallsInProcess[randomInd][1][1]);
            VisCells[WallsInProcess[randomInd][1][0]][WallsInProcess[randomInd][1][1]] = true;
        }
        WallsInProcess.splice(randomInd, 1);
    }
}
