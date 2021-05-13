import React from 'react';
import './style.css';
import { OpenWeatherIconURL } from '../../utils';

function View ({ value, teperature, description, feels_like, temp_min, temp_max, humidity, icon }){
  
  function getTepmerature(){
    let temp = teperature;
    if (value === 'celsius'){
      temp =  teperature - 273.15
    }else if(value === 'fahrenheit'){
      temp = (teperature - 273.15) * 1.8 + 32
    }
    return Math.round(temp * 100) / 100;
  }
    return (
      <>
        <div className='view'>
          <div>
            Weather
            <br />
            {getTepmerature()}
            <br />
            {description}
          </div>
          <div>
            <img src={OpenWeatherIconURL+icon+'@2x.png'} alt='weather_icon'/>
            <div>
              {new Date().toDateString()}
              <br />
              {temp_min} / {temp_max}
            </div>
          </div>
        </div>
        <div>
          Feels Like- {feels_like}
          <br/>
          Humidity - {humidity}
        </div>
      </>
  );
}

export default View