import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import places from './places.json';
import { IPINFO_API } from '../../utils';
import './style.css';

class CountrySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      region: '',
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleGetWeather = this.handleGetWeather.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.country !== prevState.country) {
      this.setState({ region: '' });
    }
  }

  handleFormChange(key) {
    return ({ target: { value } }) => {
      this.setState({ [key]: value })
    }
  }

  async handleGetWeather() {
    const { region } = this.state;
    await this.props.getWeather({ region });
    this.setState({ region: '' });
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
        <datalist id="Country" >
          {
            Object.keys(places).map((item) =>
              <option value={item} key={item} />
            )
          }
        </datalist>
        {
          places[country] && (
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
                  places[country].map((item) =>
                    <option value={item} key={item} />
                  )
                }
              </datalist>
            </>
          )
        }
        <button onClick={this.handleGetWeather}> GET </button>
      </div>
    );
  }
}

CountrySelect.propTypes = {
  getWeather: PropTypes.func.isRequired,
};

export default CountrySelect