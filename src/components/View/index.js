import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
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

View.propTypes = {
  value: PropTypes.string.isRequired,
  teperature: PropTypes.number.isRequired, 
  description: PropTypes.string.isRequired, 
  feels_like: PropTypes.number.isRequired, 
  temp_min: PropTypes.number.isRequired, 
  temp_max: PropTypes.number.isRequired, 
  humidity: PropTypes.number.isRequired, 
  icon: PropTypes.string.isRequired
};
export default View