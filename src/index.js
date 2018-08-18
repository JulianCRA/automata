import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap-reboot.css';
import './styles/style.css';
import './styles/slider.css';
import './styles/checkbox.css';

import P5SketchComponent from './P5SketchComponent';
import InputRange from './components/InputRange';
import InputCheckBox from './components/InputCheckBox';


ReactDOM.render(<InputCheckBox defaultChecked={false} ttip={"Espiche pues, agonia"} label="Si akehkad dksdku r sgdrg rdg wer g wertwertwer wtrwrtwer wtret wert   jtu jt rsf s fwe r wrefwerui44  432423 3434cas dkfshadlfk aldjshadlksh slkdfalkshflkasdjhflk alkuerklaflsl5k4k flkwh4lwk4 54kl5hl o nocas?"/>, document.getElementById('controlPanel'));


let buttons = document.getElementsByClassName('menu-button');
for(let btn of buttons){
	btn.addEventListener('click', selectSketch);
}

function selectSketch(event){
	//console.log(event.target.id);
	ReactDOM.render(<P5SketchComponent sketch={event.target.id}/>, document.getElementById('gridboard'));
}

