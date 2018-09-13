import Grid from '../Grid';

export default function conways_game( p ) {
    const _CANVAS_SIZE = 600;

    let grid;
    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let seed;
    let toroidal;

    let hasStarted;

    p.preload = function(){
        if(!hasStarted) p.customRedraw();
    }

    p.setup = function() {
        p.createCanvas(_CANVAS_SIZE, _CANVAS_SIZE);
        p.frameRate(12);
        p.pixelDensity(1);
        p.noStroke();
    }
    
    p.customRedraw = function(config = {}){
        hasStarted = true;
        
        gridWidth = config.w || 100;
        gridHeight = config.h || 100;
        seed = config.s || 10;
        toroidal = config.t && true;

        cellWidth = _CANVAS_SIZE / gridWidth;
        cellHeight = _CANVAS_SIZE / gridHeight;
        
        grid = new Grid(gridWidth, gridHeight, 1, 1);
        
        if(seed.constructor === Array){
            for(let i = 0; i < seed.length; i++)
                grid.current[seed[i].x][seed[i].y] = 0;
        }else{
            grid.shuffle(seed/100*gridWidth*gridHeight, 0);
        }
    }

    p.draw  = function(){
        p.clear();
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                if(!grid.deadCellIn(i, j)){
                    p.fill(255 - grid.current[i][j] * 255);
                    p.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight, cellWidth*0.4, cellWidth*0.4, cellWidth*0.4, cellWidth*0.4);
                }
            }
        }
        grid.iterateAll();
    }
    
    p.evaluateCell = function(xpos, ypos){
        let nh = grid.getNeighborhood(xpos, ypos, 1, toroidal); // Moore neighborhood with Tchebychev distance of 1
        let aliveNeighbors = nh.neighbors.length;
            
        if(grid.current[xpos][ypos] === 0){          // if the cell is alive
            /*if(aliveNeighbors < 2){                 // kill it due to "extinction"
                grid.next[xpos][ypos] = 1;       
            }
            else if(aliveNeighbors >= 2 && aliveNeighbors <= 3){
                grid.next[xpos][ypos] = 0;
            }
            else if(aliveNeighbors > 3){            // kill it due to "starvation"
                grid.next[xpos][ypos] = 1;   
            }*/
            if(aliveNeighbors < 2 || aliveNeighbors > 3) grid.next[xpos][ypos] = 1;
        }else{                                      // if the cell is dead
            if(aliveNeighbors === 3){
                grid.next[xpos][ypos] = 0;       // revive it
            }
        }
        
    }
}