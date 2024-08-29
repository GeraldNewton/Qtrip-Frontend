import { actualURL,baseURL } from "../config.js"

const get_reservation = async () => {
    const token = localStorage.getItem("token")
    const Username=localStorage.getItem("Username")
    if(!token || !Username)
    {
        alert("Cannot load Reservations due to Faulty Login, Login again to prevent this issue")
        return;
    }
    try{
      const res = await axios.get(
        `${actualURL}/get/reservations?Username=${Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data)
      return res.data;
    }catch(e){
      console.log(e)
      if(e.response.data.error=="Not Found")
      return "No Reservation"
      if(e.response)
      alert(`${e.response.data.message}`);
      else
      alert("experiencing system and server error")
      
    }
  };

  export default get_reservation