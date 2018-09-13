import React, { Component } from 'react';

import InputRange from '../InputRange';

export default class LantPanel extends Component {
	constructor(props){
		super(props);
		this.config = {	w: 50,
						h: 50 };
	}

	componentDidMount(){
		this.props.updateConfig(this.config);
	}

	render(){
		return(
			<React.Fragment>
				<InputRange attr={"w"} minimum={10} maximum={300} value={this.config.w} label={"Columns"} ttip={"Set the number of columns"} cb={this.updateConfig}/>
				<InputRange attr={"h"} minimum={10} maximum={300} value={this.config.h} label={"Rows"} ttip={"Set the number of rows"} cb={this.updateConfig}/>
			</React.Fragment>
		)
	}

	updateConfig = (key, value) => {
		this.config[key] = value;
		this.props.updateConfig(this.config);
	}
}