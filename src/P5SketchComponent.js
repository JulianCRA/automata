import React, { Component } from 'react';
import langtons_ant from './sketches/langtons-ant';
import viral_replication from './sketches/viral-replication';
import P5Wrapper from './components/react-p5-wrapper';

export default class P5SketchComponent extends Component {
	render() {
		return (
			<P5Wrapper sketch={viral_replication} w={20} h={20} />
		);
	}
}
