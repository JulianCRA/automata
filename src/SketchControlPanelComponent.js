import React, { Component } from 'react';

import InputRange from './components/InputRange';
import InputCheckBox from './components/InputCheckBox';

import uuid from 'uuid';

export default class SketchControlPanelComponent extends Component {
	constructor(props){
		super(props);
		this.config = {};
	}

	render(){
		console.log("RENDER");
		this.props.setInitial(this.config);
		return (<React.Fragment>{this.selectPanel(this.props.panel)}</React.Fragment>);
	}

	componentDidMount(){
		console.log("CICMOUNT");
		this.props.setInitial(this.config);
	}

	selectPanel(id){
		let newPanel = [];
		
		switch(id){
			
			case 'lant':
				newPanel.push(<InputRange key={uuid.v4()} attr={"w"} minimum={10} maximum={300} value={50} label={"Columns"} ttip={"Set the number of columns"} cb={this.props.onChange}/>);
				newPanel.push(<InputRange key={uuid.v4()} attr={"h"} minimum={10} maximum={300} value={50} label={"Rows"} ttip={"Set the number of rows"} cb={this.props.onChange}/>);
				this.config = {w:50, h:50};
			break;
			case 'life':
				newPanel.push(<InputRange key={uuid.v4()} attr={"w"} minimum={20} maximum={300} value={50} label={"Columns"} ttip={"Set the number of columns"} cb={this.props.onChange}/>);
				newPanel.push(<InputRange key={uuid.v4()} attr={"h"} minimum={20} maximum={300} value={50} label={"Rows"} ttip={"Set the number of rows"} cb={this.props.onChange}/>);
				newPanel.push(<InputCheckBox key={uuid.v4()} attr={"t"} defaultChecked={false} label={"Toroidal"} ttip={"Choose whether the algorithm should work as a plane or as a toroid."} cb={this.props.onChange}/>);
				newPanel.push(<InputRange key={uuid.v4()} attr={"s"} minimum={1} maximum={100} value={10} label={"Percentage of alive cells"} ttip={"Set the number of cells that are \"alive\" when the algorithm starts"} cb={this.props.onChange}/>);
				this.config = {w:50, h:50, t:false, s:10};
			break;
			case 'fire':
				newPanel.push(<InputRange key={uuid.v4()} attr={"w"} minimum={20} maximum={300} label={"Columns"} ttip={"Set the number of columns"} cb={this.props.onChange}/>);
				newPanel.push(<InputRange key={uuid.v4()} attr={"h"} minimum={20} maximum={300} label={"Rows"} ttip={"Set the number of rows"} cb={this.props.onChange}/>);
				newPanel.push(<InputCheckBox key={uuid.v4()} attr={"t"} defaultChecked={false} label={"Toroidal"} ttip={"Choose whether the algorithm should work as a plane or as a toroid."} cb={this.props.onChange}/>);
				newPanel.push(<InputCheckBox key={uuid.v4()} defaultChecked={false} label={"Random combustion"} ttip={"Choose whether the algorithm should start combustion randomly or not."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={0} maximum={100} value={0.000001} step={0.0000001} label={"Probability of combustion"} ttip={"Set the probability of \"spontaneous\" combustion."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={0} maximum={100} value={40} step={0.01} label={"Chance of resisting combustion"} ttip={"Set the \"fire resistance\" rate."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={0} maximum={100} value={0.005} step={0.00001} label={"Gremination rate"} ttip={"Set the germination rate."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={0} maximum={100} value={0.00000001} step={0.000000001} label={"Soil recovery rate"} ttip={"Set the recovery rate for the soil. Grows exponentially."} />);
			break;
			case 'bzhr':
				newPanel.push(<InputRange key={uuid.v4()} attr={"w"} minimum={20} maximum={300} label={"Columns"} ttip={"Set the number of columns"} cb={this.props.onChange}/>);
				newPanel.push(<InputRange key={uuid.v4()} attr={"h"} minimum={20} maximum={300} label={"Rows"} ttip={"Set the number of rows"} cb={this.props.onChange}/>);
				newPanel.push(<InputCheckBox key={uuid.v4()} attr={"t"} defaultChecked={false} label={"Toroidal"} ttip={"Choose whether the algorithm should work as a plane or as a toroid."} cb={this.props.onChange}/>);
				newPanel.push(<InputRange key={uuid.v4()} minimum={1} maximum={10} value={2} step={1} label={"Neightborhood distance"} ttip={"Set the distance of the Moore neightborhood. Higher values will make the algorithm more resource-intensive."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={2} maximum={128} value={32} step={1} label={"States"} ttip={"Set the number of states that every cell can have."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={1} maximum={128} value={4} step={1} label={"k1"} ttip={"Set the value of the k1 variable."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={1} maximum={128} value={1} step={1} label={"k2"} ttip={"Set the value of the k2 variable."} />);
				newPanel.push(<InputRange key={uuid.v4()} minimum={1} maximum={256} value={10} step={1} label={"g"} ttip={"Set the value of the g variable."} />);
			break;
			case 'vrep':
				//newPanel = viral_replication;
			break;
			/*case 'dlag':
				newPanel = d_l_a;
				break;
			case 'ffil':
				newPanel = flood_fill;
				break;
			default:
				newPanel = conways_game;
				break;*/
		}
		return newPanel;
	}
}