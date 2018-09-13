import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap-reboot.css';
import './styles/style.css';
import './styles/slider.css';


import P5SketchComponent from './P5SketchComponent';
import SketchControlPanelComponent from './SketchControlPanelComponent';


let buttons = document.getElementsByClassName('menu-button');
for(let btn of buttons){
	btn.addEventListener('click', selectSketch);
}

let config = {}
let currentSketch;

function selectSketch(event){
	//ReactDOM.render(<P5SketchComponent sketch={event.target.id} config={{h:100, w:300, pepe:"fdfdf", bibi:true}}/>, document.getElementById('gridboard'));
	currentSketch = event.target.id;
	ReactDOM.render(<SketchControlPanelComponent panel={currentSketch} onChange={updateConfig} setInitial={setInitialConfig}/>, document.getElementById('controlPanel'));
}

function updateConfig(key, val){
	if(config[key] !== val){
		config[key] = val;
	}
	console.log(config);

	let cnf = {...config};

	ReactDOM.render(<P5SketchComponent sketch={currentSketch} config={cnf}/>, document.getElementById('gridboard'));
}

function setInitialConfig(conf){
	ReactDOM.render(<P5SketchComponent sketch={currentSketch} config={conf}/>, document.getElementById('gridboard'));
	config = conf;
}

