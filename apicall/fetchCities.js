import { actualURL,baseURL } from "../config.js"

const fetchCities = async (token) => {
    try {
      const cities_data = await axios.get(`${actualURL}/get/cities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return cities_data;
    } catch (e) {
      if (e.response.data.error === "Invalid Token")
        alert(
          "Cannot display the page: Token provided for this session is incorrect, You can login again to get the page"
        );
      else if (e.response.data.error === "Token Error")
        alert(
          "Cannot display the page: Token provided for this session is expired, You can login again to get the page"
        );
      else alert("Cannot display the page: Expereincing System Error");
    }
  };

export default fetchCities;