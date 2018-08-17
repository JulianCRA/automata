import React, { Component } from 'react';
import langtons_ant from './sketches/langtons-ant';
import viral_replication from './sketches/viral-replication';
import bz_reaction from './sketches/belusov-zhabotinsky';
import conways_game from './sketches/conways-game';
import forest_fire from './sketches/forest-fire';
import d_l_a from './sketches/diffusion-limited-aggregation';
import flood_fill from './sketches/flood-fill';
import P5Wrapper from './components/react-p5-wrapper';

export default class P5SketchComponent extends Component {

	state = {config:{	h:10, 
						w:10
					}
			};

	componentDidMount(props){
		this.setState({sketch: this.selectSketch(this.props.sketch)});
	}

	componentDidUpdate(prevProps){
		if(this.props.config !== prevProps.config){
			this.setState({config:this.props.config});
		}
		if(this.props.sketch !== prevProps.sketch){
			this.setState({sketch:this.selectSketch(this.props.sketch)});
		}
	}

	render() {
		return (
			<div>
			<P5Wrapper sketch={this.state.sketch} config={this.state.config}></P5Wrapper>
			<button onClick={this.pressEvent.bind(this)}>Change Sketch</button>
			</div>
		);
	}

	selectSketch(id){
		let newSketch;
		switch(id){
			case 'lant':
				newSketch = langtons_ant;
				break;
			case 'life':
				newSketch = conways_game;
				break;
			case 'fire':
				newSketch = forest_fire;
				break;
			case 'bzhr':
				newSketch = bz_reaction;
				break;
			case 'vrep':
				newSketch = viral_replication;
				break;
			case 'dlag':
				newSketch = d_l_a;
				break;
			case 'ffil':
				newSketch = flood_fill;
				break;
			default:
				newSketch = conways_game;
				break;
		}
		return newSketch;
	}

	pressEvent(){
		this.setState({config:{...this.state.config, w:this.state.config.w+10}});
	}
}
 