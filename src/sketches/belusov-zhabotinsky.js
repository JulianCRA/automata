import Grid from '../Grid';

export default function bz_reaction ( p ) {
    let grid;

    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;

    let n;
    let k1;
    let k2;
    let g;

    let sampledImg;
    let colorDiff;

    let canvas;
    let textures;
    
    p.setup = function(){
        p.initSketch(200, 200, 2, 40, 2, 1, 10);
    }
    
    p.initSketch = function(w, h, seed, states, kk1, kk2, gg){
        canvas = p.createCanvas(600, 600);
        p.noStroke();
        p.noSmooth();
        //p.noLoop();
        //p.frameRate(15);

        gridWidth = w / 1;
        gridHeight = h / 1;
        cellWidth = Math.ceil(p.width / gridWidth);
        cellHeight = Math.ceil(p.height / gridHeight);
        
        n = states / 1;
        k1 = kk1 / 1;
        k2 = kk2 / 1;
        g = gg / 1;

        colorDiff = 255/n;

        grid = new Grid(gridWidth, gridHeight, 0);
        grid.shuffle(seed/1, n);
        /*grid.current[60][60] = n;
        grid.next[60][60] = n;*/

        //p.noStroke();

        p.textures = new Array(states+1);
        let colorVariance = 255 / states;
        for(let i = 1; i <= states; i++){
            let img = p.createImage(Math.ceil(cellWidth), Math.ceil(cellHeight));
            img.loadPixels();
            for (let ii = 0; ii < img.width; ii++) {
                for (let jj = 0; jj < img.height; jj++) {
                    //img.set(ii, jj, p.color([255-(i*colorVariance), i*colorVariance, 60+(i*colorVariance/2), 255]));
                    img.set(ii, jj, p.color([255, 255, 255, i*colorVariance]));
                }
            }
            img.updatePixels();
            p.textures[i] = img;
        }

        let img = p.createImage(Math.ceil(cellWidth), Math.ceil(cellHeight));
        img.loadPixels();
        for (let ii = 0; ii < img.width; ii++) {
            for (let jj = 0; jj < img.height; jj++) {
                //img.set(ii, jj, p.color([255-(i*colorVariance), i*colorVariance, 60+(i*colorVariance/2), 255]));
                img.set(ii, jj, p.color([0, 0, 0, 0]));
            }
        }
        img.updatePixels();
        p.textures[0] = img;
        //p.textures[0] = p.textures[1];

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
        for(let i = 0; i < gridWidth; i++){
            for(let j = 0; j < gridHeight; j++){
                p.evaluateCell(i, j);
                //p.image(p.textures[grid.current[i][j]], i*cellWidth, j*cellHeight);
            }
        }
        grid.iterateAll();

        for(let i = 0; i < gridWidth; i++){
			for(let j = 0; j < gridHeight; j++){
				sampledImg.pixels[((j*gridWidth+i)*4)+3] = grid.current[i][j]*colorDiff;
			}
		}
		sampledImg.updatePixels();
		
		p.image(sampledImg, 0, 0, p.width, p.height);
    }

    p.evaluateCell = function(xpos, ypos){
        let results = grid.getNeighborhood(xpos, ypos, 2, false);   // Moore neighborhood with Tchebychev distance of 2
        let infected = 0;
        let ill = 0;
        let sum = 0;
        let newState;

        for(let i = 0; i < results.neighbors.length; i++){
            if(results.neighbors[i].state == n){
                ill++;
            }
            else if(results.neighbors[i].state > 0 && results.neighbors[i].state < n){
                infected++;
            }
            sum += results.neighbors[i].state;
        }

        if(grid.current[xpos][ypos] == 0){                            // if the cell is "healthy"
            newState = Math.floor(infected/k1) + Math.floor(ill/k2);
        }
        else if(grid.current[xpos][ypos] == n){                       // if the cell is "ill"
            newState = 0;
        }
        else if(grid.current[xpos][ypos] > 0 && grid.current[xpos][ypos] < n){ // if the cell is "infected"
            newState = Math.floor(sum/(infected + ill + 1)) + g;
        }
        
        if(newState > n) newState = n;
        grid.next[xpos][ypos] = newState;
    }
}