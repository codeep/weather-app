import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import axios from 'axios';

import { IPINFO_API } from '../../utils';
import './style.css';

class CountrySelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: '',
      region: '',
    }
  }

  componentDidMount(){    
    axios({ method: "GET", url: IPINFO_API })
      .then(response => {
        const countryFullNames = new Intl.DisplayNames(['us'], { type: 'region' });
        const country = countryFullNames.of(`${response.data.country}`);
        const region = response.data.region;
        this.setState({ country, region });
        this.props.getWeather({ country, region });
      }).catch(e => console.log(e));
  }

  handleFormChange = (key) => {
    return (value) => {
      this.setState({ [key] : value })
    }
  }

  render () {
    const { country, region } = this.state;

    return (
      <div className='countrySelect'>      
        <div>
          <CountryDropdown
            value={country}
            onChange={this.handleFormChange('country')} 
          />
          <RegionDropdown
            country={country}
            value={region}
            onChange={this.handleFormChange('region')} 
          />
        </div>

        <button onClick={() => this.props.getWeather({ region })}> GET </button>
      </div>
    );
  }
}

CountrySelect.propTypes = {
  getWeather: PropTypes.func.isRequired,
};

export default CountrySelect