import { actualURL,baseURL } from "../config.js"

const fetchCities = async () => {
    try {
      const cities_data = await axios.get(`${actualURL}/get/cities`);
      return cities_data;
    } catch (e) {
      alert("Cannot display the cities: Experiencing System Error");
    }
  };

export default fetchCities;