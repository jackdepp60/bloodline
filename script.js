const users = [];
const inputField = document.querySelector("input")
const addBtn = document.querySelector(".submit-btn");
// const viewBtn = document.querySelector(".user-list");
let userName = document.querySelector(".username");
let userLastName = document.querySelector(".lastname");
let userLocation = document.querySelector(".userlocationCity");
let userForm = document.querySelector(".add-user-form");
let mainData = document.querySelector(".main-data");
let tableData = document.querySelector("table");
let thData = document.querySelector("th");
const label = document.querySelector(".label-name");
const profileDiv = document.querySelector(".profile")
const mainDataDisplay = document.querySelector(".main-data-display")
const profileName = document.querySelector(".profile h4");
const viewBloodlineBtn = document.querySelector(".view-bloodline");
const bloodlineData = document.querySelector(".bloodline-data");
const titleSpan = document.querySelector(".title-wrapper span")
const totalPeople = document.querySelector(".counter p");
const totalPeopleDiv = document.querySelector(".counter");
const editProfile = document.querySelector(".edit-profile");
const profileh6 = document.querySelector(".counter h6");
const dataUl = document.querySelector(".data-ul");
const profilePic = document.querySelector(".image-wrapper");
const flagId = document.getElementById("flag-counter")




let currentUserLastName =  ""

document.addEventListener('DOMContentLoaded', function() {
  var storedFirstName = localStorage.getItem("firstname");
  var storedLastName = localStorage.getItem("lastname");

  if (storedFirstName && storedLastName) {
    profileName.textContent = storedFirstName + ' ' + storedLastName;
    currentUserLastName = storedLastName; // Set currentUserLastName to the saved lastname
    editProfile.innerHTML = "Edit name";
  } else {
    profileName.textContent = 'Hi! Add your name below!';
    editProfile.innerHTML = "Add your name"
  }
});



// FLAG COUNTER

// Get the existing flag counter list element
const countries = [
  { name: "Philippines", flag: "ph.png", count: 0 },
  { name: "United Kingdom", flag: "uk.png", count: 0 },
  { name: "Canada", flag: "ca.png", count: 0 },
  { name: "United States", flag: "us.png", count: 0 },
  { name: "China", flag: "china.png", count: 0 },
  { name: "United Arab Emirates", flag: "uae.png", count: 0 },
  { name: "Saudi Arabia", flag: "saudi.png", count: 0 },
  { name: "Australia", flag: "aus.png", count: 0 }
  
];

const flagCounter = document.getElementById("flag-counter");

// Get the visitor's IP address
const ipAddress = fetch('https://api.ipify.org/?format=json')
  .then(response => response.json())
  .then(data => data.ip)
  .catch(error => console.error(error));

const renderFlagCounter = () => {
  flagCounter.innerHTML = '';
  flagCounter.classList.add("flag-counter-number");
  countries.forEach(country => {
    const listItem = document.createElement("li");
    listItem.classList.add("counter-li")

    const flagImage = document.createElement("img");
    flagImage.src = `http://localhost/family-tree/flags/${country.flag}`;
    flagImage.classList.add("country-image");
    flagImage.alt = country.name;
    listItem.appendChild(flagImage);

    const counterDiv = document.createElement("div");
    counterDiv.className = "flag-meter";
    counterDiv.textContent = country.count;
    listItem.appendChild(counterDiv);

    flagCounter.appendChild(listItem);
  });
};

