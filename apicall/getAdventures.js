const getAdventures = async (city) => {
  try {
    const token=localStorage.getItem("token");
    if(!token){
      alert("Cannot get data due to faulty Login, You can Login again to remove this error")
      return
    }
    const res = await axios.get(
      `http://localhost:3000/get/adventures?city=${city}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } catch (e) {
    if(e.response){
        if(e.response.data.error=="Get parameter invalid")
        alert(e.response.data.message)
        if(e.response.data.error=="Not Found")
        alert("No data available for given city")
        if(e.response.data.error=="Not Available")
        alert(e.response.data.message)

    }else{
        alert("Could not Get adventures due to System and Server error")
    }
  }
};

export default getAdventures;
