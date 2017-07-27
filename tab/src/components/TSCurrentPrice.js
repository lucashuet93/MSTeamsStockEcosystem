import React, { Component } from 'react';

class TSCurrentPrice extends Component {
	constructor(p) {
		super(p)
	}
	render() {
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
						<span className="ms-font-xl ">Growth</span>
					</div>
					<div className="tsCurrentPriceStat">
						<span className="ms-font-xxl ms-fontWeight-regular">{this.props.growth}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default TSCurrentPrice;
