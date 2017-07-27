import React, { Component } from 'react';
import { Spinner, SpinnerSize, Pivot, PivotItem, Label } from 'office-ui-fabric-react'
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
		return (
			<div className="timeSeriesContent">
				<Pivot >
					<PivotItem linkText='Current'>
					</PivotItem>
					<PivotItem linkText='Last 7 Days'>
					</PivotItem>
					<PivotItem linkText='Last 12 Months'>
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