import React, { Component } from 'react';
import Operations from './Operations'
import TimeSeries from './TimeSeries'
import { SearchBox } from 'office-ui-fabric-react'
import { getMinuteTimeSeries, getDailyTimeSeries, getMonthlyTimeSeries } from '../helpers/stockHelper'

class Marketplace extends Component {
	constructor(p) {
		super(p);
		this.state = {
			searchValue: "",
			currentPrice: null,
			monthlyTimeSeries: null,
			dailyTimeSeries: null,
			searching: false
		}
		this.onChange = this.onChange.bind(this)
		this.onSearch = this.onSearch.bind(this)
	}
	onChange(newValue) {
		let lcString = newValue.toLowerCase();
		this.setState({
			searchValue: lcString
		})
	}
	onSearch(company) {
		this.setState({
			searching: true,
			currentPrice: null,
			monthlyTimeSeries: null,
			dailyTimeSeries: null
		})
		getMinuteTimeSeries(company)
			.then((r) => {
				let priceHistory = r.data['Time Series (1min)']
				let priceObject = priceHistory[Object.keys(priceHistory)[0]];
				let mostRecentPrice = priceObject['4. close'];
				let currentPrice = parseFloat(mostRecentPrice).toFixed(2);
				this.setState({
					currentPrice: currentPrice
				})
				if(this.state.currentPrice !== null && this.state.monthlyTimeSeries !== null && this.state.dailyTimeSeries !== null){
					this.setState({
						searching: false
					})
				}
			})
		getDailyTimeSeries(company)
			.then((r) => {
				let priceHistory = r.data['Time Series (Daily)']
				this.setState({
					dailyTimeSeries: priceHistory
				})
				if(this.state.currentPrice !== null && this.state.monthlyTimeSeries !== null && this.state.dailyTimeSeries !== null){
					this.setState({
						searching: false
					})
				}
			})
		getMonthlyTimeSeries(company)
			.then((r) => {
				let priceHistory = r.data['Monthly Time Series']
				this.setState({
					monthlyTimeSeries: priceHistory
				})
				if(this.state.currentPrice !== null && this.state.monthlyTimeSeries !== null && this.state.dailyTimeSeries !== null){
					this.setState({
						searching: false
					})
				}
			})
	}
	render() {
		return (
			<div>
				<div className="market marketSearch">
					<SearchBox
						className="ms-font-m-plus"
						onChange={(newValue) => this.onChange(newValue)}
						onSearch={(newValue) => this.onSearch(newValue)}
					/>
				</div>
				<div className="market marketTimeSeries">
					<TimeSeries searching={this.state.searching} currentPrice={this.state.currentPrice} dailyTimeSeries={this.state.dailyTimeSeries} monthlyTimeSeries={this.state.monthlyTimeSeries}/>
				</div>
				<div className="market marketOperations">
					<Operations portfolio={this.props.portfolio} />
				</div>
			</div>
		);
	}
}

export default Marketplace;