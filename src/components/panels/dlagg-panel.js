import React, { Component } from 'react';

import InputRange from '../InputRange';
import InputCheckBox from '../InputCheckBox';

export default class ViralPanel extends Component {
	constructor(props){
		super(props);
		this.config = {	w:200, 
						h:200, 
						t:false, 
						
						q:1,
						k1:15,
						k2:0 };
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

				<InputRange attr={"q"} minimum={1} maximum={64} value={this.config.q} step={1} label={"States"} ttip={"Set the amount of states."} cb={this.updateConfig}/>
				<InputRange attr={"k1"} minimum={1} maximum={100} value={this.config.k1} step={1} label={"Mobile cells"} ttip={"Set the percentage of mobile cells."} cb={this.updateConfig}/>
				<InputRange attr={"k2"} minimum={0} maximum={250} value={this.config.k2} step={1} label={"Seed cells"} ttip={"Set the amount of seed cells"} cb={this.updateConfig}/>

			</React.Fragment>
		)
	}

	updateConfig = (key, value) => {
		this.config[key] = value;
		this.props.updateConfig(this.config);
	}
}