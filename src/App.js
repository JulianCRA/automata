import React, { Component } from 'react';
import langtons_ant from './sketches/langtons-ant';
import P5Wrapper from 'react-p5-wrapper';



class P5SketchComponent extends Component {
  
  render() {
    return (
      <div className="App">
        <P5Wrapper sketch={langtons_ant} /*w={6} h={6}*//>
        
      </div>
    );
  }
}

export default P5SketchComponent;
