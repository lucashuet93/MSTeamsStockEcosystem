import React, { Component } from 'react';
import Operations from './Operations'
import TimeSeries from './TimeSeries'
import { SearchBox } from 'office-ui-fabric-react'

class Marketplace extends Component {
	constructor(p) {
		super(p);
		this.state = {
			searchValue: ""
		}
		this.onChange = this.onChange.bind(this)
		this.onSearch = this.onSearch.bind(this)
	}
    onChange(newValue) {
        let lcString = newValue.toLowerCase();
        this.setState({
            searchValue: lcString
        })
    }
    onSearch(newValue) {
        let lcString = newValue.toLowerCase();
		console.log(newValue)
    }
	render() {
		return (
			<div>
				<div className="market marketSearch">
					<SearchBox
						className="ms-font-m-plus"
						onChange={(newValue) => this.onChange(newValue)}
						onSearch={(newValue) => this.onSearch(newValue)}
					/>
				</div>
				<div className="market marketTimeSeries">
					<TimeSeries />
				</div>
				<div className="market marketOperations">
					<Operations portfolio={this.props.portfolio} />
				</div>
			</div>
		);
	}
}

export default Marketplace;