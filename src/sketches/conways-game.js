var conwayslife = function( p ) {

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    p.grid;
    let canvas;

    p.setup = function() {
        p.initSketch(120, 120, 4000);

        // GLIDER
        //p.initSketch(100, 100, [{x:2, y:2},{x:3, y:2},{x:4, y:2},{x:4, y:1},{x:3, y:0}]);
    }
    
    p.initSketch = function(w, h, seed){
        
        canvas = p.createCanvas(600, 600);
        canvas.doubleClicked = function(){p.doubleClicked();};
        p.frameRate(15);
        p.noStroke();
        p.background(255);
        //p.noLoop();
        
        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;
        
        p.grid = new Grid(gridWidth, gridHeight, 1, 1);
        if(seed.constructor === Array){
            for(let i = 0; i < seed.length; i++)
                p.grid.current[seed[i].x][seed[i].y] =0;
        }else{
            p.grid.shuffle(seed/1, 0);
        }
    }

    p.draw  = function(){
        p.clear();
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                if(!p.grid.deadCellIn(i, j)){
                    p.fill(255 - p.grid.current[i][j] * 255);
                    p.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight, cellWidth*0.4, cellWidth*0.4, cellWidth*0.4, cellWidth*0.4);
                }
            }
        }
        p.grid.iterateAll();
    }

    p.evaluateCell = function(xpos, ypos){
        let nh = p.grid.getNeighborhood(xpos, ypos, 1, false); // Moore neighbprhood with Tchebychev distance of 1
        if(nh.hasNeighbors){
            let aliveNeighbors = nh.neighbors.length;
            if(p.grid.current[xpos][ypos] == 0){          // if the cell is alive
                if(aliveNeighbors < 2){                 // kill it due to "extinction"
                    p.grid.next[xpos][ypos] = 1;       
                }
                else if(aliveNeighbors >= 2 && aliveNeighbors <= 3){
                    p.grid.next[xpos][ypos] = 0;
                }
                else if(aliveNeighbors > 3){            // kill it due to "starvation"
                    p.grid.next[xpos][ypos] = 1;   
                }
            }else{                                      // if the cell is dead
                if(aliveNeighbors == 3){
                    p.grid.next[xpos][ypos] = 0;       // revive it
                }else{
                    p.grid.next[xpos][ypos] = 1;
                }
            }
        }    
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}