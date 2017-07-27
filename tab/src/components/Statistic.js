import React, { Component } from 'react';
import { Label } from 'office-ui-fabric-react'
class Statistic extends Component {
	constructor(p) {
		super(p)
	}
	render() {
		let value = `${this.props.symbol} ${this.props.value}`;
		return (
			<div className="statistic">
				<div className="statHeader">
					<span className="ms-font-xxl ms-fontWeight-regular">{this.props.header}</span>
				</div>
				<div className="statValue">
					<span className="ms-font-xl">{value}</span>
				</div>
			</div>
		);
	}
}

export default Statistic;