import React, { Component } from 'react';

import LantPanel from './panels/lant-panel';
import LifePanel from './panels/life-panel';
import FirePanel from './panels/fire-panel';
import BelusovPanel from './panels/belusov-panel';
import ViralPanel from './panels/viral-panel';
import DLAPanel from './panels/dlagg-panel';
import FloodPanel from './panels/flood-panel';

export default class SketchControlPanelComponent extends Component {
	render(){
		return (<React.Fragment>{this.selectPanel(this.props.panel)}</React.Fragment>);
	}

	selectPanel(id){
		switch(id){
			case 'lant':
				return <LantPanel updateConfig={this.props.onChange} />
			case 'life':
				return <LifePanel updateConfig={this.props.onChange} />
			case 'fire':
				return <FirePanel updateConfig={this.props.onChange} />
			case 'bzhr':
				return <BelusovPanel updateConfig={this.props.onChange} />
			case 'vrep':
				return <ViralPanel updateConfig={this.props.onChange} />
			case 'dlag':
				return <DLAPanel updateConfig={this.props.onChange} />
			case 'ffil':
				return <FloodPanel updateConfig={this.props.onChange} />
			default:
				return <LantPanel updateConfig={this.props.onChange} />
		}
	}
}