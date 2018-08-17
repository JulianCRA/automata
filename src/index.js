import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap-reboot.css';
import './styles/style.css';
import './styles/slider.css';

import P5SketchComponent from './P5SketchComponent';
import InputRange from './components/InputRange';


ReactDOM.render(<InputRange value="15" step="0.2" label="tamano"/>, document.getElementById('controlPanel'));


let buttons = document.getElementsByClassName('menu-button');
for(let btn of buttons){
	btn.addEventListener('click', selectSketch);
}

function selectSketch(event){
	//console.log(event.target.id);
	ReactDOM.render(<P5SketchComponent sketch={event.target.id}/>, document.getElementById('gridboard'));
}

