import React, { Component } from 'react';
import Statistic from './Statistic'

class Overview extends Component {
	constructor(p) {
		super(p)
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<Statistic />
				<Statistic />
				<Statistic />
				<Statistic />
      		</div>
		);
	}
}

export default Overview;