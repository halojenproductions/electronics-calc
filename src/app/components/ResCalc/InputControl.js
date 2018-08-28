import React from "react";
//import {render} from "react-dom";

export default class InputControl extends React.Component {
	render() {
		return (
			<input
				readOnly={this.props.calc}
				className="form-control text-right"
				id={this.props.id}
				defaultValue={this.props.calc ? "" : this.props.defVal}
			/>
		);
	}
}
export class InputControl2 extends React.Component {
	render() {
		return (
			<div>2</div>
		);
	}
}