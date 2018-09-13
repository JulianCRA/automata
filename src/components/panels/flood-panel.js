import React, { Component } from 'react';

import InputRange from '../InputRange';
import InputCheckBox from '../InputCheckBox';

export default class FloodPanel extends Component {
	constructor(props){
		super(props);
		this.config = {	w:50, 
						h:50, 
						s:false, 
						
						e:true,
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
				<InputCheckBox attr={"s"} defaultChecked={this.config.s} label={"Display origins"} ttip={"Choose whether to display the origin points of the regions."} cb={this.updateConfig}/>

				<InputCheckBox attr={"e"} defaultChecked={this.config.e} label={"Eucliean distances"} ttip={"Choose whether to use Euclidean or Manhattan distance."} cb={this.updateConfig}/>
				<InputRange attr={"q"} minimum={1} maximum={256} value={this.config.q} step={1} label={"Regions"} ttip={"Set the amount of regions to display."} cb={this.updateConfig}/>
			</React.Fragment>
		)
	}

	updateConfig = (key, value) => {
		this.config[key] = value;
		this.props.updateConfig(this.config);
	}
}