import fetchCities from "../apicall/fetchCities.js";

// ! Start of Navbar handling

// ? following 3 functions handles the navlinks toggler which comes into view when screen width decreases

const closeToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "0rem";
  document.getElementsByClassName("navicon")[0].style.display = "block";
};

const openToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "15rem";
  document.getElementsByClassName("navicon")[0].style.display = "none";
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 500) {
    document.getElementsByClassName("navlinks_toggler")[0].style.height = "";
    document.getElementsByClassName("navicon")[0].style.display = "";
  }
});
window.openToggle=openToggle;
window.closeToggle=closeToggle;

// ! End of Navbar handling

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
                    <div><a href="../city_page/index.html?city=${val.city}">View Adventures</a></div>
                </div>
                <div class="front_card">
                   <img src=${val.image} class="img">
                   <div class="city_places">${val.description}</div> 
                   <div class="city_name">${val.city}</div>
                   <div class="border"></div>
                </div>
           </div>`;
    grid.appendChild(grid_item_div);
  });
};

// ! End of City Card handling

// ! Start of Controller function

const run = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const cities_data = await fetchCities(token);
    if (cities_data) setCityCards(cities_data);
  } else {
    alert(
      "Cannot access the landing page due to faulty login, You can login again"
    );
  }
};

// ! End of Controller function

// ! IIFE
(async function () {
  run();
})();