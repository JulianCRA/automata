import Grid from '../Grid';

export default function flood_fill(p){
    const _CANVAS_SIZE = 600;
    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let canvas;

    //let colorList;
    let regions
    let showSeed;
    let euclidean;

    let grid;
    let seed
    let pixStack;
    let sampledImg;
    
    p.setup = function(){
        canvas = p.createCanvas(600,600);
        canvas.mouseClicked(p.startFill);
        p.noLoop();
        p.noSmooth();
        p.noStroke();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function(props){    
        
        
        gridWidth = props.w || 50;
		gridHeight = props.h || 50;
        cellWidth = _CANVAS_SIZE / gridWidth;
        cellHeight = _CANVAS_SIZE / gridHeight;

        showSeed = props.s && true;
        euclidean = props.e && true;

        regions = props.r || ((euclidean) ? Math.floor(gridWidth*gridHeight/200) : Math.floor(gridWidth*gridHeight/400));
        
        grid = new Grid(gridWidth, gridHeight);
        
        seed = [];
        pixStack = [];

        //let c = props.c || 2;
        //colorList = [];
        //for(let i = 0; i < c; i++){
        //    colorList.push(p.color(p.random(255),p.random(255),p.random(255)));
        //}
        let xpos;
        let ypos;
        for(let i = 0; i < regions; i++){
            //let rColor = Math.floor(Math.random()*colorList.length);
            //grid.current[xpos][ypos] = rColor + 1;

            xpos = Math.floor(Math.random()*gridWidth);
            ypos = Math.floor(Math.random()*gridHeight);
            seed.push({x:xpos, y:ypos});
            
            grid.current[xpos][ypos] = Math.round(Math.random());
        }
        p.voronoi(seed, euclidean);
        p.initSampler();

        if(canvas) p.redraw();
    }

    p.initSampler = function(baseColor = [255, 255, 255]){
		if(sampledImg) sampledImg = null;

		sampledImg = p.createImage(gridWidth, gridHeight);
		sampledImg.loadPixels();
		let pixpos;
		for(let i = 0; i < gridWidth; i++){
			for(let j = 0; j < gridHeight; j++){
				pixpos = (j * gridWidth + i) * 4;
				sampledImg.pixels[pixpos] = baseColor[0];
				sampledImg.pixels[pixpos+1] = baseColor[1];
				sampledImg.pixels[pixpos+2] = baseColor[2];
				sampledImg.pixels[pixpos+3] = 0;
			}
		}
    }
    
    p.startFill = function(){
        let startX = Math.floor(p.mouseX/cellWidth);
        let startY = Math.floor(p.mouseY/cellHeight);
        p.floodFill(startX, startY, grid.current[startX][startY], 1-grid.current[startX][startY]);
    }

    p.floodFill = function(xpos, ypos, startState, newState){
        if(startState!==newState)
            pixStack.push({x:xpos, y:ypos});
        
        while(pixStack.length > 0){
            //console.log("tiki");
            let searchLeft = false;
            let searchRight = false;
            let newPos = pixStack.pop();

            while(newPos.y > 0){
                newPos.y--;
                if(grid.current[newPos.x][newPos.y] !== startState){
                    newPos.y++;
                    break;
                }
            }
            
            while(newPos.y < gridHeight){
                if(grid.current[newPos.x][newPos.y] === startState){
                    grid.current[newPos.x][newPos.y] = newState;
                    
                    if(newPos.x > 0){
                        if(grid.current[newPos.x-1][newPos.y] === startState){
                            if(!searchLeft){
                                pixStack.push({x:newPos.x-1, y:newPos.y});
                                searchLeft = true;
                            }
                        }
                        else if(searchLeft){
                            searchLeft = false;
                        }
                    }

                    if(newPos.x < gridWidth -1){
                        if(grid.current[newPos.x+1][newPos.y] === startState){
                            if(!searchRight){
                                pixStack.push({x:newPos.x+1, y:newPos.y});
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
        p.clear();
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                sampledImg.pixels[((j*gridWidth+i)*4)+3] = grid.current[i][j]*255;
            }
        }
        sampledImg.updatePixels();
        p.image(sampledImg, 0, 0, p.width, p.height);
        
        if(showSeed){
            p.fill([0, 0, 0]);
            for(let i = 0; i < seed.length; i++){
                p.ellipse((seed[i].x+0.5)*cellWidth, (seed[i].y+0.5)*cellHeight, 6, 6);
            }
        }
    }

    p.voronoi = function(origin, euclidean = true){
        let closest;
        let distance;
        let isItShorter;

        if(euclidean){
            isItShorter = function(ax, ay, bx, by){
                if(distance * distance > (ax - bx)*(ax - bx) + (ay - by)*(ay - by)){
                    distance = Math.hypot(ax - bx, ay - by);
                    return true;
                }
                return false;
            };
        }else{
            isItShorter = function(ax, ay, bx, by){
                if(distance > Math.abs(bx - ax) + Math.abs(by - ay)){
                    distance = Math.abs(bx - ax) + Math.abs(by - ay);
                    return true;
                }
                return false;
            };
        }

        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                distance = gridWidth * gridHeight;
                for(let k = 0; k < origin.length; k++){
                    if(isItShorter(i, j, origin[k].x, origin[k].y)){
                        closest = origin[k];
                    }
                }
                grid.current[i][j] = grid.current[closest.x][closest.y];
            }
        }
    }
}