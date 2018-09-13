import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap-reboot.css';
import './styles/style.css';

import P5SketchComponent from './components/P5SketchComponent';
import SketchControlPanelComponent from './components/SketchControlPanelComponent';


let buttons = document.getElementsByClassName('menu-button');
for(let btn of buttons){
	btn.addEventListener('click', selectSketch);
}

let currentSketch;

function selectSketch(event){
	currentSketch = event.target.id;
	ReactDOM.render(<SketchControlPanelComponent panel={currentSketch} onChange={updateConfig}/>, document.getElementById('controlPanel'));
}

function updateConfig(obj){
	let cnf = {...obj};
	ReactDOM.render(<P5SketchComponent sketch={currentSketch} config={cnf}/>, document.getElementById('gridboard'));
}
