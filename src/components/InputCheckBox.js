import React from 'react';

export default class InputRange extends React.Component{
	constructor(props){
		super(props);
		console.log(props.defaultChecked === true);
		this.state = {
			isChecked : (props.defaultChecked === true),
			label : (props.label || "value") + " : ",
			ttip : props.ttip || "Set the value"
		}
		
		this.toggleChange = this.toggleChange.bind(this);
	}

	render(){
		return(
			<div className = "input-checkbox-container" title = {this.state.ttip} onClick={this.toggleChange}>
				<label className = "slider-label checkbox-label">
					{this.state.label}
				</label>
				<div>
					<input 
						className = "input-checkbox"
						type = "checkbox" 
						checked = {this.state.isChecked}
						onChange = {this.toggleChange}
					/>
				</div>
			</div>
		);
	}

	toggleChange(){
		this.setState({isChecked:!this.state.isChecked});
	}

	getValue(){
		return this.state.value * 1;
	}
}