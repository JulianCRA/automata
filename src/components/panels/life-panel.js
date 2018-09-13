import React, { Component } from 'react';

import InputRange from '../InputRange';
import InputCheckBox from '../InputCheckBox';

export default class LifePanel extends Component {
	constructor(props){
		super(props);
		this.config = {	w:50, 
						h:50, 
						t:false, 
						s:10 };
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
				<InputRange kattr={"s"} minimum={1} maximum={100} value={this.config.s} label={"Percentage of alive cells"} ttip={"Set the number of cells that are \"alive\" when the algorithm starts"} cb={this.updateConfig}/>
			</React.Fragment>
		)
	}

	updateConfig = (key, value) => {
		this.config[key] = value;
		this.props.updateConfig(this.config);
	}
}