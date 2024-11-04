import fetchCities from "../apicall/fetchCities.js";

// ! Start of Navbar Setter

const setNavbar=(login)=>{
  let link;
  if(login)
  link=`<a href="../reservation_page/index.html">reservations</a>`
  else
  link=`<a href="./login_page/index.html">Login</a>`
    
  let navbar=document.querySelector(".navbar");
  navbar.innerHTML=navbar.innerHTML+`
    <div class="navlinks">
      <ul>
        <li>${link}</li>
        ${login?`<li class="logout">Logout</li>`:``}
      </ul>
    </div>
    <i class="fa-solid fa-bars navicon" onclick="openToggle()"></i> 
  `
  
  let header=document.querySelector("header");
  header.innerHTML=header.innerHTML+`
    <div class="navlinks_toggler">
      <ul>
        <li>${link}</li>
        <hr />
        ${login?`<li class="logout">Logout</li>
                 <hr />`:``}
        <li onclick="closeToggle()"><i class="fa-solid fa-xmark"></i></li>
      </ul>
    </div>
  `
  
  const arr=Array.from(document.getElementsByClassName("logout"))
  arr.forEach((ele)=>ele.addEventListener("click",()=>{localStorage.clear();location.reload();console.log("i run")}))
}

// ! End of Navbar Setter



// ! Start of Navbar handling

// ? following 3 functions handles the navlinks toggler which comes into view when screen width decreases

const closeToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "0rem";
  document.getElementsByClassName("navicon")[0].style.display = "block";
};

const openToggle = () => {
  let ht;
  if(localStorage.getItem("username"))
  ht="21rem";
  else
  ht="15rem";
  document.getElementsByClassName("navlinks_toggler")[0].style.height = `${ht}`;
  document.getElementsByClassName("navicon")[0].style.display = "none";
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 500) {
    document.getElementsByClassName("navlinks_toggler")[0].style.height = "";
    document.getElementsByClassName("navicon")[0].style.display = "";
  }
});

// ! End of Navbar handling

// ! Start of Adventure visit function

const visitAdventure=(city)=>{
  const username = localStorage.getItem("username");
  if(username)
  window.location.href=`http://${location.host}/city_page/index.html?city=${city}`
  else
  alert("Login first to view Adventures in a city")
}

// ! End of Adventure visit function


window.openToggle=openToggle;
window.closeToggle=closeToggle;
window.visitAdventure=visitAdventure;


// ! Start of City Card handling

// ? takes an array of cities objects and creates a City Card

const setCityCards = (cities_data) => {
  const grid = document.getElementsByClassName("grid")[0];
  cities_data.data.forEach((val) => {
    const grid_item_div = document.createElement("div");
    grid_item_div.classList.add("grid_item");
    grid_item_div.innerHTML = `
            <div class="city_card">
                <div class="back_card">
                    <div><button>View Adventures</a></div>
                </div>
                <div class="front_card">
                   <img src=${val.image} class="img">
                   <div class="city_places">${val.description}</div> 
                   <div class="city_name">${val.city}</div>
                   <div class="border"></div>
                </div>
           </div>`;
    grid_item_div.querySelector(".back_card button").addEventListener("click",()=>visitAdventure(val.city))
    grid.appendChild(grid_item_div);
  });
};

// ! End of City Card handling

// ! Start of Controller function

const run = async () => {
  const username = localStorage.getItem("username");
  if (username) {
    setNavbar(true);
  } else {
    setNavbar(false);
  }
  const cities_data = await fetchCities();
  if (cities_data) setCityCards(cities_data);
};

// ! End of Controller function

// ! IIFE
(async function () {
  run();
})();