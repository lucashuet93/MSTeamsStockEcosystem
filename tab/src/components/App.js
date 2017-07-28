import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';


class App extends Component {
	constructor(p) {
		super(p)
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

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps, null)(App);
