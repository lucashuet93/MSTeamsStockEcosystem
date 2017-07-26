import React, { Component } from 'react';

class Statistic extends Component {
	constructor(p) {
		super(p)
	}
	render() {
		return (
			<div className="statistic">
				<div className="statHeader">
					Header
				</div>
				<div className="statValue">
					$109.89
				</div>
			</div>
		);
	}
}

export default Statistic;