import React from "react";
import uniqueId from 'react-html-id';
import { GearIcon, LockIcon, KeyboardIcon } from 'react-octicons'
import InputControl from "./InputControl";

export default class InputRow extends React.Component {
	constructor(props) {
		super(props);
		uniqueId.enableUniqueIds(this); // Use nextUniqueId to create a new ID, and lastUniqueId to refer to the same ID again.
		//this.state = {
		//	autoCalc: props.autoCalc
		//};
	};
	getPresetList = () => {
		const LedPresets = [
			{ c: "Red", v: 1.8 },
			{ c: "Orange", v: 2.0 },
			{ c: "Yellow", v: 2.2 },
			{ c: "Green", v: 3.5 },
			{ c: "Blue", v: 3.6 },
			{ c: "White", v: 4 },
		];
		return LedPresets;
	};
	//onCalcButton() {
	//	this.setState({
	//		autoCalc: !this.state.autoCalc,
	//	});
	//};
	setValState = (v) => {
		//console.log(v);
		this.setState({
			val: v,
		});
	};

	onChange = (e) => {
		this.props.onChange(
			e.currentTarget.value === ""
				? undefined
				: parseFloat(e.currentTarget.value)
		);
	};

	onCalcChange = (e) => {
		this.props.onCalcChange(this.props.autoCalc);
	}

	onPresetChange = (value) => () => {
		this.props.onChange(value);
	};
	render() {
		var label = this.props.label;
		var labelsub = null;
		if (label.length == 2) {
			labelsub = label.slice(-1);
			label = label.substring(0, 1);
		};
		return (
			<abbr title={this.props.desc}>
				<div className="input-group">
					<div className="input-group-prepend">
						<label
							htmlFor={this.nextUniqueId()}
							className="input-group-text">
							{label}
							<span className="subtext">
								{labelsub}
							</span>
						</label>
					</div>

					{this.props.canCalc ? (
						<div className="input-group-prepend btn-group btn-group-toggle"
						data-toggle="buttons">
						<button
							className={this.props.autoCalc ? "btn btn-outline-primary active " : "btn btn-outline-primary"}
							onClick={this.onCalcChange} >
							<GearIcon className="gear" />
						</button>
						</div>
					) : null}



					{this.props.flavour.includes("led-presets") ? (
						// Add led preset ddl.
						// Todo: pull data from json. https://i.stack.imgur.com/Tuqs8.png
						<div className="input-group-prepend">
							<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
							<div className="dropdown-menu">
								{this.getPresetList().map((preset, i) => {
									return <button className="dropdown-item" id={i} key={i} href="#" onClick={this.onPresetChange(preset.v)}>{preset.c} {preset.v}V</button>
								})}
							</div>
						</div>
					) : null}

					{this.props.flavour.includes("textbox") ? (
						// Add textbox.
						//<InputControl flavour={this.props.flavour} autoCalc={this.state.autoCalc} id={this.lastUniqueId()} defVal={this.props.defVal} />
						<input
							readOnly={this.props.autoCalc}
							className="form-control text-right"
							id={this.lastUniqueId()}
							//defaultValue={this.props.defVal}
							value={this.props.val || ""}
							onChange={this.onChange}
						/>

					) : null}

					{this.props.flavour.includes("number") ? (
						// Add numeric up/down spinner.
						<input type="number" min="1" max="9" step="1"
							readOnly={this.props.autoCalc}
							className="form-control text-right"
							id={this.lastUniqueId()}
							//defaultValue={this.state.autoCalc ? "" : this.props.defVal}
							value={this.props.val || ""}
							onChange={this.onChange}
						/>
					) : null}

					<div className="input-group-append">
						<label
							htmlFor={this.lastUniqueId()}
							className="input-group-text">
							{this.props.suffix}
						</label>
					</div>
				</div>
			</abbr>
		);
	}
}