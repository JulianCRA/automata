var forestfire = function( p ) {

    const _EMPTY = 0;
    const _BURNING = 1;
    const _TREE = 2;
    const _BURNT = 3;

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let combustion;         // spontaneous combustion probablilty
    let resistance;         // fire resitance
    let germination;        // tree germination probability
    let recovery;           // soil recovery rate
    let toroidal;           // toroidal plane?

    p.grid;
    let deadtime;
    let canvas;
    
    p.setup = function() {
        p.initSketch(600, 600, 0.000001, 0.40, 0.005, 0.00000001, false);
    }
    p.initSketch = function(w, h, com, res, ger, rec, tor = true){
        canvas = p.createCanvas(600, 600);
        canvas.doubleClicked = function(){p.doubleClicked();};

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        combustion = com / 1;
        resistance = res  / 1;
        germination = ger / 1;
        recovery = rec / 1;
        toroidal = tor;
        
        deadtime = new Array(gridWidth);
        for(let i = 0; i < deadtime.length; i++){
            deadtime[i] = new Array(gridHeight);
        }

        p.grid = new Grid(gridWidth, gridHeight, _TREE);
       
        p.noStroke();
        //p.noLoop();
        p.fill("forestgreen");
        p.rect(0,0,p.width,p.height);
    }

    p.draw = function(){
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                
                p.evaluateCell(i, j);
                if(p.grid.cellChangedState(i, j)){
                    switch(p.grid.next[i][j]){
                        case _BURNING:
                            p.fill("orangered");
                            break;
                        case _EMPTY:
                            p.fill("saddlebrown");
                            break;
                        case _TREE:
                            p.fill("forestgreen");
                            break;
                        case _BURNT:
                            p.fill("black");
                            break;
                    }
                    p.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
                }
            }
        }
        p.grid.iterateAll();
    }

    p.evaluateCell = function(xpos, ypos){
        if(p.grid.current[xpos][ypos] == _TREE){
            if(Math.random() > resistance){             // "Roll" for fire resistance
                if(toroidal){                           // check toroidal neighborhood
                    if( p.grid.current[xpos][ypos-1 > 0? ypos-1:gridHeight-1] == _BURNING ||
                        p.grid.current[xpos-1 > 0? xpos-1:gridWidth-1][ypos] == _BURNING ||
                        p.grid.current[xpos+1 > gridWidth-1? 0:xpos+1][ypos] == _BURNING ||
                        p.grid.current[xpos][ypos+1 > gridHeight-1? 0:ypos+1] == _BURNING ){
                            p.grid.next[xpos][ypos] = _BURNING;
                    }
                }else{                                  // check planar neighborhood
                    if( p.grid.current[xpos][ypos-1 > 0? ypos-1:ypos] == _BURNING ||
                        p.grid.current[xpos-1 > 0? xpos-1:xpos][ypos] == _BURNING ||
                        p.grid.current[xpos+1 > gridWidth-1? gridWidth-1:xpos+1][ypos] == _BURNING ||
                        p.grid.current[xpos][ypos+1 > gridHeight-1? gridHeight-1:ypos+1] == _BURNING ){
                            p.grid.next[xpos][ypos] = _BURNING;
                    }
                }
            }else if(Math.random() < combustion){       // "Roll" for spontaneous combustion
                p.grid.next[xpos][ypos] = _BURNING;
            }
        }
        else if(p.grid.current[xpos][ypos] == _BURNING){
            p.grid.next[xpos][ypos] = _BURNT;
            deadtime[xpos][ypos] = recovery;
        }
        else if(p.grid.current[xpos][ypos] == _BURNT){
            deadtime[xpos][ypos] += deadtime[xpos][ypos];// threshold to recover grows exponentially 
            if(Math.random() < deadtime[xpos][ypos])     // "Roll" for soil recovery
                p.grid.next[xpos][ypos] = _EMPTY;
        }
        else if(p.grid.current[xpos][ypos] == _EMPTY && Math.random() < germination){// "Roll" for germination
            p.grid.next[xpos][ypos] = _TREE;
        }
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}