// Query the IP geolocation API and update the flag counter
const updateFlagCounter = async () => {
  try {
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=61a1e5cfd3a544eba56fe53383cbfb98&ip_address=${await ipAddress}&fields=country`);
    const data = await response.json();
    const country = data.country;
    const matchingCountry = countries.find(c => c.name === country);
    if (matchingCountry) {
      matchingCountry.count++;
      renderFlagCounter();
    }
  } catch (error) {
    console.error(error);
  }
};

renderFlagCounter();
updateFlagCounter();







  
// async function fetchUsersWithSameLastName(lastName) {
//   const response = await fetch(`http://localhost/ai-project/fetch_users.php?lastname=${encodeURIComponent(lastName)}`);
//   console.log(response); // Log the response object
//   const users = await response.json();
//   console.log(users.lastname); // Log the users array
//   return users;
// }



// label.addEventListener

let currentPage = 1;
const usersPerPage = 3;

// EDIT PROFILE

editProfile.addEventListener("click", (e)=>{
  e.preventDefault();
  const mostNamesDiv = document.querySelector(".most-names");
  mostNamesDiv.classList.add("hide-most-names")
  // localStorage.clear();
  totalPeopleDiv.classList.add("counter-hidden")
  // totalPeopleDiv.style.visibility = "hidden"
  userForm.classList.remove("hide-form");
  profileDiv.classList.add("hide-profile");
  bloodlineData.classList.add("hidden-bloodline-data")
  // addUserEnabled();



  var storedFirstName = localStorage.getItem("firstname");
  var storedLastName = localStorage.getItem("lastname");

  if (storedFirstName && storedLastName) {
    profileName.textContent = storedFirstName + ' ' + storedLastName;
    currentUserLastName = storedLastName; // Set currentUserLastName to the saved lastname
    editProfile.innerHTML = "Edit name";
  } else {
    profileName.textContent = 'Hi! Add your name below!';
    editProfile.innerHTML = "Add your name"
  }
  // addUser();
  // add-userForm.classList.remove("hide-form");
})


// ALERT ADDED USER

function showAlert() {
  // Show the custom alert prompt
  document.getElementById("custom-alert").classList.add("show");
  document.getElementById("custom-alert").classList.remove("hidden-alert");
}

function hideAlert() {
  // Hide the custom alert prompt
  document.getElementById("custom-alert").classList.add("hidden-alert");
  document.getElementById("custom-alert").classList.remove("show");
}



// addUserMenu.addEventListener("click",(user)=>{
//   user.preventDefault();
//   localStorage.clear();
//   console.log("edit")
// })


function upperCase(str) {
  const locationOutputFirstChar = str.charAt(0).toUpperCase();
  const locationOutputRestLetters = str.slice(1);

  return locationOutputFirstChar + locationOutputRestLetters;
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // totalPeopleDiv.classList.add("counter-hidden")
  // userForm.classList.add("hide-form");
  //   profileDiv.classList.remove("hide-profile");
  // addUserEnabled();
  const inputValue = inputField.value.trim();
  const nameValue = userName.value.trim();
  const lastNameValue = userLastName.value.trim();
  const LocationValue = userLocation.value.trim();


  

  if (nameValue.length < 3 || lastNameValue.length < 3 || LocationValue.length < 3) {
    alert('Input must be at least 3 characters long.');
  } else if (!inputValue) {
    alert('Input must not be empty.');
  } else {
    // Submit form data or do something else with the input value
    totalPeopleDiv.classList.add("counter-hidden")
  userForm.classList.add("hide-form");
    profileDiv.classList.remove("hide-profile");
    // totalPeopleDiv.style.visibility = "hidden"
  addUserEnabled();
  }

});


viewBloodlineBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  displayBloodline();

  setTimeout(() => {
    if (!bloodlineData.classList.contains("hidden-bloodline-data")) {
      const yOffset = getOffsetTop(flagId);
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }, 100); // Adjust the timeout duration as needed

});


function getOffsetTop(element) {
  let offsetTop = element.offsetTop;
  let parent = element.offsetParent;

  while (parent) {
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return offsetTop;
}


function addUserEnabled() {
  const user = {
    name: userName.value,
    lastname: userLastName.value,
    location: userLocation.value
  };
  users.push(user);
  saveUserToDatabase(user);

  // Save the user data to local storage
  saveUserToLocalstorage(user);


  showAlert();

  // Set the profile name to the user's name and last name
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Function to capitalize the first letter of each word in a string
  function capitalizeWords(str) {
    const words = str.split(" ")
    const capitalCombined = words.map(capitalizeFirstLetter)
    const finalWords = capitalCombined.join(" ")
    return finalWords;
  }

  // Capitalize the first letter of each word in the username and lastname
  const capitalizedUsername = capitalizeWords(user.name);
  const capitalizedLastname = capitalizeWords(user.lastname);


  profileName.innerHTML = capitalizedUsername + " " + capitalizedLastname;

   currentUserLastName = capitalizedLastname; // Store the user's last name in the variable.

  // Clear the input fields
  userName.value = "";
  userLastName.value = "";
  userLocation.value = "";
}



// LOCALSTORAGE
function saveUserToDatabase(user) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "save_user.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("User saved to the database");
      // Save the user data to local storage
      saveUserToLocalstorage(user);
    }
  }

  const params = `name=${encodeURIComponent(user.name)}&lastname=${encodeURIComponent(user.lastname)}&location=${encodeURIComponent(user.location)}`;
  xhr.send(params);
}

