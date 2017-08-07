import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';
import { loadContext, loadUser, loadPortfolio } from '../actions';
import { loginUser, createUser, getPortfolio } from '../helpers/apiHelper'

class App extends Component {
	constructor(p) {
		super(p)
		this.attemptLogin = this.attemptLogin.bind(this)
	}
	componentDidMount() {
		const microsoftTeams = window.microsoftTeams;
		microsoftTeams.getContext((context) => {
			this.props.loadContext(context)
			console.log('here')
			this.attemptLogin(context.upn)
		})
	}
	attemptLogin(username) {
		loginUser(username)
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
	renderContent() {
		return (
			<div>
				<div className="overview">
					<Overview />
				</div>
				<div className="content">
					<Content />
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
				{this.props.user.loggedInUser == null ? this.renderLogin() : this.renderContent()}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadContext: loadContext,
		loadPortfolio: loadPortfolio,
		loadUser: loadUser
	}, dispatch)
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
