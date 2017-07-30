import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser, createUser, getPortfolio } from '../helpers/apiHelper'
import { TextField, Button } from 'office-ui-fabric-react'
import { loadPortfolio, loadUser } from '../actions';

class Login extends Component {
	constructor(p) {
		super(p);
		this.state = {
			firstname: "",
			lastname: "",
			signupUsername: "",
			signupPassword: "",
			loginUsername: "",
			loginPassword: "",
			failed: false
		}
		this.attemptLogin = this.attemptLogin.bind(this);
		this.signUp = this.signUp.bind(this);
	}
	attemptLogin() {
		loginUser(this.state.loginUsername, this.state.loginPassword)
			.then((res) => {
				if (res.data.data.length > 0) {
					let foundUser = res.data.data[0];
					getPortfolio(foundUser.Id)
						.then((r) => {
							let portfolio = r.data.data;
							this.props.loadPortfolio(portfolio)
							this.props.loadUser(foundUser)
						})
				} else {
					this.setState({
						failed: true
					})
					let prom = new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve()
						}, 2000)
					}).then((r) => {
						this.setState({
							failed: false
						})
					})
				}
			})
	}
	signUp() {
		let username = this.state.signupUsername;
		let password = this.state.signupPassword;
		let firstname = this.state.firstname;
		let lastname = this.state.lastname;
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
				this.props.loadUser(newUser);
				this.props.loadPortfolio([])
			})
	}
	loginUsernameChanged(text) {
		this.setState({
			loginUsername: text
		})
	}
	loginPasswordChanged(text) {
		this.setState({
			loginPassword: text
		})
	}
	signupUsernameChanged(text) {
		this.setState({
			signupUsername: text
		})
	}
	signupPasswordChanged(text) {
		this.setState({
			signupPassword: text
		})
	}
	firstnameChanged(text) {
		this.setState({
			firstname: text
		})
	}
	lastnameChanged(text) {
		this.setState({
			lastname: text
		})
	}
	render() {
		if (this.state.failed == true) {
			return (
				<div>
					<div className="form">
						<div className="failedForm">
							<div className="formTitleDiv">
								<span className="ms-font-xxl">Login Failed!</span>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div>
					<div className="form">
						<div className="loginForm">
							<div className="formTitleDiv">
								<span className="ms-font-xxl">Log In</span>
							</div>
							<TextField
								onChanged={this.loginUsernameChanged.bind(this)}
								label="Username"
								className="ms-font-m"
								value={this.state.loginUsername} />
							<TextField
								onChanged={this.loginPasswordChanged.bind(this)}
								label="Password"
								className="ms-font-m"
								value={this.state.loginPassword} />
							<div className="formFooterDiv">
								<Button
									text="Log In"
									onClick={() => this.attemptLogin()}
								/>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadPortfolio: loadPortfolio,
		loadUser: loadUser
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Login);



/*<div className="signupForm">
	<div className="formTitleDiv">
		<span className="ms-font-xxl">Sign Up</span>
	</div>
	<TextField
		onChanged={this.signupUsernameChanged.bind(this)}
		label="Username"
		className="ms-font-m"
		value={this.state.signupUsername} />
	<TextField
		onChanged={this.signupPasswordChanged.bind(this)}
		label="Password"
		className="ms-font-m"
		value={this.state.signupPassword} />
	<TextField
		onChanged={this.firstnameChanged.bind(this)}
		label="First Name"
		className="ms-font-m"
		value={this.state.firstname} />
	<TextField
		onChanged={this.lastnameChanged.bind(this)}
		label="Last Name"
		className="ms-font-m"
		value={this.state.lastname} />
	<div className="formFooterDiv">
		<Button
			text="Sign Up"
			onClick={() => this.signUp()}
		/>
	</div>
</div>*/