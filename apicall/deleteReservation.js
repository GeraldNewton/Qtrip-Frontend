const delete_reservation=async(id)=>{
  const token=localStorage.getItem("token")
  if(!token){
    alert("Cannot delete Reservation due to faulty login< Login agin to prevent thi issue")
    return
  }
  try{
    const res = await axios.delete(
        `http://localhost:3000/reservation`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            id 
          },
        }
      );
      return res.data
  }catch(e){
    alert("Cannot Cancel the Reservation due to system and server Error")
  }
}

export default delete_reservation