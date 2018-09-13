import React, { Component } from 'react';

import LantPanel from './components/panels/lant-panel';
import LifePanel from './components/panels/life-panel';
import FirePanel from './components/panels/fire-panel';
import BelusovPanel from './components/panels/belusov-panel';
import ViralPanel from './components/panels/viral-panel';
import DLAPanel from './components/panels/dlagg-panel';
import FloodPanel from './components/panels/flood-panel';

export default class SketchControlPanelComponent extends Component {
	render(){
		return (<React.Fragment>{this.selectPanel(this.props.panel)}</React.Fragment>);
	}

	selectPanel(id){
		let newPanel;
		
		switch(id){
			case 'lant':
				newPanel = <LantPanel updateConfig={this.props.onChange} />
			break;
			case 'life':
				newPanel = <LifePanel updateConfig={this.props.onChange} />
			break;
			case 'fire':
				newPanel = <FirePanel updateConfig={this.props.onChange} />
			break;
			case 'bzhr':
				newPanel = <BelusovPanel updateConfig={this.props.onChange} />
			break;
			case 'vrep':
				newPanel = <ViralPanel updateConfig={this.props.onChange} />
			break;
			case 'dlag':
				newPanel = <DLAPanel updateConfig={this.props.onChange} />
			break;
			case 'ffil':
				newPanel = <FloodPanel updateConfig={this.props.onChange} />
			break;
			default:
				newPanel = <LantPanel updateConfig={this.props.onChange} />
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