import React from 'react';

function TypeSelect({getTepmeratureType, value}){
    return(
      <div>
        <form>
          <label> Choose a type </label>
          <select onChange={getTepmeratureType} value={value}>
            <option value='kelvin'>Kelvin</option>
            <option value='fahrenheit'>Fahrenheit</option>
            <option value='celsius'>Celsius</option>
          </select>
        </form>
      </div>
    )
}

export default TypeSelect