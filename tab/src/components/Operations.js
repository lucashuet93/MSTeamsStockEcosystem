import React, { Component } from 'react';
import { getPortfolio, buyNewShares, sellAllShares, updateUserCapital } from '../helpers/apiHelper'
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
		let numShares = parseInt(text)
		let total = numShares * this.props.currentPrice;
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
		let capitalRemaining = this.props.user.CapitalRemaining - this.state.orderTotal;
		if (capitalRemaining >= 0) {
			if (this.state.operationKey == 'BUY') {
				buyNewShares(this.props.user.Id, this.props.company, this.state.shares, this.props.currentPrice)
					.then((r) => {
						updateUserCapital(this.props.user.Id, capitalRemaining)
							.then((r) => {
								console.log('bought and updated')
							})
					})
			} else {
				//sell shares
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
