import React, { Component } from 'react';
import Statistic from './Statistic'

class Overview extends Component {
	constructor(p) {
		super(p)
		this.setPortfolioValues = this.setPortfolioValues.bind(this)
	}
	setPortfolioValues(){
		let portfolio = {
			holdings: 0,
			available: this.props.user.CapitalRemaining,
			total: this.props.user.CapitalRemaining,
			growth: 0
		}
		return portfolio;
	}
	render() {
		let portfolioToReturn = this.setPortfolioValues();
		return (
			<div>
				<Statistic header={"Holdings"} value={portfolioToReturn.holdings} symbol={"$"}/>
				<Statistic header={"Available"} value={portfolioToReturn.holdings} symbol={"$"}/>
				<Statistic header={"Growth"} value={portfolioToReturn.holdings} symbol={"%"}/>
				<Statistic header={"Total Value"} value={portfolioToReturn.holdings} symbol={"$"}/>
      		</div>
		);
	}
}

export default Overview;