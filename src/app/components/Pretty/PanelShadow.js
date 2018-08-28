import React from "react";
//import {render} from "react-dom";

export default class PanelShadow extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div className={"DropShadow " + this.props.panelclass}></div>
		);
	}
}