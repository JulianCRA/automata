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
	render() {
		return (
			<P5Wrapper sketch={flood_fill} w={30} h={30} q={40} s={false} e={false}></P5Wrapper>
		);
	}
}
 