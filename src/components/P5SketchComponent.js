import React, { Component } from 'react';
import langtons_ant from '../sketches/langtons-ant';
import viral_replication from '../sketches/viral-replication';
import bz_reaction from '../sketches/belusov-zhabotinsky';
import conways_game from '../sketches/conways-game';
import forest_fire from '../sketches/forest-fire';
import d_l_a from '../sketches/diffusion-limited-aggregation';
import flood_fill from '../sketches/flood-fill';
import P5Wrapper from './react-p5-wrapper';

export default class P5SketchComponent extends Component {
	render(){
		return (<P5Wrapper sketch={this.selectSketch(this.props.sketch)} config={this.props.config}></P5Wrapper>);
	}

	selectSketch(id){
		switch(id){
			case 'lant':
				return langtons_ant;
			case 'life':
				return conways_game;
			case 'fire':
				return forest_fire;
			case 'bzhr':
				return bz_reaction;
			case 'vrep':
				return viral_replication;
			case 'dlag':
				return d_l_a;
			case 'ffil':
				return flood_fill;
			default:
				return conways_game;
		}
	}
}
 