import React, { Component } from 'react';
import Statistic from './Statistic';
import { getStockPrice } from '../helpers/stockHelper'

class Overview extends Component {
	constructor(p) {
		super(p);
		this.state = {
			portfolio: null
		}
		this.setPortfolioValues = this.setPortfolioValues.bind(this)
	}
	componentWillReceiveProps(props) {
		if (props.portfolio && this.state.portfolio === null) {
			this.setPortfolioValues(props);
		}
	}
	setPortfolioValues(props) {
		let portfolio = {
			companies: 0,
			holdings: 0,
			available: this.props.user.CapitalRemaining,
			total: this.props.user.CapitalRemaining,
			growth: 0
		}
		if (props.portfolio.length == 0) {
			return portfolio;
		} else {
			let newHoldings = 0;
			let numStocks = props.portfolio.length;
			let portPromise = new Promise((resolve, reject) => {
				let count = 0;
				props.portfolio.map(p => {
					getStockPrice(p.Company)
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
				this.setState({
					portfolio: portfolioToReturn
				})
			})
		}
	}
	render() {
		let portfolioToReturn = this.state.portfolio;
		let dollar = "$"
		let percent = "%"
		if (this.state.portfolio == null) {
			portfolioToReturn = {
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
				<Statistic header={"Companies"} value={portfolioToReturn.companies} symbol={""} />
				<Statistic header={"Portfolio Value"} value={portfolioToReturn.holdings} symbol={dollar} />
				<Statistic header={"Available"} value={portfolioToReturn.available} symbol={dollar} />
				<Statistic header={"Growth"} value={portfolioToReturn.growth} symbol={percent} />
				<Statistic header={"Total Value"} value={portfolioToReturn.total} symbol={dollar} />
			</div>
		);
	}
}

export default Overview;