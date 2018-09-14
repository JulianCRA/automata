import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap-reboot.css';

import P5SketchComponent from './components/P5SketchComponent';
import SketchControlPanelComponent from './components/SketchControlPanelComponent';

let buttons = document.getElementsByClassName('menu-button');
for(let btn of buttons){
	btn.addEventListener('click', selectSketch);
}

let currentSketch;	

function selectSketch(event){
	let btn;
	if(currentSketch !== undefined){
		btn = document.getElementById(currentSketch);
		btn.classList.remove('current');
	}

	currentSketch = event.target.id;
	
	ReactDOM.render(<SketchControlPanelComponent panel={currentSketch} onChange={updateConfig}/>, document.getElementById('controlPanel'));
	
	btn = document.getElementById(currentSketch);
	btn.classList.add('current');
}

function updateConfig(obj){
	let cnf = {...obj};
	ReactDOM.render(<P5SketchComponent sketch={currentSketch} config={cnf}/>, document.getElementById('gridboard'));
	changeColor();
}

let color = [49, 82, 151];
let panels = document.getElementsByClassName('panel');

function changeColor(){
	let colorChannel = Math.round(Math.random()*2);
	let shade = (Math.round(Math.random()) * 2 - 1)*10;
	if((color[colorChannel] + shade < 180) && (color[colorChannel] + shade > 0))
		color[colorChannel] = color[colorChannel] + shade;
	
	for(let p of panels){
		p.style.background = "#"+color[0].toString(16)+color[1].toString(16)+color[2].toString(16);
	}
}

selectSketch({target:{id:'life'}});