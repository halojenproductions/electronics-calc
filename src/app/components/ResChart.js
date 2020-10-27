import React from "react";
import ResistorColourColumn from "./ResChart/ResistorColourColumn";

export default class ResChart extends React.Component {
	state = {
		selectedValues: [1, 0, 2],
		total: "",
		showTotal: true
	};

	componentDidMount() {
		// Run the calculation upon loading.
		let newState = { ...this.state };
		this.recalculate(newState);
		this.setState(newState);
	};

	onSelectionChange = (band, number) => {
		//console.log("Band " + band + ", Value " + number);

		let newState = { ...this.state };
		newState.selectedValues[band] = parseInt(number);
		newState.showTotal = false;

		setTimeout(() => {
			// We don't want the new total to display until
			// the transition has finished.
			this.recalculate(newState);
			newState.showTotal = true;
			this.setState(newState);
		}, 500);

		this.setState(newState);
		//console.log(newState);
	};

	recalculate(newState) {
		let total = (10 * this.state.selectedValues[0]) + this.state.selectedValues[1];
		//total = total * (10 ^ this.state.selectedValues[2]);
		total = total * Math.pow(10, this.state.selectedValues[2]);

		let symbol = "Ω";
		if (total >= 1000) {
			symbol = "K";
			total /= 1000;
		}
		if (total >= 1000) {
			symbol = "M";
			total /= 1000;
		}
		if (total >= 1000) {
			symbol = "G";
			total /= 1000;
		}

		total = total.toString(); // Because js will let me just do this.

		if (total.indexOf(".") > 0) {
			total = total.replace(".", symbol);
		} else {
			total += symbol;
		}

		newState.total = total;
	}

	render() {
		return (
			<React.Fragment>
				<div className="card-body">
					<div className="row justify-content-center">
						<ResistorColourColumn onChange={this.onSelectionChange} band={0} value={this.state.selectedValues[0]} />
						<ResistorColourColumn onChange={this.onSelectionChange} band={1} value={this.state.selectedValues[1]} />
						<ResistorColourColumn onChange={this.onSelectionChange} band={2} value={this.state.selectedValues[2]} />
					</div>
				</div>

				<div className="card-footer">
					<h3 className={"text-center LargeResistanceDisplay " + (this.state.showTotal ? "show" : null)}>{this.state.total}</h3>
				</div>
			</React.Fragment>
		);
	}
}