function saveUserToLocalstorage(user) {
  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Function to capitalize the first letter of each word in a string
  function capitalizeWords(str) {
    const words = str.split(" ")
    const capitalCombined = words.map(capitalizeFirstLetter)
    const finalWords = capitalCombined.join(" ")
    return finalWords;
  }

  // Capitalize the first letter of each word in the username and lastname
  const capitalizedUsername = capitalizeWords(user.name);

  const capitalizedLastname = capitalizeWords(user.lastname);
 

  // Retrieve the existing user data from local storage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Add the new user data to the array
  users.push(user);

  // Save the updated user data to local storage
  localStorage.setItem("users", JSON.stringify(users));

  // Save the user's full name with capitalized first letters of each word to local storage
  localStorage.setItem("firstname", capitalizedUsername);
  localStorage.setItem("lastname", capitalizedLastname);
}





// MAP
function displayMap(username, lastname, location, mapContainer) {
  // Get the coordinates for the user's location using a geocoding service
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyDbuY_tDlZLjxWs2MvgUrEiW0r0Cm7XO7g`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const coordinates = data.results[0].geometry.location;
        console.log(location);

        const icon = {
          url: "img/marker-icon.png",
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 50),
          scaledSize: new google.maps.Size(50, 50)
        };

       
        // Initialize the map with the user's coordinates
        const mapOptions = {
          center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
          zoom: 13
        };
        // const mapContainer = document.getElementById(mapContainerId);
        const map = new google.maps.Map(mapContainer, mapOptions);
        const contentString = `
        <div>
          <h3>${username} ${lastname} </h3>
          <p>${location}</p>
        </div>
      `;

      // Create the info window
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      // Add a marker for the user's location
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
        map: map,
        icon: icon,
        path: "img/dash-pic.jpg",
        label: {
          text: username + " " + lastname,
          color: "white",
          className: "marker"
        }
      });


      // Add a click event listener to the marker to open the info window
      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    } else {
      throw new Error('Location not found');
    }
  })  
    .catch(error => {
      console.error(error);
      mapContainer.innerHTML = `The location ${upperCase(location)} is not found!`;
      mapContainer.style.maxWidth = "200px";
      mapContainer.style.height = "150px";
      mapContainer.style.textAlign = "center";
      mapContainer.style.backgroundColor = "#95B1AE";
      mapContainer.style.color = "white";
      mapContainer.style.padding = "10px 10px" 
      
    });
}



// COUNT THE MOST NUMBER OF LASTNAMES
function fetchAllLastNames(lastName, callback) {
  const xhr = new XMLHttpRequest();
  const url = `http://localhost/family-tree/fetch_all_users.php?lastname=${encodeURIComponent(lastName)}`;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        const users = JSON.parse(xhr.responseText);
        callback(null, users);
      } catch (error) {
        console.error(error);
        callback(error);
      }
    }
  };

  xhr.open("GET", url, true);
  xhr.send();
}

let hasRun = false;

function fetchAndUpdateLastNames() {
  fetchAllLastNames("", function (error, allLastNames) {
    if (error) {
      console.error(error);
      return;
    }

    const lastNameCount = {};
    allLastNames.forEach(lastName => {
      if (lastNameCount[lastName]) {
        lastNameCount[lastName]++;
      } else {
        lastNameCount[lastName] = 1;
      }
    });

    const [mostCommonLastName, count] = Object.entries(lastNameCount)
      .reduce((acc, [lastName, count]) => {
        if (count > acc[1]) {
          return [lastName, count];
        } else {
          return acc;
        }
      }, ["", 0]);

    const mostNamesDiv = document.querySelector(".most-names");
    mostNamesDiv.innerHTML = ''; // Clear previous content
    const mostNamesContent = document.createElement('p');
    mostNamesContent.innerHTML = `The most common Family Name is, "<strong>${(mostCommonLastName).toLocaleUpperCase()}</strong>", with ${count} registered users.`;

    mostNamesDiv.appendChild(mostNamesContent);
    // console.log(`The most common last name is "${mostCommonLastName}" with ${count} occurrences.`);
  });
}

const mostNamesDiv = document.querySelector(".most-names");
const updateInterval = 30000; // Set this to desired update interval in milliseconds

