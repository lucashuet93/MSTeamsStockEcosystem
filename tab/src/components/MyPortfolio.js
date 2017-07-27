import React, { Component } from 'react';
import { DetailsList, CommandButton, Link, CheckboxVisibility, IColumn, SearchBox } from 'office-ui-fabric-react';

let columns = [
    {
        key: 'company',
        name: 'Company',
        fieldName: 'Company',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'numShares',
        name: '# Shares',
        fieldName: 'NumShares',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'averageInitialPrice',
        name: 'Average Initial Price',
        fieldName: 'SharePrice',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'currentPrice',
        name: 'Current Price',
        fieldName: 'CurrentPrice',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'growth',
        name: 'Growth',
        fieldName: 'Growth',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
];

class MyPortfolio extends Component {
	constructor(p) {
		super(p)
		this.state = {
			searchValue: ""
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
    renderStockItems() {
        let lcString = this.state.searchValue.toLowerCase();
        let filteredStocks = this.props.portfolio ? this.props.portfolio.filter((stockObj) => {
            return true
        }) : [];
        return filteredStocks;
    }
    render() {
        let stockItems = this.renderStockItems();
		console.log(stockItems)
        return (
            <div className="myPortfolio">
                <SearchBox
                    className="ms-font-m-plus"
                    onChange={(newValue) => this.onChange(newValue)}
                    onSearch={(newValue) => this.onChange(newValue)}
                />
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
export default MyPortfolio;
