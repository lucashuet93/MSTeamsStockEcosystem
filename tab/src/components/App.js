import React, { Component } from 'react';
import '../assets/App.css';
import Content from './Content'
import Overview from './Overview'

class App extends Component {
  render() {
    return (
      <div>
        <div className="overview">
          <Overview />
        </div>
        <div className="content">
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