setInterval(fetchAndUpdateLastNames, updateInterval);
viewBloodlineBtn.addEventListener('click', () => {
  fetchAndUpdateLastNames();
  mostNamesDiv.classList.toggle("hide-most-names");
});





// ASYNC FUNCTION TO FETCH SAME LASTNAMES

async function fetchUsersWithSameLastName(lastName) {
  const response = await fetch(`http://localhost/family-tree/fetch_users.php?lastname=${encodeURIComponent(lastName)}`);
  // console.log("LASTNAMES: " , lastName)
  // console.log(response); // Log the response object
  const users = await response.json();  
  // console.log(users); // Log the users array
  const pisti = users.map(user => user.lastname);
  // console.log(pisti); // Log the array of last names
  return users;
}



// DISPLAY THE TABLE AND ITS SAME LASTNAMES

function displayBloodline() {

  // profileh6.style.visibility = "visible";
  // totalPeopleDiv.style.visibility = "visible";
  // let currentUserLastName = ""; // Add this variable at the beginning of your code, outside the functions.
  bloodlineData.classList.toggle("hidden-bloodline-data");
  totalPeopleDiv.classList.toggle("counter-hidden");
  while (bloodlineData.firstChild) {
    bloodlineData.removeChild(bloodlineData.firstChild);
  }

  // const profileLastName = profileName.textContent.split(" ")[1];
  const itemsPerPage = 5;
  let currentPage = 1;

  fetchUsersWithSameLastName(currentUserLastName)
    .then((sameLastNameUsers) => {
    
      
      if (sameLastNameUsers.length <= 1) {
        totalPeople.innerHTML =  "0";
        bloodlineData.classList.add("hidden-bloodline-data")
        console.log("same last names: " + parseInt(sameLastNameUsers.length - 1))
      }
      else {
        totalPeople.innerHTML = sameLastNameUsers.length - 1;
        console.log("same last names: " + parseInt(sameLastNameUsers.length - 1))
      }
      function displayPage(page) {
        while (bloodlineData.firstChild) {
          bloodlineData.removeChild(bloodlineData.firstChild);
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(sameLastNameUsers.length, startIndex + itemsPerPage);

        const table = document.createElement("table");
        table.setAttribute("id", "test-table")

      
        const headerRow = document.createElement("tr");
        const nameHeader = document.createElement("th");
        const locationHeader = document.createElement("th");
        nameHeader.textContent = "Name";
        locationHeader.textContent = "Location";
        headerRow.appendChild(nameHeader);
        headerRow.appendChild(locationHeader);
        table.appendChild(headerRow);

        if (bloodlineData.classList.contains("hidden-bloodline-data")){
          table.style.display = "none";
        }
        else {
          table.style.display = "table";
        }

        for (let i = startIndex; i < endIndex; i++) {
          const user = sameLastNameUsers[i];
          const userRow = createUserRow(user);
          table.appendChild(userRow);
        }

        bloodlineData.appendChild(table);
        bloodlineData.appendChild(createPaginationControls(sameLastNameUsers.length, itemsPerPage, displayPage, page));
      }

      displayPage(currentPage);
     
    })
    .catch((error) => {
      console.error(error);
      bloodlineData.innerHTML = "Error fetching users with same last name";
    });
}


let currentMapDiv;

function createUserRow(user) {
  const userRow = document.createElement("tr");
  const nameCell = document.createElement("td");
  const locationCell = document.createElement("td");

  function upperCase(str) {
    const locationOutputFirstChar = str.charAt(0).toUpperCase();
    const locationOutputRestLetters = str.slice(1);

    return locationOutputFirstChar + locationOutputRestLetters;
  }

  userRow.appendChild(nameCell);
  userRow.appendChild(locationCell);

  const nameDiv = document.createElement("div");
  const locationDiv = document.createElement("div");

  nameDiv.innerHTML = upperCase(user.name) + " " + upperCase(user.lastname);
  locationDiv.innerHTML = upperCase(user.location);

  nameCell.appendChild(nameDiv);
  locationCell.appendChild(locationDiv);

  if(userRow.hasChildNodes(locationCell)) {
    locationCell.classList.add("location-cell");
  }

  if (userRow.hasChildNodes(nameCell)) {
    nameCell.classList.add("names-cell");
  }

  // Add a click event listener to the row
 // Add a click event listener to the row
userRow.addEventListener("click", (e) => {
  e.stopPropagation();

  const existingMap = document.getElementById("map-container");
  if (existingMap) {
    existingMap.remove();
  }

  const modal = document.createElement("div");
  modal.classList.add("map-modal");
  document.body.appendChild(modal);

  const mapContainer = document.createElement("div");
  const mapContainerId = "map-container";
  
  mapContainer.id = mapContainerId;
  modal.appendChild(mapContainer);

  displayMap(user.name, user.lastname, user.location, mapContainer);

  modal.addEventListener("click", (event) => {
    if(event.target === modal){
      modal.remove();
    }
  });
});

  

  return userRow;
}







// PAGINATION CONTROLS
function createPaginationControls(totalItems, itemsPerPage, displayPage, currentPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationControls = document.createElement("div");
  paginationControls.classList.add("pagination-controls");

  const firstButton = document.createElement("button");
  firstButton.classList.add("pageBtn");
  firstButton.classList.add("firstBtn");
  firstButton.innerHTML = "<<";
  firstButton.addEventListener("click", () => displayPage(1));
  paginationControls.appendChild(firstButton);

  const prevButton = document.createElement("button");
  prevButton.classList.add("pageBtn");
  prevButton.classList.add("prevBtn");
  prevButton.innerHTML = "<";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) displayPage(currentPage - 1);
  });
  paginationControls.appendChild(prevButton);

  const pageNumbersContainer = document.createElement("div");
  pageNumbersContainer.classList.add("page-numbers-container");

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.classList.add("pageBtn");
    pageNumber.textContent = i;
    pageNumber.addEventListener("click", () => displayPage(i));
    if (i === currentPage) {
      pageNumber.classList.add("active-page-btn");
    }
    pageNumbersContainer.appendChild(pageNumber);
  }

  paginationControls.appendChild(pageNumbersContainer);

  const nextButton = document.createElement("button");
  nextButton.classList.add("pageBtn");
  nextButton.classList.add("nextBtn");
  nextButton.innerHTML = ">";
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      displayPage(currentPage + 1);
    }
  });
  paginationControls.appendChild(nextButton);

  const lastButton = document.createElement("button");
  lastButton.classList.add("pageBtn");
  lastButton.classList.add("lastBtn");
  lastButton.innerHTML = ">>";
  lastButton.addEventListener("click", () => displayPage(totalPages));
  paginationControls.appendChild(lastButton);

  return paginationControls;
}




