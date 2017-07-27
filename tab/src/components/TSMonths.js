import React, { Component } from 'react';

class TSMonths extends Component {
	constructor(p) {
		super(p)
	}
	render() {
		console.log('M', this.props.series)
		return (
			<div>
				TSMonths
			</div>
		);
	}
}

export default TSMonths;
