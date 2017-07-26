import React, { Component } from 'react';
import Operations from './Operations'
import TimeSeries from './TimeSeries'

class Marketplace extends Component {
	constructor(p) {	
		super(p)
	}
	render() {
		return (
			<div>
				<div className="market marketSearch">
					SearchBar
				</div>
				<div className="market marketTimeSeries">
					<TimeSeries />
				</div>
				<div className="market marketOperations">
					<Operations portfolio={this.props.portfolio}/>
				</div>
			</div>
		);
	}
}

export default Marketplace;