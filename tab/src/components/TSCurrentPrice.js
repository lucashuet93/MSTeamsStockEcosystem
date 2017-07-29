import React, { Component } from 'react';

class TSCurrentPrice extends Component {
	constructor(p) {
		super(p)
	}
	render() {
		let colorClass = 'ms-font-xxl ms-fontWeight-regular ';
		if (this.props.growth > 0) {
			colorClass += "posGrowth"
		} else if (this.props.growth < 0) {
			colorClass += "negGrowth"
		}
		return (
			<div className="tSeriesDiv">
				<div className="timeSeriesCurrentPrice cpLeft">
					<div className="tsCurrentPriceHeader">
						<span className="ms-font-xl ">Price</span>
					</div>
					<div className="tsCurrentPriceStat">
						<span className="ms-font-xxl ms-fontWeight-regular">{this.props.price}</span>
					</div>
				</div>
				<div className="timeSeriesCurrentPrice">
					<div className="tsCurrentPriceHeader">
						<span className="ms-font-xl ">Growth %</span>
					</div>
					<div className="tsCurrentPriceStat">
						<span className={colorClass}>{this.props.growth}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default TSCurrentPrice;
