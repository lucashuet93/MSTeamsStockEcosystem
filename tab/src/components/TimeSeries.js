import React, { Component } from 'react';

class TimeSeries extends Component {
	constructor(p){
		super(p)
	}
	renderLoading(){
		return (
			<div>Loading</div>
		)
	}
	renderPriceInfo(){
		return (
			<div>Info Found</div>
		)
	}
	render() {
		let allPriceInfo = this.props.currentPrice && this.props.dailyTimeSeries && this.props.monthlyTimeSeries ? true : false;
		if(allPriceInfo === true){
			console.log('TS', this.props)
		}
		return (
			<div>
				{allPriceInfo === true ? this.renderPriceInfo() : this.renderLoading()}
      		</div>
		);
	}
}

export default TimeSeries;