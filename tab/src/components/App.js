import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'
import Login from './Login';


class App extends Component {
	constructor(p) {
		super(p)
		this.state = {
			user: null,
			portfolio: null
		}
	}
	addUser(user) {
		this.setState({
			user: user
		})
	}
	addPortfolio(portfolio) {
		this.setState({
			portfolio: portfolio
		})
	}
	renderContent() {
		return (
			<div>
				<div className="overview">
					<Overview user={this.state.user} portfolio={this.state.portfolio} />
				</div>
				<div className="content">
					<Content user={this.state.user} portfolio={this.state.portfolio} />
				</div>
			</div>
		)
	}
	renderLogin() {
		return (
			<div>
				<Login />
			</div>
		)
	}
	render() {
		return (
			<div>
				{this.state.user == null ? this.renderLogin() : this.renderContent()}
			</div>
		);
	}
}

export default App;
