import React, { Component } from 'react';

import InputRange from '../InputRange';
import InputCheckBox from '../InputCheckBox';

export default class ViralPanel extends Component {
	constructor(props){
		super(props);
		this.config = {	w:150, 
						h:150, 
						t:false, 
						
						k1:55,
						k2:7000,
						k3:35,
						q:50 };
	}

	componentDidMount(){
		this.props.updateConfig(this.config);
	}

	render(){
		return(
			<React.Fragment>
				<InputRange attr={"w"} minimum={20} maximum={300} value={this.config.w} label={"Columns"} ttip={"Set the number of columns"} cb={this.updateConfig}/>
				<InputRange attr={"h"} minimum={20} maximum={300} value={this.config.h} label={"Rows"} ttip={"Set the number of rows"} cb={this.updateConfig}/>
				<InputCheckBox attr={"t"} defaultChecked={this.config.t} label={"Toroidal"} ttip={"Choose whether the algorithm should work as a plane or as a toroid."} cb={this.updateConfig}/>

				<InputRange attr={"k1"} minimum={1} maximum={100} value={this.config.k1} step={1} label={"Active infection rate"} ttip={"Set the value for the active infection rate."} cb={this.updateConfig}/>
				<InputRange attr={"k2"} minimum={1} maximum={100000} value={this.config.k2} step={1} label={"Base rate"} ttip={"Set the value for the base rate."} cb={this.updateConfig}/>
				<InputRange attr={"k3"} minimum={1} maximum={100} value={this.config.k3} step={1} label={"Chance of division"} ttip={"Set the value of the probability of cell division/reproduction"} cb={this.updateConfig}/>
				<InputRange attr={"q"} minimum={1} maximum={254} value={this.config.q} step={1} label={"States"} ttip={"Set the number of states a cell can have."} cb={this.updateConfig}/>
			</React.Fragment>
		)
	}

	updateConfig = (key, value) => {
		this.config[key] = value;
		this.props.updateConfig(this.config);
	}
}