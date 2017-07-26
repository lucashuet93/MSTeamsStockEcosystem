import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'

class App extends Component {
	constructor(p) {
		super(p)
		this.state = {
			user: null,
			portfolio: null
		}
	}
	render() {
		return (
			<div>
				<div className="overview">
					<Overview portfolio={this.state.portfolio}/>
				</div>
				<div className="content">
					<Content portfolio={this.state.portfolio} />
				</div>
			</div>
		);
	}
}

export default App;
