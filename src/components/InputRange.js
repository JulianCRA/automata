import React from 'react';

import '../styles/slider.css';
export default class InputRange extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value : props.value || props.minimum || 0,
			minimum : props.minimum || 0,
			maximum : props.maximum || 100,
			step : props.step || 1,
			label : (props.label || "value"),
			ttip : props.ttip || "Set the value.",
		}
		
		this.handleChange = this.handleChange.bind(this);
	}

	render(){
		return(
			<div className="slider-container" title = {this.state.ttip}>
				<label className = "slider-label">
					{this.state.label + " : " + this.state.value}
				</label>
				<input 
					className = "slider"
					type = "range" 
					min = {this.state.minimum}
					max = {this.state.maximum}
					step = {this.state.step}
					value = {this.state.value}
					onChange = {this.handleChange}
				/>
			</div>
		);
	}

	handleChange(event){
		this.setState({value: event.target.value*1});
		if(typeof this.props.cb === "function") this.props.cb(this.props.attr, event.target.value*1);
	}
}