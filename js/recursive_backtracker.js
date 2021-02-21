function recursive_backtracker(){
    var currPos = [Crafty.math.randomInt(0, height - 1), Crafty.math.randomInt(0, width - 1)];
        way = [];
        UnVisNeigh = [];
    way.push(currPos);
    //-------------------------------------------------------------------------------------------------------
    build_recursive_backtarcker();
    function build_recursive_backtarcker(){
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
        if (way.length > 0)
        {
            setTimeout(build_recursive_backtarcker, 0);
        }
    }
    //-------------------------------------------------------------------------------------------------------
    // while (way.length > 0) {
    //     UnVisNeigh = [];
    //     VisCells[currPos[0]][currPos[1]] = true;
    //     FindUnVisNeigh(currPos[0], currPos[1]);
    //     if (UnVisNeigh.length > 0)
    //     {
    //         var chosen = UnVisNeigh[Crafty.math.randomInt(0, UnVisNeigh.length - 1)];
    //         BreakWall(currPos, chosen);
    //         way.push(chosen);
    //         currPos = chosen;
    //     }
    //     else
    //     {
    //         currPos = way.pop();
    //     }
    // }
}