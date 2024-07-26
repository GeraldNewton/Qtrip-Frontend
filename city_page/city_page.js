import getAdventures from "../apicall/getAdventures.js";

let adventures, filtered_adventures;
let filters = {
  category_list: [],
  duration: "all",
};

// ! Start of Navbar handling

// ? following 3 functions handles the navlinks toggler which comes into view when screen width decreases


const closeToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "0rem";
  document.getElementsByClassName("navicon")[0].style.display = "block";
};

const openToggle = () => {
  document.getElementsByClassName("navlinks_toggler")[0].style.height = "23rem";
  document.getElementsByClassName("navicon")[0].style.display = "none";
};

window.addEventListener("resize", () => {
  if (window.innerWidth > 500) {
    document.getElementsByClassName("navlinks_toggler")[0].style.height = "";
    document.getElementsByClassName("navicon")[0].style.display = "";
  }
});

// ! End of Navbar handling



// ! Start of User Category addition Handler

// ? when user adds one category by selecting it from categories selection dropdown

const addCategory = (e) => {
  if (!filters.category_list.length) {
    const category_section =
      document.getElementsByClassName("category_section")[0];
    category_section.innerHTML =
      category_section.innerHTML +
      `
        <div class="clear_categories" onclick="removeAllCategory()">clear all</div>
      `;
  }
  if (!filters.category_list.includes(e.target.value)) {
    filters.category_list.push(e.target.value);
    update_filters(filters);
    let categories = document.getElementsByClassName("categories")[0];
    categories.innerHTML =
      categories.innerHTML +
      `
            <div class="category" onclick="removeCategory(this)" value=${e.target.value}>
              <div class="category_name">${e.target.value}</div>
              <div class="cancel_category">clear</div>
            </div>        
        `;
  }
  document.getElementById("default_category").selected = true;
};

// ! End of User Category addition Handler


// ! Start of User Category subtraction Handler

// ? if user clears only one category by clicking on "clear" of the category tile
// ? as div does not have default attribute of value so we have to access it with getAttribute()

const removeCategory = (e) => {
  const city = e.getAttribute("value"); 
  const ind_element = filters.category_list.indexOf(city);
  filters.category_list.splice(ind_element, 1);
  update_filters(filters);
  if (!filters.category_list.length)
    document.getElementsByClassName("clear_categories")[0].remove();
  e.remove();
};

// ! End of User Category subtraction Handler



// ! Start of User Category all Removal Handler

// ? if remove all category is clicked

const removeAllCategory = () => {
  document.getElementsByClassName("categories")[0].innerHTML = "";
  document.getElementsByClassName("clear_categories")[0].remove();
  filters.category_list.length = 0;
  update_filters(filters);
};

// ! End of User Category all Removal Handler

// ! Start of Updating filter's duration in script

// ? updating duration of the filters when user selects the duration

const addDuration = (e) => {
  filters.duration = e.target.value;
  update_filters(filters);
};
// ! End of Updating filter's duration in script


// ! Start of Updating filters in local Storage

// ? updating filters in localstorage

const update_filters = (filters) => {
  localStorage.setItem("filters", JSON.stringify(filters));
  update_filters_data();
};

// ! End of Updating filters in local Storage



// ! Start of Setting Adventure cards

// ? updating the adventure cards which will be shown on the screen based upon the updated filters

