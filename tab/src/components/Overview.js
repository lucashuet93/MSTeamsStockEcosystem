import React, { Component } from 'react';
import Statistic from './Statistic';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMinuteTimeSeries } from '../helpers/stockHelper'

class Overview extends Component {
	constructor(p) {
		super(p);
		this.state = {
			portfolio: null,
			statistics: null
		}
		this.setPortfolioValues = this.setPortfolioValues.bind(this)
		this.updatePortfolioValues = this.updatePortfolioValues.bind(this)
	}
	componentDidMount() {
		if ((this.props.stocks.portfolio && this.state.portfolio == null)
			|| this.props.stocks.portfolio.length !== this.state.portfolio.length) {
			this.setPortfolioValues(this.props.stocks);
		}
	}
	componentWillReceiveProps(p){
		if(p.user.loggedInUser.CapitalRemaining !== this.state.statistics.CapitalRemaining){
			this.updatePortfolioValues(p.stocks, p.user.loggedInUser)
		}
	}
	calculateNumberOfCompanies(portfolio){
		let companies = [];
		portfolio.map((p) => {
			let com = p.Company.toLowerCase();
			let found = companies.find(c => c == com)
			if(!found){
				companies.push(com)
			}
		})
		return companies.length;
	}
	updatePortfolioValues(stockProps, user){
		let statistics = {
			companies: 0,
			holdings: 0,
			available: user.CapitalRemaining,
			total: user.CapitalRemaining,
			growth: (((user.CapitalRemaining - 50000) - 1 ) / 100)
		}
		if (stockProps.portfolio.length == 0) {
			this.setState({
				statistics: statistics,
				portfolio: stockProps.portfolio
			})
		} else {
			let quickStatsChange = {...this.state.statistics, companies: this.calculateNumberOfCompanies(stockProps.portfolio), available: user.CapitalRemaining.toFixed(2)}
			this.setState({
				statistics: quickStatsChange
			})
			let newHoldings = 0;
			let numStocks = stockProps.portfolio.length;
			let portPromise = new Promise((resolve, reject) => {
				let count = 0;
				stockProps.portfolio.map(p => {
					getMinuteTimeSeries(p.Company)
						.then((r) => {
							let priceHistory = r.data['Time Series (1min)']
							if (priceHistory) {
								let priceObject = priceHistory[Object.keys(priceHistory)[0]];
								let mostRecentPrice = priceObject['4. close'];
								let stockTotal = mostRecentPrice * p.NumShares;
								newHoldings += stockTotal;
							}
							count++;
							if (count == numStocks) {
								resolve(newHoldings)
							}
						})
				})

			}).then((newHoldings) => {
				let statistics = {
					companies: this.calculateNumberOfCompanies(stockProps.portfolio),
					holdings: newHoldings.toFixed(2),
					available: user.CapitalRemaining.toFixed(2),
					total: (user.CapitalRemaining + newHoldings).toFixed(2),
					growth: ((((user.CapitalRemaining + newHoldings) / 50000) - 1) * 100).toFixed(2)
				}
				this.setState({
					statistics: statistics,
					portfolio: stockProps.portfolio
				})
			})
		}
	}
	setPortfolioValues(stockProps) {
		let statistics = {
			companies: 0,
			holdings: 0,
			available: this.props.user.loggedInUser.CapitalRemaining,
			total: this.props.user.loggedInUser.CapitalRemaining,
			growth: 0
		}
		if (stockProps.portfolio.length == 0) {
			this.setState({
				statistics: statistics,
				portfolio: stockProps.portfolio
			})
		} else {
			let newHoldings = 0;
			let numStocks = stockProps.portfolio.length;
			let portPromise = new Promise((resolve, reject) => {
				let count = 0;
				stockProps.portfolio.map(p => {
					getMinuteTimeSeries(p.Company)
						.then((r) => {
							let priceHistory = r.data['Time Series (1min)']
							if (priceHistory) {
								let priceObject = priceHistory[Object.keys(priceHistory)[0]];
								let mostRecentPrice = priceObject['4. close'];
								let stockTotal = mostRecentPrice * p.NumShares;
								newHoldings += stockTotal;
							}
							count++;
							if (count == numStocks) {
								resolve(newHoldings)
							}
						})
				})

			}).then((newHoldings) => {
				let statistics = {
					companies: this.calculateNumberOfCompanies(stockProps.portfolio),
					holdings: newHoldings.toFixed(2),
					available: this.props.user.loggedInUser.CapitalRemaining.toFixed(2),
					total: (this.props.user.loggedInUser.CapitalRemaining + newHoldings).toFixed(2),
					growth: ((((this.props.user.loggedInUser.CapitalRemaining + newHoldings) / 50000) - 1) * 100).toFixed(2)
				}
				this.setState({
					statistics: statistics,
					portfolio: stockProps.portfolio
				})
			})
		}
	}
	render() {
		let statisticsToReturn = this.state.statistics;
		let dollar = "$"
		let percent = "%"
		if (this.state.statistics == null) {
			statisticsToReturn = {
				companies: "Calculating",
				holdings: "Calculating...",
				available: "Calculating...",
				total: "Calculating...",
				growth: "Calculating..."
			}
			dollar = "";
			percent = "";
		}
		return (
			<div>
				<Statistic header={"Companies"} value={statisticsToReturn.companies} symbol={""} />
				<Statistic header={"Portfolio Value"} value={statisticsToReturn.holdings} symbol={dollar} />
				<Statistic header={"Available"} value={statisticsToReturn.available} symbol={dollar} />
				<Statistic header={"Growth"} value={statisticsToReturn.growth} symbol={percent} />
				<Statistic header={"Total Value"} value={statisticsToReturn.total} symbol={dollar} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		stocks: state.stocks
	}
}
export default connect(mapStateToProps, null)(Overview);