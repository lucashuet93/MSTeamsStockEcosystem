import React, { Component } from 'react';
import { getPortfolio, buyNewShares, sellAllShares, updateUserCapital, updateShares } from '../helpers/apiHelper'
import { TextField, Button, Dropdown } from 'office-ui-fabric-react'

class Operations extends Component {
	constructor(p) {
		super(p)
		this.state = {
			operationKey: "BUY",
			shares: 0,
			orderTotal: 0.00,
		}
		this.order = this.order.bind(this)
		this.sharesChanged = this.sharesChanged.bind(this)
		this.operationChanged = this.operationChanged.bind(this)
	}
	sharesChanged(text) {
		let numShares = text;
		let total = (numShares * this.props.currentPrice).toFixed(2)
		this.setState({
			shares: numShares,
			orderTotal: total
		})
	}
	operationChanged(obj) {
		this.setState({
			operationKey: obj.text
		})
	}
	order() {
		if (this.state.operationKey == 'BUY') {
			let capitalRemaining = this.props.user.CapitalRemaining - parseInt(this.state.orderTotal);
			if (capitalRemaining >= 0) {
				buyNewShares(this.props.user.Id, this.props.company, parseInt(this.state.shares), this.props.currentPrice)
					.then((r) => {
						updateUserCapital(this.props.user.Id, capitalRemaining)
							.then((r) => {
								this.setState({
									operationKey: "BUY",
									shares: 0,
									orderTotal: 0.00,
								})
							})
					})

			} else {
				console.log('error - insufficient funds')
				//insufficient funds error
			}
		} else {
			let amount = parseInt(this.state.shares)
			let totalPrice = this.props.currentPrice * amount;
			let capitalRemaining = this.props.user.CapitalRemaining + parseInt(this.state.orderTotal);
			let stockFound = this.props.currentPortfolio.find(p => p.Company.toLowerCase() === this.props.company);
			if (!stockFound) {
				console.log('error - no stock in company')
			} else if (stockFound.NumShares < amount) {
				console.log('error - insufficient shares')
			} else if (stockFound.NumShares == amount) {
				sellAllShares(this.props.user.Id, this.props.company)
					.then((r) => {
						updateUserCapital(this.props.user.Id, capitalRemaining)
							.then((r) => {
								console.log('sold all shares')
								this.setState({
									operationKey: "BUY",
									shares: 0,
									orderTotal: 0.00,
								})
							})
					})
			} else {
				let prevNumShares = stockFound.NumShares;
				let newNumShares = prevNumShares - amount;
				updateShares(this.props.user.Id, this.props.company, newNumShares, stockFound.SharePrice)
					.then((r) => {
						updateUserCapital(this.props.user.Id, capitalRemaining)
							.then((r) => {
								console.log('sold some shares')
								this.setState({
									operationKey: "BUY",
									shares: 0,
									orderTotal: 0.00,
								})
							})
					})
			}
		}
	}
	render() {
		let vals = ["BUY", "SELL"]
		let options = vals.map(v => {
			return {
				key: v,
				text: v
			}
		})
		return (
			<div className="operationsContainer ms-font-m">
				<Dropdown
					label='Operation'
					className="ms-font-m"
					options={options}
					onChanged={this.operationChanged.bind(this)}
					selectedKey={this.state.operationKey}
				/>
				<TextField
					onChanged={this.sharesChanged.bind(this)}
					label="Shares"
					className="ms-font-m"
					value={this.state.shares} />
				<TextField
					label="Order Total"
					className="ms-font-m"
					disabled={true}
					value={this.state.orderTotal} />
				<div className="operationsFooterDiv">
					<Button
						text="Order"
						onClick={() => this.order()}
					/>
				</div>
			</div>
		);
	}
}

export default Operations;
