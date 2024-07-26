import get_reservation from "../apicall/getReservations.js";
import delete_reservation from "../apicall/deleteReservation.js"


//! Start of Toggling of navbar

// ? following 3 functions handles the navlinks toggler which comes into view when screen width decreases

const closeToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "0rem";
  document.getElementsByClassName("navicon")[0].style.display = "block";
};

const openToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "20rem";
  document.getElementsByClassName("navicon")[0].style.display = "none";
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 500) {
    document.getElementsByClassName("navlinks_toggler")[0].style.height = "";
    document.getElementsByClassName("navicon")[0].style.display = "";
  }
});

//! End of Toggling of navbar


// ! Start of Deleting the Reservation function

const Delete=async(e)=>{
  if(e.target.getAttribute("name"))
  {
    const id=e.target.getAttribute("name");
    const res=await delete_reservation(id)
    if(res){
      document.getElementById(`${id}`).remove(); 
      // ? getting the array of the children of tbody and checking if it is empty
      const tbody=Array.from(document.getElementsByTagName("tbody")[0].children)
      if(!tbody.length) 
        not_available()  
    }
  }
}

// ! End of Deleting the Reservation function



// ! Start of Creating the Reservation table function

const make_table = (data) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  data.forEach((obj, ind) => {
    data[ind] = {
      ...obj,
      date_of_reservation: new Date(obj.date_of_reservation).toLocaleDateString(
        "en-US",
        options
      ),
      date_of_visit: new Date(obj.date_of_visit).toLocaleDateString(
        "en-US",
        options
      ),
    };
  });
  const table = document.querySelector(".table table tbody");
  data.forEach((obj) => {
    const row = document.createElement("tr");
    row.addEventListener("click",Delete)
    row.setAttribute("id",obj._id)
    row.innerHTML = `
           <td><i class="fa-solid fa-trash" name=${obj._id}></i></td>
           <td>${obj.Username}</td>
           <td>${obj.adventureName}</td>
           <td>${obj.date_of_reservation}</td>
           <td>${obj.person}</td>
           <td>${obj.price}</td>
           <td>${obj.date_of_visit}</td>
        `;
    table.append(row);
  });
};

// ! End of Creating the Reservation table function



// ! Start of Setting the Not Available Element

const not_available = () => {
  document.querySelector(".table").style.display = "none";
  document.querySelector("#no_reservation").innerHTML =
    '<div class="no_reservation">No reservations made &#128542;</div>';
};

// ! End of Setting the Not Available Element


// ! Start of Controller Function

const run = async() => {
  const temp = await get_reservation();
  if (!temp) {
    document.querySelector(".table").style.display = "none";
    document.querySelector("#no_reservation").remove();
    document.querySelector(".footer").style.position = "fixed";
    document.querySelector(".footer").style.bottom = "0rem";
  }
  else if(temp=="No Reservation"){
    not_available();
  }
  else
  make_table(temp)
}

// ! End of Controller Function


window.not_available = not_available;
window.make_table = make_table;
window.openToggle = openToggle;
window.closeToggle = closeToggle;


// ! IIFE to run on parsing

(function () {
  run();
})();
