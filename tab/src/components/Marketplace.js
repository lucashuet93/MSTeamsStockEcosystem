import React, { Component } from 'react';
import Operations from './Operations'
import TimeSeries from './TimeSeries'

class Marketplace extends Component {
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
					<Operations />
				</div>
			</div>
		);
	}
}

export default Marketplace;