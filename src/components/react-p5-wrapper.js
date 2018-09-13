import React from "react";
import p5 from "p5";

//export default class P5Wrapper extends React.Component {
export default class P5Wrapper extends React.PureComponent {
	componentDidMount() {
		this.canvas = new p5(this.props.sketch, this.wrapper);
		if (this.canvas.customRedraw) {
			this.canvas.customRedraw(this.props.config);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.sketch !== prevProps.sketch) {
			this.canvas.remove();
			this.canvas = null;
			this.canvas = new p5(this.props.sketch, this.wrapper);
		}

		if (this.canvas.customRedraw) {
			this.canvas.customRedraw(this.props.config);
		}
		
	}

	componentWillUnmount() {
		this.canvas.remove();
	}

	render() {
		return <div ref={wrapper => (this.wrapper = wrapper)} />;
	}
}
