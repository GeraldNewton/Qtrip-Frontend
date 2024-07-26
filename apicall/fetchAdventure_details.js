const fetchAdventure_details=async(adventure_name)=>{
    try{
        const token=localStorage.getItem("token");
        if(!token){
          alert("Cannot get data due to faulty Login, You can Login again to remove this error")
          return
        }
        const res=await axios.get(`http://localhost:3000/get/adventure-details?name=${adventure_name}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        return res;
    }catch(error){
        console.log(error)
        if(error.response){
            if(e.response.data.error=="Get parameter invalid")
            alert(e.response.data.message)
            if(e.response.data.error=="Not Found")
            alert("No data available for given Adventure")
            if(e.response.data.error=="Not Available")
            alert(e.response.data.message)
        }else{
            alert("Could not Get adventure details due to System and Server error")
        }
    }
}

export default fetchAdventure_details