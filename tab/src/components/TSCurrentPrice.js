import React, { Component } from 'react';

class TSCurrentPrice extends Component {
	constructor(p) {
		super(p)
	}
	render() {
		console.log('P', this.props.price)
		return (
			<div>
				TSCurrentPrice
			</div>
		);
	}
}

export default TSCurrentPrice;
