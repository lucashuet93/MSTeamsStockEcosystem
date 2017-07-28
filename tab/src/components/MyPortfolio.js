import React, { Component } from 'react';
import { DetailsList, CommandButton, Link, CheckboxVisibility, IColumn, SearchBox } from 'office-ui-fabric-react';
import { getMinuteTimeSeries } from '../helpers/stockHelper'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
		name: 'Growth',
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
			stockItems: null
		}
		this.createStockItems = this.createStockItems.bind(this)
	}
	componentDidMount() {
		if ((this.props.stocks.portfolio && this.state.stockItems === null)
			|| this.props.stocks.portfolio.length !== this.state.stockItems.length) {
			this.createStockItems(this.props.stocks);
		}
	}
	createStockItems(stockProps) {
		if (stockProps.portfolio.length == 0) {
			return [];
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
			})
		}
	}
	renderItemColumn(item, index, column) {
		let self = this;
		let fieldContent = item[column.fieldName];
		switch (column.key) {
			case 'company':
				return <span className='ms-font-m-plus'>{fieldContent.toUpperCase()}</span>;
			default:
				return <span className='ms-font-m-plus'>{fieldContent}</span>;
		}
	}
	render() {
		console.log('rendering')
		let stockItems = this.state.stockItems ? this.state.stockItems : []
		return (
			<div className="myPortfolio">
				<DetailsList
					className="ms-font-m-plus"
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
const mapStateToProps = (state) => {
	return {
		user: state.user,
		stocks: state.stocks
	}
}
export default connect(mapStateToProps, null)(MyPortfolio);