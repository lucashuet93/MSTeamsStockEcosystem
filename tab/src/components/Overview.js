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
	componentWillReceiveProps(props){
		if(props.portfolio && this.state.portfolio === null){
			this.setPortfolioValues(props);
		}
	}
	setPortfolioValues(props) {
		let portfolio = {
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
					console.log('OBJ', p)
					getStockPrice(p.Company)
						.then((r) => {
							let priceHistory = r.data['Time Series (1min)']
							if (priceHistory) {
								let priceObject = priceHistory[Object.keys(priceHistory)[0]];
								let mostRecentPrice = priceObject['4. close'];
								let stockTotal = mostRecentPrice * p.NumShares;
								newHoldings += stockTotal;
								console.log(newHoldings)
							}
							count++;
							if (count == numStocks) {
								resolve(newHoldings)
							}
						})
				})

			}).then((newHoldings) => {
				let portfolioToReturn = {
					holdings: newHoldings,
					available: props.user.CapitalRemaining,
					total: props.user.CapitalRemaining + newHoldings,
					growth: (((props.user.CapitalRemaining + newHoldings) / 50000) - 1) * 100
				}
				this.setState({
					portfolio: portfolioToReturn
				})
			})
		}
	}
	render() {
		let portfolioToReturn = this.state.portfolio;
		if (this.state.portfolio == null) {
			portfolioToReturn = {
				holdings: 0,
				available: this.props.user.CapitalRemaining,
				total: this.props.user.CapitalRemaining,
				growth: 0
			}
		}
		return (
			<div>
				<Statistic header={"Holdings"} value={portfolioToReturn.holdings.toFixed(2)} symbol={"$"} />
				<Statistic header={"Available"} value={portfolioToReturn.available.toFixed(2)} symbol={"$"} />
				<Statistic header={"Growth"} value={portfolioToReturn.growth.toFixed(2)} symbol={"%"} />
				<Statistic header={"Total Value"} value={portfolioToReturn.total.toFixed(2)} symbol={"$"} />
			</div>
		);
	}
}

export default Overview;