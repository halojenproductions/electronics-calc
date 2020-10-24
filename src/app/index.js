console.log("«Halojen¤Productions»");

import * as React from "react";
import { render } from "react-dom";

import "jquery";
import "bootstrap";

import Header from "./components/Header";
import ResCalc from "./components/ResCalc";
import ResChart from "./components/ResChart";
import BgBlur from "./components/Pretty/BgBlur"
import BgReflections from "./components/Pretty/BgReflections";
import PanelShadow from "./components/Pretty/PanelShadow";
import Banner from "./components/Pretty/Banner";

import '../scss/index.scss';

class Fapp extends React.Component {
	render() {
		return (
			<div className="container" >
				<div className="BgPattern" />
				{/*<BgReflections />*/}
				<div className="col">
					{/*<BgBlur />*/}
					<div className="row">
						<div className="col col-12" >
							<div className="jumbotron">
								<BgReflections panelclass={""} radius={"0.3rem"} />
								<PanelShadow panelclass={"jumbotron"} />
								<Banner />
								<Header />
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col col-12 col-md-6 col-lg-6 col-xl-6 ">
							<div className="card">
								<div className="card-header text-center">
									<h2>Resistor colour chart</h2>
								</div>
								<div className="card DropShadow" />
								<BgReflections radius={"calc(0.25rem - 1px)"} />
								<ResChart />
							</div>
						</div>
						<div className="col col-12 col-md-6 col-lg-6 col-xl-6">
							<div className="card">
								<div className="card-header text-center">
									<h2>Component value calculator</h2>
								</div>
								<div className="card DropShadow" />
								<BgReflections radius={"calc(0.25rem - 1px)"} />
								<ResCalc />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

render(<Fapp />, document.getElementById("fapp"));