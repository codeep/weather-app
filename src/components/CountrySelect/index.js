import React, { Component } from 'react';
import './style.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios';

class CountrySelect extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      place: {
        country: 'Armenia', 
        region: 'Yerevan',
      },
      teperature: '',
      desc: '',
    };
  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  componentDidMount(){
    this.getWeather(this.state.region)
  }

  getWeather(region){
    // console.log(region);
    // console.log(window)

    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=2aeac406d27d1caf020cdd5e447d1bab`,
    })
      .then((response) => {
        // console.log(response.data.main.temp);

        // Kelvin to Celsius
        this.setState({ teperature: response.data.main.temp - 273.15 })
        // console.log(response.data);

        this.setState({desc: response.data.weather[0].main})
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render () {
    const { country, region , teperature, desc} = this.state;
    return (
      <>      
        <div>
          <CountryDropdown
            value={country}
            onChange={(val) => this.selectCountry(val)} 
          />
          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => this.selectRegion(val)} 
          />
        </div>
        <button onClick={() => this.getWeather(region)}>
          GET
        </button>
      
        <div className='view'>
            {new Date().toLocaleString()}
            <br />
            {region}, {country} Weather
            <br />
            {Math.round(teperature * 100) / 100} ℃ - {desc}
        </div>
      </>
    );
  }
}

export default CountrySelect