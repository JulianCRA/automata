import React, { Component } from 'react';

import InputRange from '../InputRange';
import InputCheckBox from '../InputCheckBox';

export default class BelusovPanel extends Component {
	constructor(props){
		super(props);
		this.config = {	w:150, 
						h:150, 
						t:false, 
						d:2,
						n:32,
						seed:4,
						k1:4,
						k2:1,
						g:10 };
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

				<InputRange attr={"d"} minimum={1} maximum={10} value={this.config.d} step={1} label={"Neighborhood distance"} ttip={"Set the distance of the Moore neightborhood. Higher values will make the algorithm more resource-intensive."} cb={this.updateConfig}/>
				<InputRange attr={"n"} minimum={2} maximum={128} value={this.config.n} step={1} label={"States"} ttip={"Set the number of states that every cell can have."} cb={this.updateConfig}/>
				<InputRange attr={"seed"} minimum={1} maximum={256} value={this.config.seed} step={1} label={"Initial cells"} ttip={"Set the number seed cells."} cb={this.updateConfig}/>
				<InputRange attr={"k1"} minimum={1} maximum={128} value={this.config.k1} step={1} label={"k1"} ttip={"Set the value of the k1 variable."} cb={this.updateConfig}/>
				<InputRange attr={"k2"} minimum={1} maximum={128} value={this.config.k2} step={1} label={"k2"} ttip={"Set the value of the k2 variable."} cb={this.updateConfig}/>
				<InputRange attr={"g"} minimum={1} maximum={256} value={this.config.g} step={1} label={"g"} ttip={"Set the value of the g variable."} cb={this.updateConfig}/>
			</React.Fragment>
		)
	}

	updateConfig = (key, value) => {
		this.config[key] = value;
		this.props.updateConfig(this.config);
	}
}