import React, { Component } from 'react';
import { DetailsList, CommandButton, Link, CheckboxVisibility, IColumn, SearchBox } from 'office-ui-fabric-react';
import { getMinuteTimeSeries } from '../helpers/stockHelper'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialLoad } from '../actions'

let columns = [
	{
		key: 'company',
		name: 'Company',
		fieldName: 'Company',
		minWidth: 100,
		maxWidth: 180,
		isResizable: true
	},
	{
		key: 'numShares',
		name: '# Shares',
		fieldName: 'NumShares',
		minWidth: 100,
		maxWidth: 180,
		isResizable: true
	},
	{
		key: 'purchasePrice',
		name: 'Purchase Price',
		fieldName: 'SharePrice',
		minWidth: 100,
		maxWidth: 180,
		isResizable: true
	},
	{
		key: 'currentPrice',
		name: 'Current Price',
		fieldName: 'CurrentPrice',
		minWidth: 100,
		maxWidth: 180,
		isResizable: true
	},
	{
		key: 'growth',
		name: 'Growth %',
		fieldName: 'Growth',
		minWidth: 100,
		maxWidth: 180,
		isResizable: true
	},
];

class MyPortfolio extends Component {
	constructor(p) {
		super(p);
		this.state = {
			stockItems: null,
			capitalRemaining: null,
			loaded: false
		}
		this.createStockItems = this.createStockItems.bind(this)
		this.updateStockItems = this.updateStockItems.bind(this)
	}
	componentDidMount() {
		if ((this.props.stocks.portfolio && this.state.stockItems === null)
			|| this.props.stocks.portfolio.length !== this.state.stockItems.length) {
			this.createStockItems(this.props.stocks);
		}
	}
	componentWillReceiveProps(p) {
		if (!p.user.loggedInUser) {
			return;
		} else if (p.user.loggedInUser.CapitalRemaining !== this.state.capitalRemaining) {
			this.updateStockItems(p.stocks, p.user.loggedInUser)
		}
	}
	updateStockItems(stockProps, user) {
		if (stockProps.portfolio.length > this.state.stockItems.length) {
			let addedStock = stockProps.portfolio[stockProps.portfolio.length - 1];
			let shares = parseInt(addedStock.NumShares)
			let price = parseInt(addedStock.SharePrice)
			let stockObj = {
				Company: addedStock.Company,
				NumShares: shares,
				SharePrice: price.toFixed(2),
				CurrentPrice: price.toFixed(2),
				Growth: ((((price.toFixed(2) * shares) / (shares * price)) - 1) * 100).toFixed(2)
			}
			let stockItemsToReturn = [...this.state.stockItems, stockObj];
			this.setState({
				stockItems: stockItemsToReturn
			})
		} else if (stockProps.portfolio.length < this.state.stockItems.length) {
			let stockItemsToReturn = this.state.stockItems.filter(stockObj => stockObj.Company.toLowerCase() !== stockProps.prevDeletedCompany.toLowerCase());
			this.setState({
				stockItems: stockItemsToReturn
			})
		} else {
			let updatedStock = stockProps.prevUpdatedCompany;
			if (updatedStock.company){
				let updatedItem = this.state.stockItems.find(stockObj => stockObj.Company.toLowerCase() == updatedStock.company.toLowerCase());
				let stockItemsToReturn = this.state.stockItems.filter(stockObj => stockObj.Company.toLowerCase() !== updatedStock.company.toLowerCase());
				updatedItem.NumShares = updatedStock.newShares;
				stockItemsToReturn.push(updatedItem)
				this.setState({
					stockItems: stockItemsToReturn
				})
			}
		}
	}
	createStockItems(stockProps) {
		if (stockProps.portfolio.length == 0) {
			this.setState({
				stockItems: []
			})
		} else {
			let stockItemsToReturn = []
			let numStocks = stockProps.portfolio.length;
			let portPromise = new Promise((resolve, reject) => {
				let count = 0;
				stockProps.portfolio.map(p => {
					getMinuteTimeSeries(p.Company)
						.then((r) => {
							let priceHistory = r.data['Time Series (1min)']
							let stockObj = {
								Company: p.Company,
								NumShares: p.NumShares,
								SharePrice: p.SharePrice.toFixed(2),
								CurrentPrice: "N/A",
								Growth: "N/A",
							}
							if (priceHistory) {
								let priceObject = priceHistory[Object.keys(priceHistory)[0]];
								let mostRecentPrice = priceObject['4. close'];
								let stockTotal = mostRecentPrice * p.NumShares;
								stockObj.CurrentPrice = parseFloat(mostRecentPrice).toFixed(2);
								stockObj.Growth = (((stockTotal / (p.NumShares * p.SharePrice)) - 1) * 100).toFixed(2)
							}
							count++;
							stockItemsToReturn.push(stockObj)
							if (count == numStocks) {
								resolve(stockItemsToReturn)
							}
						})
				})

			}).then((stockItemsToReturn) => {
				this.setState({
					stockItems: stockItemsToReturn
				})
				this.props.initialLoad();
			})
		}
	}
	renderItemColumn(item, index, column) {
		let self = this;
		let fieldContent = item[column.fieldName];
		switch (column.key) {
			case 'company':
				return <span className='ms-font-m-plus'>{fieldContent.toUpperCase()}</span>;
			case 'growth':
				let colorClass = 'ms-font-m-plus ';
				if(fieldContent > 0){
					colorClass += "posGrowth"
				} else if (fieldContent < 0){
					colorClass += "negGrowth"
				}
				return <span className={colorClass}>{fieldContent}</span>;
			default:
				return <span className='ms-font-m-plus'>{fieldContent}</span>;
		}
	}
	render() {
		let stockItems = this.state.stockItems ? this.state.stockItems : []
		return (
			<div>
				<DetailsList
					className="ms-font-m-plus portfolioTable"
					items={stockItems}
					columns={columns}
					checkboxVisibility={CheckboxVisibility.hidden}
					onRenderItemColumn={this.renderItemColumn.bind(this)}
					onActiveItemChanged={() => console.log("we need to come up with some other view when looking at past sessions")}
				/>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		initialLoad: initialLoad
	}, dispatch)
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		stocks: state.stocks
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPortfolio);