import React, { Component } from 'react'
import axios from 'axios';
import './style.css';
import { 
  getOpenweatherUrl,
} from '../../utils';
import {
  CountrySelect,
  TypeSelect,
  View
} from '../../components';

class Home extends Component{
  constructor (props) {
    super(props);
    this.state = { 
      teperature: 0,
      description: '',
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      humidity: 0,
      icon: '',
      value: ''      
    };
  };
  
  getWeather = ({ region }) => {
    const url = getOpenweatherUrl(region);
    if(region){
      axios({ method: "GET", url })
      .then((response) => {
        const  { data: { main: { temp, feels_like, temp_min, temp_max, humidity }, weather: [{ description, icon }]}} = response;
        this.setState({ 
          teperature: temp,
          description,
          feels_like,
          temp_min,
          temp_max,
          humidity,
          icon
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  getTepmeratureType = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  
  render(){
    const { value, teperature, description, feels_like, temp_min, temp_max, humidity, icon } = this.state;

    return (
      <div className='home'>
        <CountrySelect getWeather={this.getWeather} />
        <TypeSelect getTepmeratureType={this.getTepmeratureType} value={value}/>
        <View
          value={value}
          teperature={teperature}
          description={description}
          feels_like={feels_like}
          temp_min={temp_min}
          temp_max={temp_max}
          humidity={humidity}
          icon={icon}
        />
      </div>
    );
  }
}

export default Home;