import React, { Component } from 'react';
import './style.css';

class View extends Component{
	render () {
    return (
      <div className='view'>
        {new Date().toLocaleString()}
        <br />
        {this.props.region}, {this.props.country} Weather
        <br />
        {this.props.teperature} °K
        <br />
        {this.props.description}
      </div>
    );
  }
}

export default View