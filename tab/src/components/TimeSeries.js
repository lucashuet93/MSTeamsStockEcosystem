import React, { Component } from 'react';
import { Spinner, SpinnerSize, Pivot, PivotItem, Label } from 'office-ui-fabric-react'
import TSCurrentPrice from './TSCurrentPrice'
import TSDays from './TSDays'
import TSMonths from './TSMonths'


class TimeSeries extends Component {
	constructor(p) {
		super(p)
	}
	renderLoading() {
		if (this.props.searching == true) {
			return (
				<div>
					<Spinner
						size={SpinnerSize.large}
						label="Loading Stock Info"
						className="ms-font-m loadingSpinner"
					/>
				</div>
			)
		} else {
			return (
				<div>
				</div>
			)
		}
	}
	renderPriceInfo() {
		let keys = Object.keys(this.props.dailyTimeSeries);
		let yesterday = this.props.dailyTimeSeries[keys[1]];
		let yesterdayClose = yesterday['4. close']
		let growth = (((this.props.currentPrice / yesterdayClose) - 1) * 100).toFixed(2)
		return (
			<div className="timeSeriesContent">
				<Pivot >
					<PivotItem linkText='Today'>
						<TSCurrentPrice price={this.props.currentPrice} growth={growth}/>
					</PivotItem>
					<PivotItem linkText='Last 7 Days'>
						<TSDays series={this.props.dailyTimeSeries} />
					</PivotItem>
					<PivotItem linkText='Last 12 Months'>
						<TSMonths series={this.props.monthlyTimeSeries} />
					</PivotItem>
				</Pivot>
			</div>
		)
	}
	render() {
		let allPriceInfo = this.props.currentPrice && this.props.dailyTimeSeries && this.props.monthlyTimeSeries ? true : false;
		return (
			<div>
				{allPriceInfo === true ? this.renderPriceInfo() : this.renderLoading()}
			</div>
		);
	}
}

export default TimeSeries;