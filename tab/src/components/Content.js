import React, { Component } from 'react';
import Holdings from './Holdings'
import Marketplace from './Marketplace'

class Content extends Component {
	constructor(p) {	
		super(p)
	}
	render() {
		return (
			<div>
				<div className="holdings">
					<Holdings portfolio={this.props.portfolio} />
				</div>
				<div className="marketplace">
					<Marketplace portfolio={this.props.portfolio} />
				</div>
			</div>
		);
	}
}

export default Content;
