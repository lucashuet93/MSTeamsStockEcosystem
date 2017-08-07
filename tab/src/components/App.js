import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login';
import { loadContext } from '../actions';

class App extends Component {
	constructor(p) {
		super(p)
	}
	componentDidMount() {
		const microsoftTeams = window.microsoftTeams;
		microsoftTeams.getContext((context) => {
			this.props.loadContext(context)
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
		loadContext: loadContext
	}, dispatch)
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
