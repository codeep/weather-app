import React from 'react';
import './style.css';

function View ({ region, country, teperature, description, feels_like, temp_min, temp_max, humidity }){
    return (
      <>
        <div className='view'>
          <div>
            {region}, {country} Weather
            <br />
            {teperature} °K
            <br />
            {description}
          </div>
          <div>
            {new Date().toLocaleString()}
            <br />
            {temp_min} / {temp_max}
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