const update_adventure_Cards = () => {
  document.getElementsByClassName("adventures")[0].innerHTML = "";
  if (!filtered_adventures.length) {
    if (document.getElementsByClassName("no_content")[0].innerHTML == "") {
      document.getElementsByClassName("no_content")[0].innerHTML = `
            <div class="content_absent">
            no adventure found for given categories and duration &#128542;
            </div>
            `;
    }
  } else {
    if (document.getElementsByClassName("no_content")[0].innerHTML != "")
      document.getElementsByClassName("no_content")[0].innerHTML = "";
    filtered_adventures.forEach((obj) => {
      document.getElementsByClassName("adventures")[0].innerHTML += `
            <div class="adventure_card" onclick="visitAdventure('${obj.name}')">
                <img class="img" src=${obj.image}>
                <div class="content">
                    <div class="Name">
                    ${obj.name}
                    </div>
                    <div class="Duration">
                        <div class="duration_title">Duration</div>
                        <div class="duration_value">${obj.duration} Hrs</div>
                        </div>
                    <div class="Cost">
                        <div class="cost_title">Cost</div>
                        <div class="cost_value">₹ ${obj.costPerHead}</div>
                    </div>
                </div>
                <div class="card_tile">${obj.category}</div>
            </div>
            `;
    });
  }
};

// ! End of Setting Adventure cards



// ! Start of updating filtered_adventures objects array

// ? updating the filtered_adventures based upon localstorage and user change

const update_filters_data = () => {
  filtered_adventures = adventures;
  if (filters.category_list.length && filters.category_list.length != 4)
    filtered_adventures = filtered_adventures.filter((obj) =>
      filters.category_list.includes(obj.category)
    );
  if (filters.duration != "all") {
    let duration_arr = filters.duration.split("-");
    let min = duration_arr[0];
    let max = duration_arr[1];
    filtered_adventures = filtered_adventures.filter(
      (obj) => obj.duration >= min && obj.duration <= max
    );
  }
  update_adventure_Cards();
};

// ! End of updating filtered_adventures objects array


// ! Start of setting filters by local Storage after initial rendering

// ? updating categories and duration based upon the localstorage filters after the initial loading of the page

const update_category_and_duration_by_localStorage = () => {
  if (filters.category_list.length) {
    const category_section =
      document.getElementsByClassName("category_section")[0];
    category_section.innerHTML =
      category_section.innerHTML +
      `
          <div class="clear_categories" onclick="removeAllCategory()">clear all</div>
        `;
    let categories = document.getElementsByClassName("categories")[0];
    filters.category_list.forEach((val) => {
      categories.innerHTML =
        categories.innerHTML +
        `
               <div class="category" onclick="removeCategory(this)" value=${val}>
                  <div class="category_name">${val}</div>
                  <div class="cancel_category">clear</div>
               </div> 
            `;
    });
  }
  if (filters.duration != "all") {
    let select = document.getElementsByClassName("select")[1]; // ? returns HTML Collection which is not an arry so we have to convert it into array using Array.from()
    let options = Array.from(select.options);
    const selected_option = options.find(
      (val) => filters.duration == val.value
    );
    selected_option.selected = true;
  }
};

// ! End of setting filters by local Storage after initial rendering

// ! Start of getting adventures array from backend

// ? gets the city and adventures array associated with it 
const get_city_location = () => {
  const query_string = location.search;
  const searchParams = new URLSearchParams(query_string);
  return searchParams.get("city");
};

const setAdventure = async () => {
  const city = get_city_location();
  const response = await getAdventures(city);
  if (response.data[0].adventures) {
    adventures = response.data[0].adventures;
    update_filters_data();
    update_adventure_Cards();
  }
  else{
    document.querySelector(".footer").style.position = "fixed";
    document.querySelector(".footer").style.bottom = "0rem";
  }
};

// ! End of getting adventures array from backend

// ! Start of handling moving to adventure page  

const visitAdventure=(adventure)=>window.location.href=`http://${location.host}/adventure_page/index.html?adventure=${adventure}`

// ! End of handling moving to adventure page 

window.openToggle = openToggle;
window.closeToggle = closeToggle;
window.addCategory = addCategory;
window.addDuration = addDuration;
window.removeCategory = removeCategory;
window.removeAllCategory = removeAllCategory;
window.visitAdventure=visitAdventure;


// ! Controller function

// ? IIFE to run when the script is parsed

(function () {
  if (localStorage.getItem("filters"))
  filters = JSON.parse(localStorage.getItem("filters"));
  update_category_and_duration_by_localStorage();
  setAdventure();
})();
