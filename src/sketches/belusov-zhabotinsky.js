import Grid from '../Grid';

export default function bz_reaction ( p ) {
    const _CANVAS_SIZE = 600;
    let grid;

    let gridWidth;
    let gridHeight;
    let toroidal;
    let distance;
    
    let n;
    let k1;
    let k2;
    let g;

    let sampledImg;
    let colorDiff;

    let hasStarted;

    p.preload = function(){
        if(!hasStarted) p.customRedraw();
    }

    p.setup = function(){
		p.createCanvas(_CANVAS_SIZE, _CANVAS_SIZE);
		p.noStroke();
		p.pixelDensity(1);
        p.noSmooth();
    }
    
    p.customRedraw = function(config = {}){
        hasStarted = true;

        gridWidth = config.w || 200;
        gridHeight = config.h || 200;
        toroidal = config.t && true;
        distance = config.d || 2;
        
        n = config.n || 32;
        k1 = config.k1 || 4;
        k2 = config.k2 || 1;
        g = config.g || 10;

        colorDiff = 255 / n;

        let seed = config.seed || 4;

        grid = new Grid(gridWidth, gridHeight, 0);
        grid.shuffle(seed/1, n);
        
        p.initSampler();
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

    p.draw = function(){
        p.clear();
        
        grid.iterateAll();
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                sampledImg.pixels[((j*gridWidth+i)*4)+3] = grid.current[i][j]*colorDiff;
            }
        }
        sampledImg.updatePixels();
		p.image(sampledImg, 0, 0, p.width, p.height);
    }

    p.evaluateCell = function(xpos, ypos){
        let results = grid.getNeighborhood(xpos, ypos, distance, toroidal);   // Moore neighborhood with Tchebychev $distance
        let infected = 0;
        let ill = 0;
        let sum = 0;
        let newState;

        for(let i = 0; i < results.neighbors.length; i++){
            if(results.neighbors[i].state === n){
                ill++;
            }
            else if(results.neighbors[i].state > 0 && results.neighbors[i].state < n){
                infected++;
            }
            sum += results.neighbors[i].state;
        }

        if(grid.current[xpos][ypos] > 0 && grid.current[xpos][ypos] < n){ // if the cell is "infected"
            newState = Math.floor(sum/(infected + ill + 1)) + g;
        }
        else if(grid.current[xpos][ypos] === n){                       // if the cell is "ill"
            newState = 0;
        }
        else if(grid.current[xpos][ypos] === 0){                            // if the cell is "healthy"
            newState = Math.floor(infected/k1) + Math.floor(ill/k2);
        }
        
        if(newState > n) newState = n;
        grid.next[xpos][ypos] = newState;
    }
}