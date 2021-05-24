import React from 'react';
import PropTypes from 'prop-types';

function TypeSelect({getTemperatureType, value}){
  return(
    <>
      <form>
        <label> Choose a type </label>
        <select onChange={getTemperatureType} value={value}>
          <option value='kelvin'>Kelvin</option>
          <option value='fahrenheit'>Fahrenheit</option>
          <option value='celsius'>Celsius</option>
        </select>
      </form>
    </>
  )
}

TypeSelect.propTypes = {
  getTemperatureType: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default TypeSelect