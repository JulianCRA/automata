import Grid from '../Grid';

export default function langtons_ant(p) {

    const _ROTATE_LEFT = -1;
    const _ROTATE_RIGHT = 1;
    const _CANVAS_SIZE = 600;

    let ants;
  
    let gridWidth;
    let gridHeight;
    let cellWidth;
    let cellHeight;
    
    let grid;
  
    let canvas;
    
    let hasStarted;

    p.preload = function(){
        if(!hasStarted) p.customRedraw();
    }

    p.setup = function(){
        canvas = p.createCanvas(_CANVAS_SIZE, _CANVAS_SIZE);
        canvas.mouseClicked(p.addAnt);
        p.pixelDensity(1);
        p.noStroke();
    }
    
    p.customRedraw = function(config = {}){
        hasStarted = true;
        
        if (canvas) p.clear();
		gridWidth = config.w || 20;
		gridHeight = config.h || 20;
        ants = config.ants || [];
        
        cellWidth = _CANVAS_SIZE / gridWidth;
        cellHeight = _CANVAS_SIZE / gridHeight;

        grid = new Grid(gridWidth, gridHeight, 0);
    }
   
    p.draw = function(){
        for(let i = 0; i < ants.length; i++){
            p.drawAnt(ants[i]);
        }
    }

    p.moveAnt = function(ant){
        grid.current[ant.x][ant.y] === 1 ? ant.direction += _ROTATE_RIGHT : ant.direction += _ROTATE_LEFT;
        grid.current[ant.x][ant.y] = 1 - grid.current[ant.x][ant.y];
    
        let newDirection = Math.abs(ant.direction) % 4;
        
        switch(newDirection){
            case 0:
                ant.x === 0 ? ant.x = gridWidth-1 : ant.x--;
                break;
            case 1:
                ant.y === 0 ? ant.y = gridHeight-1 : ant.y--;
                break;
            case 2:
                ant.x === gridWidth-1 ? ant.x = 0 : ant.x++;
                break;
            case 3:
                ant.y === gridHeight-1 ? ant.y = 0 : ant.y++;
				break;
			default:
				break;
        }
    }

    p.drawAnt = function(ant){
        let i = ant.x;
        let j = ant.y;
        p.fill(grid.current[i][j] * 255);
        p.rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight, cellWidth*0.3, cellWidth*0.3, cellWidth*0.3, cellWidth*0.3);
        p.moveAnt(ant);
	}
	
	p.addAnt = function(){
		ants.push({x:Math.floor(p.mouseX/cellWidth), y:Math.floor(p.mouseY/cellHeight), direction:1});
	}
}