import React, { Component } from 'react';

class Statistic extends Component {
	constructor(p) {
		super(p)
	}
	render() {
		let value = `${this.props.symbol} ${this.props.value}`
		return (
			<div className="statistic">
				<div className="statHeader">
					{this.props.header}
				</div>
				<div className="statValue">
					{value}
				</div>
			</div>
		);
	}
}

export default Statistic;