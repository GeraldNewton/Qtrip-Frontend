import { baseURL,actualURL } from "../config.js";

const signUp = async (Username, password) => {
  try {
    const res = await axios.post(
      `${actualURL}/signup`,
      {},
      {
        headers: {
          Username,
          password,
        },
      }
    );
    return res;
  } catch (e) {
    if(e.response.data){
        alert(`${e.response.data.error} : ${e.response.data.message}`)
        if(e.response.data.error_array)
        e.response.data.error_array.forEach((val)=>alert(val))
    }
    console.log(e);
  }
};

export default signUp;
