import React from 'react';

export default class InputRange extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value : props.value || props.min || 0,
			minimum : props.min || 0,
			maximum : props.maximum || 100,
			step : props.step || 1,
			label : (props.label || "value") + " : ",
			ttip : props.ttip || "Set the value"
		}
	}

	render(){
		return(
			<div title = {this.state.ttip}>
				<input 
					className = "slider"
					type = "range" 
					min = {this.state.min}
					max = {this.state.max}
					step = {this.state.step}
					value = {this.state.value}
					onChange = {(event) => this.setState({value: event.target.value})}
				/>
				<label className = "slider-label">
					{this.state.label + this.state.value}
				</label>
			</div>
		);
	}

	getValue(){
		return this.state.value * 1;
	}
}