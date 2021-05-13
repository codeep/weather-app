export const IPINFO_API = 'https://ipinfo.io/?token=6196c9fe7a1737';
export const OpenWeatherIconURL = 'http://openweathermap.org/img/wn/';
const API_KEY = '2aeac406d27d1caf020cdd5e447d1bab';
const OpenWeatherURL = 'https://api.openweathermap.org/data/2.5/weather';

export const getOpenweatherUrl = (region) => (
    `${OpenWeatherURL}?q=${region}&appid=${API_KEY}`
)