function initMap() {
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': location }, function (results, status) {
    if (status == 'OK') {
      let map = new google.maps.Map(element, {
        zoom: 8,
        center: results[0].geometry.location
      });
      let marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}


// INPUT LIMIT

const nameLimit = document.querySelector('.name-limit');
const nameLimitContent = document.querySelector('.name-limit p');

const lastnameLimit = document.querySelector('.lastname-limit');
const lastnameLimitContent = document.querySelector('.lastname-limit p');

const locationLimit = document.querySelector('.location-limit');
const locationLimitContent = document.querySelector('.location-limit p');

const characterLimit = 12;







userName.addEventListener('input', () => {
  if (userName.value.length >= characterLimit) {
    userName.value = userName.value.substring(0, characterLimit);
    showNameLimit();
    console.log("limit")
  }
});

userLastName.addEventListener('input', () => {
  if (userLastName.value.length >= characterLimit) {
    userLastName.value = userLastName.value.substring(0, characterLimit);
    showLastNameLimit();
    console.log("limit")
  }
});

userLocation.addEventListener('input', () => {
  if (userLocation.value.length >= characterLimit) {
    userLocation.value = userLocation.value.substring(0, characterLimit);
    showLocationLimit();
    console.log("limit")
  }
});




window.addEventListener('click', (e) => {
  if (e.target !== nameLimit || e.target !== nameLimitContent || e.target !== lastnameLimit || e.target !== lastnameLimitContent || e.target !== locationLimit || e.target !== locationLimitContent) {
    closeNameLimit();
    closeLastNameLimit();
    closeLocationLimit();
    console.log("clicked")
  }
});

function showNameLimit() {
  nameLimit.style.display = 'flex';
}

function closeNameLimit() {
  nameLimit.style.display = 'none';
}

function showLastNameLimit() {
  lastnameLimit.style.display = 'flex';
}


function closeLastNameLimit() {
  lastnameLimit.style.display = 'none';
}

function showLocationLimit() {
  nameLimit.style.display = 'flex';
}

function closeLocationLimit() {
  nameLimit.style.display = 'none';
}
