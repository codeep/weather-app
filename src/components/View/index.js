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
  };

  getTemperatureType = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { data: { region, temp, description, feels_like, temp_min, temp_max, humidity, icon } } = this.props;
    const { value } = this.state;

    return (
      <div className='view_board'>
        <button onClick={this.props.removeView}> Close </button>
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