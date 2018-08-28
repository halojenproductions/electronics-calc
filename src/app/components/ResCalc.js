import React from "react";
import InputRow from "./ResCalc/InputRow"
//import ConDefs from "../../data/ControlDefinitions.json"

export default class ResCalc extends React.Component {
	state = {
		vcc: {
			value: 12,
			isCalculating: false
		},
		xd: {
			value: 1,
			isCalculating: false
		},
		vd: {
			value: 2.2,
			isCalculating: false
		},
		id: {
			value: 20,
			isCalculating: false
		},
		r: {
			value: undefined,
			isCalculating: true
		},
		vr: {
			value: undefined,
			isCalculating: true
		},
		ir: {
			value: 20,
			isCalculating: false
		},
		pr: {
			value: undefined,
			isCalculating: true
		},
		vt: {
			value: 0.7,
			isCalculating: false
		},
		hfe: {
			value: 100,
			isCalculating: false
		},
		it: {
			value: undefined,
			isCalculating: true
		},
		rb: {
			value: undefined,
			isCalculating: true
		},
		ib: {
			value: undefined,
			isCalculating: true
		},
		vb: {
			value: undefined,
			isCalculating: true
		},
		vl: {
			value: 5,
			isCalculating: false
		}
	};

	componentDidMount() {
		// Run the calculation upon loading.
		this.doRecalc(this.state);
	};

	doRecalc(state) {
		const newState = { ...state };

		console.log("Doing recalculation ");
		//console.log(this.state.r)

		// Wipe all of the autocalc fields.
		Object.keys(newState).forEach((key) => {
			if (newState[key].isCalculating) {
				newState[key].value = undefined;
			}
		});

		const round = value => Math.round(value * 100) / 100;

		const shouldCalculate = (field, ...args) => {
			if (!newState[field].isCalculating || newState[field].value !== undefined) {
				return false;
			}

			let allow = true;
			args.forEach((arg) => {
				allow = allow && (newState[arg].value !== undefined && newState[arg].value > 0);
			});
			return allow;
		};

		//// Do the calculations.
		console.log(newState);
		let DidACalculation = true;
		while (DidACalculation) {
			DidACalculation = false;
			// R
			if (shouldCalculate("r", "vr", "ir")) {
				console.log(newState.vr.value / (newState.ir.value / 1000));
				newState.r.value = newState.vr.value / (newState.ir.value / 1000);
				newState.r.value = round(newState.r.value);
				DidACalculation = true;
				console.log(newState.r.value + " " + shouldCalculate("r", "vr", "ir"));
			}
			if (shouldCalculate("r", "pr", "ir")) {
				newState.r.value = newState.pr.value / ((newState.ir.value / 1000) ^ 2);
				newState.r.value = round(newState.r.value);
				DidACalculation = true;
				//console.log(newState.r.value + " " + shouldCalculate(newState,"r", "pr", "ir"));
			}
			// Vr
			if (shouldCalculate("vr", "vcc", "vd", "xd")) {
				newState.vr.value = newState.vcc.value - (newState.vd.value * newState.xd.value);
				newState.vr.value = round(newState.vr.value);
				DidACalculation = true;
			}
			// ir
			if (shouldCalculate("ir", "hfe", "ib")) {
				newState.ir.value = newState.hfe.value * (newState.ib.value / 1000);
				newState.ir.value *= 1000;
				newState.ir.value = round(newState.ir.value);
				DidACalculation = true;
			}
			if (shouldCalculate("ir", "vr", "r")) {
				newState.ir.value = newState.vr.value / newState.r.value;
				newState.ir.value *= 1000;
				newState.ir.value = round(newState.ir.value);
				DidACalculation = true;
			}
			// Pr
			if (shouldCalculate("pr", "vr", "ir")) {
				newState.pr.value = newState.vr.value * (newState.ir.value / 1000);
				newState.pr.value *= 1000;
				newState.pr.value = round(newState.pr.value);
				DidACalculation = true;
			}
			if (shouldCalculate("pr", "r", "ir")) {
				newState.pr.value = newState.r.value * (newState.ir.value / 1000) ^ 2;
				newState.pr.value *= 1000;
				newState.pr.value = round(newState.pr.value);
				DidACalculation = true;
			}
			// It
			if (shouldCalculate("it", "vb", "rb")) {
				newState.it.value = newState.vb.value / newState.rb.value;
				newState.it.value *= 1000;
				newState.it.value = round(newState.it.value);
				DidACalculation = true;
			}
			// Rb
			if (shouldCalculate("rb", "vb", "ib")) {
				newState.rb.value = newState.vb.value / (newState.ib.value / 1000);
				newState.rb.value = round(newState.rb.value);
				DidACalculation = true;
			}
			// Ib
			if (shouldCalculate("ib", "ir", "hfe")) {
				newState.ib.value = (newState.ir.value / 1000) / newState.hfe.value;
				newState.ib.value *= 1000;
				newState.ib.value = round(newState.ib.value);
				DidACalculation = true;
			}
			// Vb
			if (shouldCalculate("vb", "vl", "vt")) {
				newState.vb.value = newState.vl.value - newState.vt.value;
				newState.vb.value = round(newState.vb.value);
				DidACalculation = true;
			}
			console.log(newState)
			//DidACalculation = false;
			//debugger;
		}
		//console.log(newState);


		this.setState(newState);
	}

