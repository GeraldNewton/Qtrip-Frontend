import fetchAdventure_details from "../apicall/fetchAdventure_details.js";
import make_reservation from "../apicall/makeResservation.js";

//! Start of Toggling of navbar

// ? following 3 functions handles the navlinks toggler which comes into view when screen width decreases

const closeToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "0rem";
  document.getElementsByClassName("navicon")[0].style.display = "block";
};

const openToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "25rem";
  document.getElementsByClassName("navicon")[0].style.display = "none";
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 500) {
    document.getElementsByClassName("navlinks_toggler")[0].style.height = "";
    document.getElementsByClassName("navicon")[0].style.display = "";
  }
});

//! End of Toggling of navbar

let data_obj;

// ! Start of Caraousal handling

// ? handles the caraousal image movement

let curr = 0;

const nextImage = () => {
  if (curr < 2) {
    if (curr == 0)
      document.querySelector(`.caraousal .navigate .prev`).style.opacity = "1";
    curr++;
    move(curr);
    if (curr == 2)
      document.querySelector(`.caraousal .navigate .next`).style.opacity =
        "0.3";
  }
};

const prevImage = () => {
  if (curr > 0) {
    if (curr == 2)
      document.querySelector(`.caraousal .navigate .next`).style.opacity = "1";
    curr--;
    move(curr);
    if (curr == 0)
      document.querySelector(`.caraousal .navigate .prev`).style.opacity =
        "0.3";
  }
};

const move = (curr) => {
  const img_container = document.querySelector(
    `.content .caraousal .img_container`
  );
  const img_size = document.querySelector(`.img_container img`).clientWidth;
  let cal = curr * img_size;
  img_container.style.transform = `translateX(-${cal}px)`;
};

// ! End of Caraousal handling

//  ! Start of form handling

const adjustCost = (e) =>
  (document.querySelector(".booking .total_cost .cost").textContent = `Rs. ${
    e.target.value * 2250
  }`);

const handleForm = async (e) => {
  e.preventDefault();
  const book_obj = {
    name: e.target.elements["name"].value,
    date: e.target.elements["date"].value,
    number: e.target.elements["number"].value,
    adventureName: data_obj.name,
    price: data_obj.costPerHead,
    date_of_resevation: new Date(),
  };
  const response = await make_reservation(book_obj);
  if (response) {
    setFormOrNotavailable(response);
    alert("Congratulations! Reservation Done");
    alert("Head over to Reservation Page to see your Reservations");
  }
};

//  ! End of form handling

// ! Start of Caraousal and Description setter

const setDetail = () => {
  const content = document.querySelector(".wrapper .content");

  content.innerHTML = `
  <div class="caraousal">
           <div class="img_container">
              ${data_obj.images
                .map(
                  (val) => `<img
               src=${val}
               alt=""
              />`
                )
                .join("")}
           </div>
           <div class="navigate">
             <i
               class="fa-solid fa-chevron-left navigate prev"
               onclick="prevImage()"
            ></i>
            <i
               class="fa-solid fa-chevron-right navigate next"
               onclick="nextImage()"
             ></i>
           </div>
           </div>
           <div class="info">
          <hr />
          <div class="name">${data_obj.name}</div>
          <div class="subtittle">${data_obj.subtitle}</div>
          <div class="description">
            ${data_obj.content}
          </div>
        </div>
  `;
};

// ! End of Caraousal and Description setter

// ! Start of Form or Not Available setter

const setFormOrNotavailable = (obj) => {
  // ? sets form or not available based upon whether reservation can be made or not

  //? setting form

  if (obj.available == true && !document.querySelector(".booking")) {
    if (document.querySelector(".not_available"))
      document.querySelector(".not_available").remove();
    const form = document.createElement("form");
    form.classList.add("booking");
    form.addEventListener("submit", handleForm);
    form.innerHTML = `
    <div class="heading">Booking Open!</div>
    <div class="input_container">
    <label for="name">Name:</label>
    <input id="name" name="name" type="text" required />
    </div>
    <div class="input_container">
    <label for="date">Choose date:</label>
    <input id="date" type="date" name="date"/>
    </div>
    <div class="input_container">
    <label for="number">No. of people:</label>
    <input
    id="number"
    name="number"
    type="number"
    min="1"
    max="20"
    oninput="adjustCost(event)"
    />
    </div>
    <div class="cost_per_head">
    <div>Cost per person:</div>
    <div class="cost">Rs. ${obj.costPerHead}</div>
    </div>
    <div class="total_cost">
    <div>Total cost:</div>
    <div class="cost">Rs. 0</div>
    </div>
    <button type="submit">Book</button>
    `;
    document.querySelector(".wrapper").append(form);
  }

  //? setting not available

  if (obj.available == false && !document.querySelector(".not_available")) {
    if (document.querySelector(".booking"))
      document.querySelector(".booking").remove();
    const not_available = document.createElement("div");
    not_available.classList.add("not_available");
    not_available.innerHTML = `
      <div>No Reservation</div>
      <div>Due to excess Reservations no further Bookings can be done</div>
    `;
    document.querySelector(".wrapper").append(not_available);
  }
};

// ! End of Form or Not Available setter


// ! Start of getting adventures and setting the data_obj

const findAdventure = () => {
  const query_string = location.search;
  const URL_string = new URLSearchParams(query_string);
  const adventure = URL_string.get("adventure");
  return adventure;
};
const getAdventure = async () => {
  const adventure_name = findAdventure();
  const res = await fetchAdventure_details(adventure_name);
  if (!res) {
    document.querySelector(".wrapper").remove();
    document.querySelector(".footer").style.position = "fixed";
    document.querySelector(".footer").style.bottom = "0rem";
    return false;
  }
  data_obj = res.data[0];
  return true;
};

// ! End of getting adventures and setting the data_obj



window.adjustCost = adjustCost;
window.handleForm = handleForm;
window.prevImage = prevImage;
window.nextImage = nextImage;
window.openToggle = openToggle;
window.closeToggle = closeToggle;


// ! Start of Controller function

const run = async () => {
  const bool = await getAdventure();
  if (bool) {
    setDetail();
    setFormOrNotavailable(data_obj);
  }
};

// ! Start of Controller function


// ! IIFE to run on parsing

(function () {
  run();
})();
