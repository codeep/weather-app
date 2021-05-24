export const IPINFO_API = 'https://ipinfo.io/?token=6196c9fe7a1737';
const OpenWeatherIconURL = 'http://openweathermap.org/img/wn/';
const API_KEY = 'e2b9d424c2e9abdb452db1fae7395e00';
const OpenWeatherURL = 'https://api.openweathermap.org/data/2.5/weather';

export const getOpenweatherUrl = (region) => (
  `${OpenWeatherURL}?q=${region}&appid=${API_KEY}`
)

export const setOpenWeatherIcon = (icon) => (
  `${OpenWeatherIconURL}${icon}@2x.png`
)

export const getFormatedTemperature = (temp, value) => {
  if (value === 'celsius'){
    return Math.round(temp - 273.15)
  }else if (value === 'fahrenheit'){
    return Math.round(temp - 273.15)* 1.8 + 32
  }
  return Math.round(temp)
}