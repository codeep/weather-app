export const IPINFO_API = 'https://ipinfo.io/?token=6196c9fe7a1737';
const OpenWeatherIconURL = 'http://openweathermap.org/img/wn/';
const API_KEY = '2aeac406d27d1caf020cdd5e447d1bab';
const OpenWeatherURL = 'https://api.openweathermap.org/data/2.5/weather';

export const getOpenweatherUrl = (region) => (
    `${OpenWeatherURL}?q=${region}&appid=${API_KEY}`
)

export const setOpenWeatherIcon = (icon) => {
   return <img src={OpenWeatherIconURL+icon+'@2x.png'} alt='weather_icon'/>
}

export const setTepmerature = function(teperature, value){
    let temp = teperature;
    if (value === 'celsius'){
      temp =  teperature - 273.15
    }else if(value === 'fahrenheit'){
      temp = (teperature - 273.15) * 1.8 + 32
    }
    return Math.round(temp * 100) / 100;
  }