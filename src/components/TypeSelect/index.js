import React from 'react';
import PropTypes from 'prop-types';

function TypeSelect({getTepmeratureType, value}){
  return(
    <>
      <form>
        <label> Choose a type </label>
        <select onChange={getTepmeratureType} value={value}>
          <option value='kelvin'>Kelvin</option>
          <option value='fahrenheit'>Fahrenheit</option>
          <option value='celsius'>Celsius</option>
        </select>
      </form>
    </>
  )
}

TypeSelect.propTypes = {
  getTepmeratureType: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default TypeSelect