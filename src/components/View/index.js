import React from 'react';
import './style.css';

function View ({ region, country, teperature, description }){
    return (
      <div className='view'>
        {new Date().toLocaleString()}
        <br />
        {region}, {country} Weather
        <br />
        {teperature} °K
        <br />
        {description}
      </div>
  );
}

export default View