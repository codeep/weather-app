import React from 'react';
import './style.css';
import { setTepmerature, setOpenWeatherIcon } from '../../utils';

function View ({ value, teperature, description, feels_like, temp_min, temp_max, humidity, icon }){
    return (
      <>
        <div className='view'>
          <div>
            Weather
            <br/>
            {setTepmerature(teperature,value)}
            <br />
            {description}
          </div>
          <div>
            <img src={setOpenWeatherIcon(icon)} alt='weather_icon'/>
            <div>
              {new Date().toDateString()}
              <br/>
              {setTepmerature(temp_min,value)} / {setTepmerature(temp_max,value)}
            </div>
          </div>
        </div>
        <div>
          Feels Like- {setTepmerature(feels_like,value)}
          <br/>
          Humidity - {humidity}
        </div>
      </>
  );
}

export default View