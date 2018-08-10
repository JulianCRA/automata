import Grid from '../Grid';

export default function viral_replication(p){

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;
    let grid;

    let q;

    let k1;     // infection rate
    let k2;     // base rate
    let k3;     // reproduction rate

    let firstDraw = true;

    /*p.setup = function(){
        p.initSketch(200, 200, 32, 55, 7000, 35);
        console.log("STP");
    }

    p.initSketch = function(w, h, states, kk1, kk2, kk3){
        console.log("inisk");
        canvas = p.createCanvas(600,600);
        p.noStroke();
        p.textSize(12);
                
        //p.noLoop();
        p.frameRate(10);

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        k1 = kk1 / 1;
        k2 = kk2 / 1;
        k3 = kk3 / 1;

        q = states / 1;
        grid = new Grid(gridWidth, gridHeight, -1, 0);
        p.fill("black");
        p.rect(0,0,p.width,p.height);
        grid.shuffle(gridWidth*gridHeight/2, q);
    }*/


    let limit;
    let cw3;
    let textures;
    p.myCustomRedrawAccordingToNewPropsHandler = function(props){
		gridWidth = props.w || 200;
        gridHeight = props.h || 200;
        q = props.states || 32;
        k1 = props.k1 || 55;
        k2 = props.k2 || 7000;
        k3 = props.k3 || 35;

		if(canvas) p.clear();
		
		cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;
        
        grid = new Grid(gridWidth, gridHeight, -1, 0);
        grid.shuffle(/*gridWidth*gridHeight/4096*/200, q);
	}
    
    p.setup = function(){
        canvas = p.createCanvas(600,600);
        p.noStroke();
        //p.noLoop();
        cellWidth = p.width / gridWidth;
        cellHeight = p.height / gridHeight;

        grid = new Grid(gridWidth, gridHeight, -1, 0);
        grid.shuffle(gridWidth*gridHeight/2, q);
        limit= Math.floor(gridWidth * gridHeight/1); //Should be gridWidth * gridHeight but the FPS take a hit
        cw3 = cellWidth*0.3;


        textures = [];
        let colorVariance = 255 / q;
        for(let i = 0; i < q; i++){
            let img = p.createImage(Math.ceil(cellWidth), Math.ceil(cellHeight));
            img.loadPixels();
            for (let ii = 0; ii < img.width; ii++) {
                for (let jj = 0; jj < img.height; jj++) {
                    //img.set(ii, jj, p.color([255-(i*colorVariance), i*colorVariance, 60+(i*colorVariance/2), 255]));
                    img.set(ii, jj, p.color([255, 255, 255, i*colorVariance]));
                }
            }
            img.updatePixels();
            textures[i] = img;
        }
        console.log(textures);
    }

    let randX;
        let randY;
         
    p.draw = function(){
    

    
        p.clear();
        grid.iterateAll();
        
        for (let i = 0; i < gridWidth; i++){
            for (let j = 0; j < gridHeight; j++){
                randX = Math.floor(Math.random()*gridWidth);
                randY = Math.floor(Math.random()*gridHeight);
                p.evaluateCell(randX, randY);
                if(grid.cellChangedState(randX, randY)/* || firstDraw*/){
                    //p.fill([255, 255, 255,grid.next[randX][randY]*255/q]);
                    //p.rect(randX*cellWidth, randY*cellHeight, cellWidth, cellHeight);
                    p.image(textures[12/*grid.next[randX][randY]*/], randX*cellWidth, randY*cellHeight);
                    //console.log(textures);
                    //console.log(grid.next[randX][randY]);
                    //p.fill("red");
                    //p.text(grid.next[i][j], i*cellWidth, j*cellHeight, cellWidth, cellHeight);
                }
            }
        }
        //p.noLoop();
       
        
        /*for(let i = 0; i < limit; i++){
            randX = Math.floor(Math.random()*gridWidth);
            randY = Math.floor(Math.random()*gridHeight);
            p.evaluateCell(randX, randY);
            if(grid.cellChangedState(randX, randY) || firstDraw){
                //p.fill([255, 255, 255,grid.next[randX][randY]*255/q]);
                //p.rect(randX*cellWidth, randY*cellHeight, cellWidth, cellHeight);//,cw3, cw3,cw3,cw3);
                
            }
        }*/
        firstDraw = false;
    }

    p.evaluateCell = function(xpos, ypos){
        
        let results;
        if(grid.existsCellIn(xpos, ypos)){    // If exists
            
            if(grid.current[xpos][ypos] === q){    // If healthy
                if(Math.random() < k2/100000){                  // Should infect?
                    grid.next[xpos][ypos] = q-1;
                }
                else{                                       // Should reproduce, then?
                    results = grid.getNeighborhood(xpos, ypos, 1, false);   // Moore neighbprhood with Tchebychev distance of 1
                    if(results.hasEmptySpaces && Math.random() < k3/100){   // Yeah, reproduce
                        let newBorn = results.emptySpaces[Math.floor(Math.random() * results.emptySpaces.length)];
                        grid.next[newBorn.x][newBorn.y] = q;
                    }
                }
            }
            else if(grid.current[xpos][ypos] === 0){                                       // If in last stage of infection
                grid.removeCellAt(xpos,ypos);
                results = grid.getNeighborhood(xpos, ypos, 1, false);   // Moore neighbprhood with Tchebychev distance of 1
                if(results.hasNeighbors){
                    for(let i = 0; i < results.neighbors.length; i++){
                        if( grid.next[results.neighbors[i].x][results.neighbors[i].y] > 1  && Math.random()<k1/100)
                            grid.next[results.neighbors[i].x][results.neighbors[i].y]--;
                    }
                }
            }
            else {     // if already infected
                grid.next[xpos][ypos] = grid.current[xpos][ypos] - 1; 
            }
        }else{
            grid.removeCellAt(xpos,ypos);
        }
    }
}