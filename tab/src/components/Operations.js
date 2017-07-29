import React, { Component } from 'react';
import { getPortfolio, buyNewShares, sellAllShares, updateUserCapital, updateShares } from '../helpers/apiHelper'
import { TextField, Button, Dropdown } from 'office-ui-fabric-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCapital, deleteStock, addStock, updateStock } from '../actions'

const generateGUID = () => {
	let d = new Date().getTime();
	let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (char == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return guid;
}

class LocalStock {
	constructor(company, numShares, price, userId) {
		this.Company = company;
		this.Id = generateGUID();
		this.NumShares = numShares;
		this.SharePrice = price;
		this.UserId = userId
	}
}

class Operations extends Component {
	constructor(p) {
		super(p)
		this.state = {
			operationKey: "BUY",
			shares: 0,
			orderTotal: 0.00,
			justOrdered: null
		}
		this.order = this.order.bind(this)
		this.sharesChanged = this.sharesChanged.bind(this)
		this.operationChanged = this.operationChanged.bind(this)
		this.renderMessage = this.renderMessage.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.sendStatusMessage = this.sendStatusMessage.bind(this)
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
	sendStatusMessage() {
		let status = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, 2000)
		}).then(() => {
			this.setState({
				justOrdered: null
			})
		})
	}
	order() {
		//need to immediately error if order quantity is 0 or is text
		if (parseInt(this.state.shares) == 0) {
			console.log('error -zero quantity')
			return;
		}
		if (this.state.operationKey == 'BUY') {
			let capitalRemaining = this.props.user.loggedInUser.CapitalRemaining - parseInt(this.state.orderTotal);
			if (capitalRemaining >= 0) {
				buyNewShares(this.props.user.loggedInUser.Id, this.props.company, parseInt(this.state.shares), this.props.currentPrice)
					.then((r) => {
						updateUserCapital(this.props.user.loggedInUser.Id, capitalRemaining)
							.then((r) => {
								this.props.updateCapital(capitalRemaining)
								this.props.addStock(new LocalStock(this.props.company, parseInt(this.state.shares), this.props.currentPrice, this.props.user.loggedInUser.Id))
								this.setState({
									operationKey: "BUY",
									shares: 0,
									orderTotal: 0.00,
									justOrdered: "BUY"
								})
								this.sendStatusMessage()
							})
					})

			} else {
				console.log('error - insufficient funds')
				//insufficient funds error
			}
		} else {
			let amount = parseInt(this.state.shares)
			let totalPrice = this.props.currentPrice * amount;
			let capitalRemaining = this.props.user.loggedInUser.CapitalRemaining + parseInt(this.state.orderTotal);
			let stockFound = this.props.stocks.portfolio.find(p => p.Company.toLowerCase() === this.props.company.toLowerCase());
			if (!stockFound) {
				console.log('error - no stock in company')
			} else if (stockFound.NumShares < amount) {
				console.log('error - insufficient shares')
			} else if (stockFound.NumShares == amount) {
				sellAllShares(this.props.user.loggedInUser.Id, this.props.company)
					.then((r) => {
						updateUserCapital(this.props.user.loggedInUser.Id, capitalRemaining)
							.then((r) => {
								this.props.updateCapital(capitalRemaining)
								this.props.deleteStock(this.props.company)
								this.setState({
									operationKey: "BUY",
									shares: 0,
									orderTotal: 0.00,
									justOrdered: "SELL"
								})
								this.sendStatusMessage()
							})
					})
			} else {
				let prevNumShares = stockFound.NumShares;
				let newNumShares = prevNumShares - amount;
				updateShares(this.props.user.loggedInUser.Id, this.props.company, newNumShares, stockFound.SharePrice)
					.then((r) => {
						updateUserCapital(this.props.user.loggedInUser.Id, capitalRemaining)
							.then((r) => {
								this.props.updateCapital(capitalRemaining)
								this.props.updateStock(this.props.company, newNumShares)
								this.setState({
									operationKey: "BUY",
									shares: 0,
									orderTotal: 0.00,
									justOrdered: "SELL"
								})
								this.sendStatusMessage()
							})
					})
			}
		}
	}
	renderMessage() {
		let message = this.state.justOrdered == 'SELL' ? 'SOLD!' : "PURCHASED!";
		let messageClass = this.state.justOrdered == 'SELL' ? 'soldMessage' : "successMessage";
		return (
			<div className={messageClass}>
				<span className='ms-font-su ms-fontWeight-semibold'>{message}</span>
			</div>
		)

	}
	renderForm() {
		let vals = ["BUY", "SELL"]
		let options = vals.map(v => {
			return {
				key: v,
				text: v
			}
		})
		return (
			<div>
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
		)
	}
	render() {
		return (
			<div className="operationsContainer ms-font-m">
				{this.state.justOrdered == null ? this.renderForm() : this.renderMessage()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		stocks: state.stocks
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateCapital: updateCapital,
		addStock: addStock,
		deleteStock: deleteStock,
		updateStock: updateStock
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations);
