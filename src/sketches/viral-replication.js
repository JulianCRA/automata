import Grid from '../Grid';

export default function viral_replication(p){
	let gridWidth;		// Number of 'cells' per row.
	let gridHeight;		// Number of rows in the grid.
	
	let grid;

	let q;				// Number of states that the cells can have.
	let k1;				// Infection rate.
	let k2;				// Base rate.
	let k3;				// Reproduction rate.
	let toroidal;

	let substeps;
	let colorDiff;
	let sampledImg;

	let hasStarted;

    p.preload = function(){
        if(!hasStarted) p.customRedraw();
    }

	p.setup = function(){
		p.createCanvas(600, 600);
		p.noStroke();
		p.pixelDensity(1);
		p.noSmooth();
	}

	p.customRedraw = function(config = {}){
        hasStarted = true;
		gridWidth = config.w || 200;
		gridHeight = config.h || 200;

		k1 = config.k1 / 100 || 55 / 100;
		k2 = config.k2 / 100000 || 7000 / 100000;
		k3 = config.k3 / 100 || 35 / 100;
		q = config.q || 50;
		toroidal = config.t && true;

		substeps = gridWidth * gridHeight;
		colorDiff = 255/(q-1);

		grid = new Grid(gridWidth, gridHeight);
		grid.shuffle(substeps/2, q - 1);
		
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

	let randX;
	let randY;
	
	p.draw = function(){
		p.clear();
		
		for(let i = 0; i < substeps; i++){
			randX = Math.floor( Math.random() * gridWidth);
			randY = Math.floor( Math.random() * gridHeight);
			p.evaluateCell(randX, randY);
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
		let neighborhood;
		
		if(grid.existsCellIn(xpos, ypos)){						// Is there a cell?
			if(grid.current[xpos][ypos] === q-1){				// Is it healthy?
				if(Math.random() < k2){                  		// Should it get infected?
					grid.next[xpos][ypos]--;
				}
				else{											// No? Should it 'divide'?
					neighborhood = grid.getNeighborhood(xpos, ypos, 1, toroidal);   // Moore neighbprhood with Tchebychev distance of 1
					if(neighborhood.hasEmptySpaces && Math.random() < k3){   // Yeah, divide it.
						let newBorn = neighborhood.emptySpaces[Math.floor(Math.random() * neighborhood.emptySpaces.length)];
						grid.next[newBorn.x][newBorn.y] = q-1;
					}
				}
			}
			else{												// Not healthy, huh?
				if(grid.current[xpos][ypos] === 0){				// Last stage of infection?
					grid.removeCellAt(xpos,ypos);
					neighborhood = grid.getNeighborhood(xpos, ypos, 1, toroidal);   // Moore neighbprhood with Tchebychev distance of 1
					if(neighborhood.hasNeighbors){
						for(let i = 0; i < neighborhood.neighbors.length; i++){
							if( grid.next[neighborhood.neighbors[i].x][neighborhood.neighbors[i].y] > 0  && Math.random()<k1)
								grid.next[neighborhood.neighbors[i].x][neighborhood.neighbors[i].y]--;
						}
					}
				} else{											// Already infected?
					grid.next[xpos][ypos] = grid.current[xpos][ypos] - 1;
				}
			}
		} 
	}


}