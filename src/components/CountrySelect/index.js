import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import playces from './places.json';
import { IPINFO_API } from '../../utils';
import './style.css';

class CountrySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      region: '',
    }
  }

  componentDidMount() {
    axios({ method: "GET", url: IPINFO_API })
      .then(response => {
        const countryFullNames = new Intl.DisplayNames(['us'], { type: 'region' });
        const country = countryFullNames.of(`${response.data.country}`);
        const region = response.data.region;
        this.setState({ country, region });
        this.props.getWeather({ country, region });
      }).catch(e => console.log(e));
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.country !== prevState.country){
      this.setState({ region: '' });
    }
  }

  handleFormChange = (key) => {
    return ({ target: { value } }) => {
      this.setState({ [key]: value })
    }
  }

  render() {
    const { country, region } = this.state;
    return (
      <div className='countrySelect'>
        <label>Select Country
          <input
            list="Country"
            value={country}
            onChange={this.handleFormChange('country')} 
          />
        </label>
        <datalist id="Country" onSelect={(e) => console.log(e)} >
          {
            Object.keys(playces).map((item, key) =>
              <option value={item} key={key} />
            )
          }
        </datalist>

        {
          playces[country] && (
            <>
              <label>Select Region
                <input
                  list="Region"
                  value={region}
                  onChange={this.handleFormChange('region')}
                />
              </label>
              <datalist id="Region" >
                {
                  playces[country].map((item, key) =>
                    <option value={item} key={key} />
                  )
                }
              </datalist>
            </>
          )
        }
        <button onClick={() => this.props.getWeather({ region })}> GET </button>
      </div>
    );
  }
}

CountrySelect.propTypes = {
  getWeather: PropTypes.func.isRequired,
};

export default CountrySelect