	onInputChange = (name) => (value) => {
		this.doRecalc({
			...this.state,
			[name]: {
				...this.state[name],
				value
			}
		});
	};
	onAutoCalcChange = (name) => (value) => {
		this.doRecalc({
			...this.state,
			[name]: {
				...this.state[name],
				isCalculating: !value
			}
		})
	};

	renderPowerSupplySection = () => (
		<section className="PowerSupplySection">
			<span className="TabSpan input-group-text">Power supply</span>

			<InputRow
				onChange={this.onInputChange("vcc")}
				onCalcChange={this.onAutoCalcChange("vcc")}
				flavour="textbox"
				label="Vcc"
				val={this.state.vcc.value}
				suffix="V"
				canCalc={false}
				autoCalc={this.state.vcc.isCalculating}
				desc="Voltage of the power supply."
			/>
		</section>
	);

	renderLedsSection = () => {
		const inputs = [{
			id: "xd",
			flavour: "number",
			label: "✕d",
			suffix: "",
			desc: "Number of leds.",
			canCalc: false,
		}, {
			id: "vd",
			flavour: ["textbox", "led-presets"],
			label: "Vd",
			suffix: "V",
			desc: "Forward voltage drop of each led.",
			canCalc: false,
		}];

		return (
			<section className="LedsSection">
				<span className="TabSpan input-group-text">Leds</span>

				{inputs.map(input => (
					<InputRow
						key={input.id}
						onChange={this.onInputChange(input.id)}
						onCalcChange={this.onAutoCalcChange(input.id)}
						flavour={input.flavour}
						label={input.label}
						val={this.state[input.id].value}
						suffix={input.suffix}
						canCalc={input.canCalc}
						autoCalc={this.state[input.id].isCalculating}
						desc={input.desc}
					/>
				))}
			</section>
		);
	};

	renderLoadResistorSection = () => {
		const inputs = [{
			id: "r",
			flavour: "textbox",
			label: "R",
			suffix: "Ω",
			desc: "Value of the load resistor.",
			canCalc: true,
		}, {
			id: "vr",
			flavour: "textbox",
			label: "Vr",
			suffix: "V",
			desc: "Voltage drop across the load resistor.",
			canCalc: true,
		}, {
			id: "ir",
			flavour: "textbox",
			label: "Ir",
			suffix: "mA",
			desc: "Current through the load resistor.",
				canCalc: true,
		}, {
			id: "pr",
			flavour: "textbox",
			label: "Pr",
			suffix: "mW",
			desc: "Power dissipation of the load resistor.",
			canCalc: true,
		}];

		return (
			<section className="LoadResistorSection">
				<span className="TabSpan input-group-text">Load resistor</span>

				{inputs.map(input => (
					<InputRow
						key={input.id}
						onChange={this.onInputChange(input.id)}
						onCalcChange={this.onAutoCalcChange(input.id)}
						flavour={input.flavour}
						label={input.label}
						val={this.state[input.id].value}
						suffix={input.suffix}
						canCalc={input.canCalc}
						autoCalc={this.state[input.id].isCalculating}
						desc={input.desc}
					/>
				))}
			</section>
		);
	};

