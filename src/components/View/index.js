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
            {setOpenWeatherIcon(icon)}
            <div>
              {new Date().toDateString()}
              <br/>
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