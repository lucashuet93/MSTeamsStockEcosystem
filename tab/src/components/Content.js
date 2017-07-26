import React, { Component } from 'react';
import Holdings from './Holdings'
import Marketplace from './Marketplace'

class Content extends Component {
  render() {
    return (
      <div>
        <div className="holdings">
			<Holdings />
        </div>
        <div className="marketplace">
			<Marketplace />
        </div>
      </div>
    );
  }
}

export default Content;
