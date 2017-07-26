import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'
import Login from './Login'

class App extends Component {
	constructor(p) {
		super(p)
		this.state = {
			user: null,
			portfolio: null
		}
	}
	renderContent() {
		return (
			<div>
				<div className="overview">
					<Overview portfolio={this.state.portfolio} />
				</div>
				<div className="content">
					<Content portfolio={this.state.portfolio} />
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
				{ this.state.user == null ? this.renderLogin() : this.renderContent() }
			</div>
		);
	}
}

export default App;
