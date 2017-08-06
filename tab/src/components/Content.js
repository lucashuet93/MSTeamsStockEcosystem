import React, { Component } from 'react';
import MyPortfolio from './MyPortfolio'
import Marketplace from './Marketplace'

class Content extends Component {
	constructor(p) {	
		super(p)
	}
	render() {
		return (
			<div>
				<div className="holdings">
					<MyPortfolio />
				</div>
			</div>
		);
	}
}

export default Content;
