import React, { Component } from 'react';
import Statistic from './Statistic';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMinuteTimeSeries } from '../helpers/stockHelper'
import { updateStatistics } from '../actions';

class Overview extends Component {
	constructor(p) {
		super(p);
		this.setPortfolioValues = this.setPortfolioValues.bind(this)
	}
	componentWillUpdate(){
		//need to call setPortfolio values here
	}
	setPortfolioValues(props) {
		let portfolio = {
			companies: 0,
			holdings: 0,
			available: this.props.user.loggedInUser.CapitalRemaining,
			total: this.props.user.loggedInUser.CapitalRemaining,
			growth: 0
		}
		if (props.portfolio.length == 0) {
			this.props.updateStatistics(portfolio)
		} else {
			let newHoldings = 0;
			let numStocks = props.portfolio.length;
			let portPromise = new Promise((resolve, reject) => {
				let count = 0;
				props.portfolio.map(p => {
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
				let portfolioToReturn = {
					companies: numStocks,
					holdings: newHoldings.toFixed(2),
					available: props.user.CapitalRemaining.toFixed(2),
					total: (props.user.CapitalRemaining + newHoldings).toFixed(2),
					growth: ((((props.user.CapitalRemaining + newHoldings) / 50000) - 1) * 100).toFixed(2)
				}
				this.props.updateStatistics(portfolioToReturn)
			})
		}
	}
	render() {
		console.log('P', this.props)
		let statsToReturn;
		let dollar = "$"
		let percent = "%"
		if (!this.props.portfolio || this.props.portfolio.statistics == null) {
			statsToReturn = {
				companies: "Calculating",
				holdings: "Calculating...",
				available: "Calculating...",
				total: "Calculating...",
				growth: "Calculating..."
			}
			dollar = "";
			percent = "";
		} else {
			statsToReturn = this.props.portfolio.statistics;
		}
		return (
			<div>
				<Statistic header={"Companies"} value={statsToReturn.companies} symbol={""} />
				<Statistic header={"Portfolio Value"} value={statsToReturn.holdings} symbol={dollar} />
				<Statistic header={"Available"} value={statsToReturn.available} symbol={dollar} />
				<Statistic header={"Growth"} value={statsToReturn.growth} symbol={percent} />
				<Statistic header={"Total Value"} value={statsToReturn.total} symbol={dollar} />
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateStatistics: updateStatistics
	}, dispatch)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		portfolio: state.portfolio
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Overview);