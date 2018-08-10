var diffusionlimitedaggregation = function (p){

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;
    let orangered;

    let q;

    let k1;
    let k2;
    
    p.grid;
    let mobility;
    
    p.setup = function(){
        p.initSketch(200, 200, 64, 5, 1);
    }

    p.initSketch = function(w, h, states, kk1, kk2){
        canvas = p.createCanvas(600,600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        p.noStroke();
        //p.noLoop();
        p.frameRate(60);

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        k1 = kk1 / 1;
        k2 = kk2 / 1;
        q = states / 1;

        mobility = new Array(gridWidth);
        for(let i = 0; i < gridWidth; i++){
            mobility[i] = new Array(gridHeight);
        }

        p.grid = new Grid(gridWidth, gridHeight);
        let seedCells = p.grid.shuffle(k2, q);
        for(let i = 0; i < seedCells.length; i++){
            mobility[seedCells[i].x][seedCells[i].y] = false;
        }
        /*center = Math.floor(gridWidth/2);
        p.grid.next[center][center] = q;
        mobility[center][center] = false;*/
        let otherCells = p.grid.shuffle(Math.floor(gridWidth*gridHeight*kk1/100), 5, q);
        for(let i = 0; i < otherCells.length; i++){
            mobility[otherCells[i].x][otherCells[i].y] = true;
        }

        orangered = p.color("orangered");
    }

    p.draw = function(){
        let randX;
        let randY;
        let mobileCells = 0;
        let keepGoing = true;
        
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                randX = Math.floor(Math.random()*gridWidth);
                randY = Math.floor(Math.random()*gridHeight);
                p.evaluateCell(randX, randY);
            }
        }
        p.background(0);
        //p.fill(orangered);
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                if(p.grid.existsCellIn(i, j)){
                    if(p.grid.current[i][j] == q){
                        p.fill(orangered);
                        //p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                    }else{
                        mobileCells++;
                        p.fill(50);
                    }
                    p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                }
            }
        }
        if(mobileCells == 0){
            console.log("STOP");
            p.noLoop();
        }
    }

    p.evaluateCell = function(xpos, ypos){
        if(mobility[xpos][ypos] == true){
            let n = p.grid.getNeighborhood(xpos, ypos, 1, false);
            let hasFixedNeighbor = false;
            for(let i = 0; i < n.neighborhood.length; i++){
                if(mobility[n.neighborhood[i].x][n.neighborhood[i].y] == false){
                    hasFixedNeighbor = true;
                    break;
                }
            }

            if(hasFixedNeighbor){
                p.grid.current[xpos][ypos] = q;
                mobility[xpos][ypos] = false;
            }
            else{
                if(n.hasEmptySpaces){
                    let newPos = n.emptySpaces[Math.floor(Math.random() * n.emptySpaces.length)];
                    p.grid.current[newPos.x][newPos.y] = p.grid.current[xpos][ypos];
                    mobility[newPos.x][newPos.y] = true;
                    p.grid.current[xpos][ypos] = -1;
                    mobility[xpos][ypos] = undefined;
                }
            }
        }
    }

    p.doubleClicked = function(){
        p.redraw();
    }
}