import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import TypeSelect from '../TypeSelect';
import { setTemperature, setOpenWeatherIcon } from '../../utils';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.getTemperatureType = this.getTemperatureType.bind(this);
  };

  getTemperatureType({ target: { value } }) {
    this.setState({ value });
  };

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.dataTransfer.setData("region", this.props.data.region);
  }

  render() {
    const { value } = this.state;
    const {
      data: {
        temp,
        icon,
        region,
        temp_min,
        temp_max,
        humidity,
        feels_like,
        description,
      },
    } = this.props;

    return (
      <div
        draggable
        className='view_board'
        data-region={region}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
      >
        <button onClick={() => this.props.removeView(region)}> Close </button>
        <TypeSelect getTemperatureType={this.getTemperatureType} value={value} />
        <div className='view'>
          <div>
            {region}
            <br />
            Weather
            <br />
            {setTemperature(temp, value)}
            <br />
            {description}
          </div>
          <div>
            <img src={setOpenWeatherIcon(icon)} alt='weather_icon' />
            <div>
              {new Date().toLocaleString()}
              <br />
              {setTemperature(temp_min, value)} / {setTemperature(temp_max, value)}
            </div>
          </div>
        </div>
        <div>
          Feels Like- {setTemperature(feels_like, value)}
          <br />
          Humidity - {humidity}
        </div>
      </div>
    );
  }
}

View.propTypes = {
  data: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    feels_like: PropTypes.number.isRequired,
    temp_min: PropTypes.number.isRequired,
    temp_max: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  removeView: PropTypes.func.isRequired,
};
export default View