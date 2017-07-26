import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'
import Login from './Login'
import { loginUser } from '../helpers/apiHelper'


class App extends Component {
	constructor(p) {
		super(p)
		this.state = {
			user: null,
			portfolio: null
		}
	}
	attemptLogin(username, password){
		loginUser(username, password)
			.then((res) => {
				console.log('DATA', res.data)
			})
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
				<Login attemptLogin={this.attemptLogin.bind(this)}/>
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
