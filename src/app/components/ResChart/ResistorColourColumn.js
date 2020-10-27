import cn from "classnames";
import React from "react";

export default class ResistorColourColumn extends React.Component {
	onChange = (value) => () => {
		//console.log("Column got " + value);
		this.props.onChange(this.props.band, value);
	};

	renderColours = () => {
		const colours = [];

		for (let i = 0; i <= 9; i += 1) {
			colours.push(
				<span
					className={cn(
						"Band",
						`Band-${i}`,
						{ "active": i === this.props.value }
					)}
					key={i}
				>
					<button onClick={this.onChange(i)}>
						{i}
					</button>
				</span>
			);
		}

		return colours;
	};

	render = () => (
		<React.Fragment>
			<div className="col col-3 Shadow">
				<div
					className="SelectionFrame"
					style={{
						transform: `translate3d(0,${this.props.value * 100}%,  0)`
					}}
				/>

				{this.renderColours()}
			</div>
		</React.Fragment>
	);
}



/*
So
< Component onSomething = { this.onSomething("bar") } />

	Then inside that you can go:
<Child onSomething={this.props.onSomething} />
*/