	renderLogicSupplySection = () => {
		const inputs = [{
			id: "vl",
			"flavour": "textbox",
			"label": "Vl",
			"val": "5",
			"suffix": "V",
			"canCalc": false,
			"desc": "Voltage of the logic supply."
		}];
		return (
			< section className="LogicSupplySection" >
				<span className="TabSpan input-group-text">Logic supply</span>

				{inputs.map(input => (
					<InputRow
						key={input.id}
						onChange={this.onInputChange(input.id)}
						onCalcChange={this.onAutoCalcChange(input.id)}
						flavour={input.flavour}
						label={input.label}
						val={this.state[input.id].value}
						suffix={input.suffix}
						canCalc={input.canCalc}
						autoCalc={this.state[input.id].isCalculating}
						desc={input.desc}
					/>
				))}
			</section >
		);
	};

	renderTransistorSection = () => {
		const inputs = [{
			id: "vt",
			"flavour": "textbox",
			"label": "Vt",
			"val": "0.7",
			"suffix": "V",
			"canCalc": false,
			"desc": "Voltage drop across the transistor."
		}, {
			id: "hfe",
			"flavour": "textbox",
			"label": "β",
			"val": "100",
			"suffix": "",
			"canCalc": false,
			"desc": "Gain factor of the transistor."
		}, {
			id: "it",
			"flavour": "textbox",
			"label": "It?",
			"val": "",
			"suffix": "mA",
			"canCalc": true,
			"desc": "Current through the transistor."
		}];
		return (
			<section className="TransistorSection">
				<span className="TabSpan input-group-text">Transistor</span>

				{inputs.map(input => (
					<InputRow
						key={input.id}
						onChange={this.onInputChange(input.id)}
						onCalcChange={this.onAutoCalcChange(input.id)}
						flavour={input.flavour}
						label={input.label}
						val={this.state[input.id].value}
						suffix={input.suffix}
						canCalc={input.canCalc}
						autoCalc={this.state[input.id].isCalculating}
						desc={input.desc}
					/>
				))}
			</section>
		);
	};

	renderBaseResistorSection = () => {
		const inputs = [{
			id: "rb",
			"flavour": "textbox",
			"label": "Rb",
			"val": "",
			"suffix": "Ω",
			"canCalc": true,
			"desc": "Value of the base resistor."
		}, {
			id: "ib",
			"flavour": "textbox",
			"label": "Ib",
			"val": "",
			"suffix": "mA",
			"canCalc": true,
			"desc": "Current through the base resistor."
		}, {
			id: "vb",
			"flavour": "textbox",
			"label": "Vb",
			"val": "",
			"suffix": "V",
			"canCalc": true,
			"desc": "Voltage drop across the base resistor."
		}];
		return (
			<section className="BaseResistorSection">
				<span className="TabSpan input-group-text">Base resistor</span>

				{inputs.map(input => (
					<InputRow
						key={input.id}
						onChange={this.onInputChange(input.id)}
						onCalcChange={this.onAutoCalcChange(input.id)}
						flavour={input.flavour}
						label={input.label}
						val={this.state[input.id].value}
						suffix={input.suffix}
						canCalc={input.canCalc}
						autoCalc={this.state[input.id].isCalculating}
						desc={input.desc}
					/>
				))}
			</section>
		);
	};

	render = () => (
		<div className="card-body" style={{
			backgroundRepeat: "no-repeat",
			height: "100%"
		}}>
			{this.renderPowerSupplySection()}
			{this.renderLedsSection()}
			{this.renderLoadResistorSection()}
			{this.renderLogicSupplySection()}
			{this.renderTransistorSection()}
			{this.renderBaseResistorSection()}
		</div>
	);
}