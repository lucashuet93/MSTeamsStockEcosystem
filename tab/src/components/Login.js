import React, { Component } from 'react';

class Login extends Component {
	constructor(p) {
		super(p)
	}
	handleClick(){
		this.props.attemptLogin("test", "pass")
	}
	render() {
		return (
			<div>
				<button onClick={this.handleClick.bind(this)}/>
			</div>
		);
	}
}

export default Login;
