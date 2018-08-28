import React from "react";
import uniqueId from 'react-html-id';

export default class BgReflections extends React.Component {
	constructor(props) {
		super(props);
		uniqueId.enableUniqueIds(this); // Use nextUniqueId to create a new ID, and lastUniqueId to refer to the same ID again.
		this.state = {
			xOffset: (-500 + Math.random() * 1000) // Offset the reflections/gradients for each panel by a random amount so they look more natural.
		}
	} render() {
		return (
			<React.Fragment>
				<svg /*viewBox="0 0 1 1"*/ className={"BgReflections "/* + this.props.panelclass*/} preserveAspectRatio="none">
					<defs>
						<filter id="aoeufilter" /*id={"Filter" + this.nextUniqueId()}*/>
							<feGaussianBlur stdDeviation="10" result="blur" />
						</filter>
						<linearGradient /*id="Reflections"*/ id={"Gradient" + this.lastUniqueId()}
							gradientUnits="userSpaceOnUse"
							x1="0" y1="0" x2="1000" y2="0"
							gradientTransform={"rotate(-45) translate(" + this.state.xOffset + " 0)"}
							spreadMethod="repeat"
						>
							<stop className="dark" offset="0%" />
							<stop className="light" offset="2%" />
							<stop className="light" offset="6%" />
							<stop className="dark" offset="8%" />
							<stop className="dark" offset="10%" />
							<stop className="light" offset="12%" />
							<stop className="light" offset="30%" />
							<stop className="dark" offset="33%" />
							<stop className="light" offset="45%" />
							<stop className="light" offset="49%" />
							<stop className="dark" offset="50%" />
							<stop className="dark" offset="65%" />
							<stop className="light" offset="68%" />
							<stop className="light" offset="71%" />
							<stop className="dark" offset="75%" />
							<stop className="dark" offset="82%" />
							<stop className="light" offset="85%" />
							<stop className="light" offset="88%" />
							<stop className="dark" offset="91%" />
							<stop className="dark" offset="96%" />
							<stop className="dark" offset="100%" />
						</linearGradient>
					</defs>
					<rect x="0" y="0" width="100%" height="100%" /*fill="url(#Reflections)"*/ fill={"url(#Gradient" + this.lastUniqueId()+")"} /*filter="url(#BgFilter)"*/
						rx={this.props.radius} ry={this.props.radius} />
				</svg>
			</React.Fragment>
		);
	}
}