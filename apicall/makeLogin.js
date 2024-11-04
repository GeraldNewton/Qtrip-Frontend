import { baseURL,actualURL } from "../config.js";

const makeLogin = async (Username, password) => {
    try {
      const res = await axios.get(`${actualURL}/login`, {
        headers: {
          Username: Username,
          password: password,
        },
      });
      return res;
    } catch (e) {
      if (e.response) {
        // ? for validation error
        if (e.response.data.error === "Validation Error") {
          alert(
            `${e.response.data.error}: ${e.response.data.message}, To know more click on ok`
          );
          e.response.data.error_array.forEach((val) => alert(val));
        }
        // ? No user exists in database
        else if (e.response.data.error == "Not Found")
          alert("No user exists in database with given Username");
        // ? Wrong password
        else if (e.response.data.error == "unauthenticated user")
          alert("Wrong Password");
        // ? if nothing matches
        else
        alert("Cannot Login experiencing unknown error")
      }
      // ? if nothing matches 
      else alert("internal server error, Login could not be done");
    }
  };

export {makeLogin};