import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios';
import View from '../View';
import { getOpenweatherUrl } from '../../utils';
import './style.css';

class CountrySelect extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      country: 'Armenia',
      region: 'Yerevan',
      teperature: 0,
      description: '',
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      humidity: 0
    };

    this.getWeather = this.getWeather.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
  }

  selectCountry (country) {
    this.setState({ country });
  }

  selectRegion (region) {
    this.setState({ region });
  }

  componentDidMount(){
    this.getWeather(this.state.region)
  }

  getWeather(){
    const url = getOpenweatherUrl(this.state.region);
    console.log(url)
    axios({ method: "GET", url })
      .then((response) => {
        const  { data: { main: { temp, feels_like, temp_min, temp_max, humidity}, weather: [{ description }]}} = response;
        this.setState({ 
          description: description,
          teperature: temp,
          feels_like: feels_like,
          temp_min: temp_min,
          temp_max: temp_max,
          humidity: humidity
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    const { country, region } = this.state;

    return (
      <div className='countrySelect'>      
        <div>
          <CountryDropdown
            value={country}
            onChange={this.selectCountry} 
          />
          <RegionDropdown
            country={country}
            value={region}
            onChange={this.selectRegion} 
          />
        </div>

        <button onClick={this.getWeather}> GET </button>
  
        <View 
          region={this.state.region}
          country={this.state.country}
          teperature={this.state.teperature}
          description={this.state.description}
          feels_like={this.state.feels_like}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          humidity={this.state.humidity}
        />
      </div>
    );
  }
}

export default CountrySelect