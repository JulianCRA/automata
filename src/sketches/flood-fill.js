var floodfill = function (p){

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;

    let colorList;
    let regions

    p.grid;
    let colors;
    let seed
    p.pixStack;
    
    p.setup = function(){
        p.initSketch(200, 200, 600, 2);
    }

    p.initSketch = function(w, h, r, c){
        canvas = p.createCanvas(600,600);
        canvas.doubleClicked = function(){p.doubleClicked();}
        canvas.mouseClicked(startFill);
        p.noLoop();
        p.noStroke();
        
        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        regions = r / 1;
        colorList = new Array(c / 1);
        colors = new Array(gridWidth);
        p.grid = new Grid(gridWidth, gridHeight);
        seed = new Array();
        p.pixStack = new Array();

        for(let i = 0; i < colorList.length; i++){
            colorList[i] = p.color(p.random(255),p.random(255),p.random(255));
        }
       
        for(let i = 0; i < regions; i++){
            let rColor = Math.floor(Math.random()*colorList.length);
            let xpos = Math.floor(Math.random()*gridWidth);
            let ypos = Math.floor(Math.random()*gridHeight);
            seed.push({x:xpos, y:ypos});
            p.grid.current[xpos][ypos] = rColor + 1;
        }
        p.voronoi(seed, false);
    }

    startFill = function(){
        let startX = Math.floor(p.mouseX/cellWidth);
        let startY = Math.floor(p.mouseY/cellHeight);
        floodFill(startX, startY, p.grid.current[startX][startY], 0);
    }

    floodFill = function(xpos, ypos, startState, newState){
        if(startState!=newState)
            p.pixStack.push({x:xpos, y:ypos});
        
        while(p.pixStack.length > 0){
            //console.log("tiki");
            let searchLeft = false;
            let searchRight = false;
            let newPos = p.pixStack.pop();

            while(newPos.y > 0){
                newPos.y--;
                if(p.grid.current[newPos.x][newPos.y] != startState){
                    newPos.y++;
                    break;
                }
            }
            
            while(newPos.y < gridHeight){
                if(p.grid.current[newPos.x][newPos.y] == startState){
                    p.grid.current[newPos.x][newPos.y] = newState;
                    
                    if(newPos.x > 0){
                        if(p.grid.current[newPos.x-1][newPos.y] == startState){
                            if(!searchLeft){
                                p.pixStack.push({x:newPos.x-1, y:newPos.y});
                                searchLeft = true;
                            }
                        }
                        else if(searchLeft){
                            searchLeft = false;
                        }
                    }

                    if(newPos.x < gridWidth -1){
                        if(p.grid.current[newPos.x+1][newPos.y] == startState){
                            if(!searchRight){
                                p.pixStack.push({x:newPos.x+1, y:newPos.y});
                                searchRight = true;
                            }
                        }
                        else if(searchRight){
                            searchRight = false;
                        }
                    }

                }
                else{
                    newPos.y--;
                    break;
                }
                newPos.y++;
            }
        }
        p.redraw();
    }

    p.draw = function(){
        p.background(0);
        
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                if(p.grid.current[i][j] == 0)
                    p.fill('black');
                else
                    p.fill(colorList[p.grid.current[i][j]-1]);

                p.rect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
            }
        }
        p.fill(255);
        for(let i = 0; i < seed.length; i++){
            p.ellipse((seed[i].x+0.5)*cellWidth, (seed[i].y+0.5)*cellHeight, 10, 10);
        }
    }

    p.voronoi = function(origin, euclidean = true){
        for(let i = 0; i < gridWidth; i++){
            colors[i] = new Array(gridHeight);
            for(let j = 0; j < gridHeight; j++){
                let closest;
                let distance = gridWidth * gridHeight;
                for(let k = 0; k < origin.length; k++){
                    let dd = 0;
                    if(euclidean){
                        dd = p.dist(origin[k].x, origin[k].y, i, j);
                    }
                    else{
                        dd = Math.abs(origin[k].x - i) + Math.abs(origin[k].y - j)
                    }
                    
                    if(dd < distance){
                        closest = origin[k];
                        distance = dd;
                    }
                }
                p.grid.current[i][j] = p.grid.current[closest.x][closest.y];
            }
        }
    }

    p.doubleClicked = function(){
        //p.redraw();
        console.log("DOBKE");
    }
}