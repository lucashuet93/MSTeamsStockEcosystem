import React, { Component } from 'react';
import { loginUser, createUser, getPortfolio } from '../helpers/apiHelper'

class Login extends Component {
	constructor(p) {
		super(p);
		this.attemptLogin = this.attemptLogin.bind(this);
		this.signUp = this.signUp.bind(this);
	}
	attemptLogin(username, password) {
		loginUser(username, password)
			.then((res) => {
				if (res.data.data.length > 0) {
					let foundUser = res.data.data[0];
					getPortfolio(foundUser.Id)
						.then((r) => {
							let portfolio = r.data.data;
							this.props.addUser(foundUser)
							this.props.addPortfolio(portfolio)
						})
				}
			})
	}
	signUp(username, password, firstname, lastname) {
		createUser(username, password, firstname, lastname)
			.then((res) => {
				let ID = res.data.data
				let newUser = {
					Id: ID,
					Username: username,
					Password: password,
					Firstname: firstname,
					Lastname: lastname,
					CapitalRemaining: 50000
				}
				this.props.addUser(newUser);
				this.props.addPortfolio([])
			})
	}
	handleClick() {
		this.attemptLogin("maucon", "password")
	}
	render() {
		return (
			<div>
				<button onClick={this.handleClick.bind(this)} />
			</div>
		);
	}
}

export default Login;
