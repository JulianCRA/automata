import React, { Component } from 'react';

import InputRange from '../InputRange';
import InputCheckBox from '../InputCheckBox';

export default class FirePanel extends Component {
	constructor(props){
		super(props);
		this.config = {	w:150, 
						h:150, 
						t:false, 
						autocomb:false,
						comb:0.000001,
						res:40,
						ger:0.005,
						rec:0.00000001 };
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

				<InputCheckBox attr={"autocomb"} defaultChecked={this.config.autocomb} label={"Random combustion"} ttip={"Choose whether the algorithm should start combustion randomly or not."} cb={this.updateConfig}/>
				<InputRange attr={"comb"} minimum={0} maximum={100} value={this.config.comb} step={0.0000001} label={"Probability of combustion"} ttip={"Set the probability of \"spontaneous\" combustion."} cb={this.updateConfig}/>
				<InputRange attr={"res"} minimum={0} maximum={100} value={this.config.res} step={0.01} label={"Chance of resisting combustion"} ttip={"Set the \"fire resistance\" rate."} cb={this.updateConfig}/>
				<InputRange attr={"ger"} minimum={0} maximum={100} value={this.config.ger} step={0.00001} label={"Germination rate"} ttip={"Set the germination rate."} cb={this.updateConfig}/>
				<InputRange attr={"rec"} minimum={0} maximum={100} value={this.config.rec} step={0.000000001} label={"Soil recovery rate"} ttip={"Set the recovery rate for the soil. Grows exponentially."} cb={this.updateConfig}/>
			</React.Fragment>
		)
	}

	updateConfig = (key, value) => {
		this.config[key] = value;
		this.props.updateConfig(this.config);
	}
}