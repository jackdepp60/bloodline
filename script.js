const users = [];
const addBtn = document.querySelector(".submit-btn");
const viewBtn = document.querySelector(".user-list");
let userName = document.querySelector(".username");
let userLastName = document.querySelector(".lastname");
let userLocation = document.querySelector(".userlocationCity");
let userForm = document.querySelector(".add-user-form");
let addUserMenu = document.querySelector(".add-user");
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
const totalPeople = document.querySelector(".total");


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

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addUserEnabled();
});

addUserMenu.addEventListener("click", (e) => {
  e.preventDefault();
  titleSpan.innerHTML = "Add your name"
  userName.value = "";
  userLastName.value = "";
  userLocation.value = "";
  addUser();
  const bloodLineLocationChild = document.querySelector(".bloodline-location");
  if (bloodLineLocationChild) {
    mainData.removeChild(bloodLineLocationChild);
  }
});


viewBtn.addEventListener("click", () => {
  titleSpan.innerHTML = "Profile"
  viewUser();
});

viewBloodlineBtn.addEventListener("click", displayBloodline);


function addUser() {
  userForm.classList.remove("hide-form");
  tableData.classList.add("hide-ulData");
  profileDiv.classList.add("hide-profile")
  mainData.classList.remove("main-data-display");
  bloodlineData.classList.add("hidden-bloodline-data");
}

function addUserEnabled() {
  const user = {
    name: userName.value,
    lastname: userLastName.value,
    location: userLocation.value
  };
  users.push(user);
  saveUserToDatabase(user); // Add this line
  profileName.innerHTML = user.name + " " + user.lastname;
  userName.value = "";
  userLastName.value = "";
  userLocation.value = "";
}


function viewUser() {
  userForm.classList.add("hide-form");
  // tableData.classList.remove("hide-ulData");
  profileDiv.classList.remove("hide-profile")
  mainData.classList.add("main-data-display")
  bloodlineData.classList.remove("hidden-bloodline-data");
  displayBloodline();
  console.log("test")
}

// AJAX REQUEST
function saveUserToDatabase(user) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "save_user.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log("User saved to the database");
    }
  }

  const params = `name=${encodeURIComponent(user.name)}&lastname=${encodeURIComponent(user.lastname)}&location=${encodeURIComponent(user.location)}`;
  xhr.send(params);
}




// MAP
function displayMap(location, testChild) {
  // Get the coordinates for the user's location using a geocoding service
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyDbuY_tDlZLjxWs2MvgUrEiW0r0Cm7XO7g`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const coordinates = data.results[0].geometry.location;
        // testChild.style.display = "flex"
        testChild.style.height = "500px";
        testChild.style.width = "100%";
        testChild.style.maxWidth = "850px";
        // Initialize the map with the user's coordinates
        const mapOptions = {
          center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
          zoom: 13
        };
        const map = new google.maps.Map(testChild, mapOptions);

        // Add a marker for the user's location
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
          map: map,
        });
      } else {
        throw new Error('Location not found');
      }
    })  
    .catch(error => {
      console.error(error);
      testChild.innerHTML = "The location " + location + " is not found!";
      testChild.style.color = "black";
      testChild.style.width = "300px"
      testChild.style.height = "200px"
      testChild.style.background = "rgb(67, 203, 221)";
    });
}



async function fetchUsersWithSameLastName(lastName) {
  const response = await fetch(`http://localhost/ai-project/fetch_users.php?lastname=${encodeURIComponent(lastName)}`);
  console.log(lastName)
  console.log(response); // Log the response object
  const users = await response.json();
  console.log(users); // Log the users array
  const pisti = users.map(user => user.lastname);
  console.log(pisti); // Log the array of last names
  return users;
}

function displayBloodline() {
  // Clear the existing bloodline data
  while (bloodlineData.firstChild) {
    bloodlineData.removeChild(bloodlineData.firstChild);
  }

  // Create a new div for the bloodline location if it doesn't exist
  let bloodLineLocationChild = document.querySelector(".bloodline-location");
  if (!bloodLineLocationChild) {
    bloodLineLocationChild = document.createElement("div");
    mainData.appendChild(bloodLineLocationChild);
    bloodLineLocationChild.classList.add("bloodline-location");
  }

  const profileLastName = profileName.textContent.split(" ")[1];
  console.log("this is profile name: " + profileLastName)
  fetchUsersWithSameLastName(profileLastName)
    .then(sameLastNameUsers => {
      sameLastNameUsers.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.innerHTML = "Name: " + user.name + " " + user.lastname + "<br>" + user.location;
        bloodlineData.appendChild(userDiv);
        userDiv.classList.add("bloodline-child");

        userDiv.addEventListener("click", (e) => {
          // Prevent the click event from propagating to the document
          e.stopPropagation();

          // Clear the existing bloodline location data
          while (bloodLineLocationChild.firstChild) {
            bloodLineLocationChild.removeChild(bloodLineLocationChild.firstChild);
          }

          // Remove any existing .test divs
          const existingTestDivs = document.querySelectorAll(".test");
          existingTestDivs.forEach(testDiv => {
            testDiv.remove();
          });

          // Create a new div for the clicked user's location and map
          const testChild = document.createElement("div");
          testChild.id = "map";
          testChild.classList.add("test");

          // Insert the .test div just after the clicked userDiv
          userDiv.insertAdjacentElement("afterend", testChild);

          // Display the map in the testChild div
          displayMap(user.location, testChild);

          console.log(user.location);
        });
      });
      totalPeople.innerHTML = sameLastNameUsers.length;
    })
    .catch(error => {
      console.error(error);
      bloodlineData.innerHTML = "Error fetching users with same last name";
    });

  document.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("test") &&
      !e.target.classList.contains("bloodline-child") &&
      !e.target.closest(".test") &&
      !e.target.closest(".bloodline-child")
    ) {
      const testDivs = document.querySelectorAll(".test");
      testDivs.forEach(testDiv => {
        testDiv.style.display = "none";
      });
    }
  });
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
