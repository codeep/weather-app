import axios from 'axios';
import { getOpenweatherUrl } from '../utils';

const fetchWeather = async (region) => {
	if (!region) {
		throw new Error('Region is required!!!');
	}
	const url = getOpenweatherUrl(region);
	try {
		const {
			data: {
				weather: [{ description, icon }],
				main: { temp, feels_like, temp_min, temp_max, humidity }
			}
		} = await axios({ method: "GET", url });

		return {
			icon,
			temp,
			region,
			temp_min,
			temp_max,
			humidity,
			feels_like,
			description,
		};
	} catch (error) {
			throw new Error(error);
	}
};

export default fetchWeather;