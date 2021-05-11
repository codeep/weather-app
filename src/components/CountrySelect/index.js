import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios';
import View from '../View';
import { getOpenweatherUrl } from '../../utils';

class CountrySelect extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      country: 'Armenia',
      region: 'Yerevan',
      teperature: 0,
      description: '',
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

  // componentDidMount(){
  //   this.getWeather(this.state.region)
  // }

  getWeather(){
    const url = getOpenweatherUrl(this.state.region)
    axios({ method: "GET", url })
      .then((response) => {
        const  { data: { main: { temp }, weather: [{ main }] } } = response;
        this.setState({ 
          description: main,
          teperature: temp,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    const { country, region} = this.state;

    return (
      <>      
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
        />
      </>
    );
  }
}

export default CountrySelect