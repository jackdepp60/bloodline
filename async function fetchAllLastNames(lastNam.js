async function fetchAllLastNames(lastName) {
    try {
      const response = await fetch(`http://localhost/family-tree/fetch_all_users.php?lastname=${encodeURIComponent(lastName)}`)
      const users = await response.json();
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  let hasRun = false;
  
  async function fetchAndUpdateLastNames() {
    if (hasRun) {
      return;
    }
    hasRun = true;
  
    try {
      const allLastNames = await fetchAllLastNames();
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
  
      const mostNamesDiv = document.querySelector(".most-names")
      const mostNamesContent = document.createElement('p');
      mostNamesContent.textContent = `The most common last name is "${mostCommonLastName}" with ${count} occurrences.`;
      
      mostNamesDiv.appendChild(mostNamesContent);
      // mostNamesDiv.classList.toggle("hide-most-names")
      console.log(`The most common last name is "${mostCommonLastName}" with ${count} occurrences.`);
    } catch (error) {
      console.error(error);
    }
  }
  
    viewBloodlineBtn.addEventListener('click', fetchAndUpdateLastNames, () =>{
      mostNamesDiv.classList.toggle("hide-most-names")
    });
  
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




    function createPaginationControls(totalItems, itemsPerPage, displayPage, currentPage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationControls = document.createElement("div");
        paginationControls.classList.add("pagination-controls");
      
        const firstButton = document.createElement("button");
        firstButton.classList.add("pageBtn");
        firstButton.classList.add("firstBtn");
        firstButton.innerHTML   = "<<";
        firstButton.addEventListener("click", () => displayPage(1));
        paginationControls.appendChild(firstButton);
      
        const prevButton = document.createElement("button");
        prevButton.classList.add("pageBtn");
        prevButton.classList.add("prevBtn");
        prevButton.innerHTML   = "<";
        prevButton.addEventListener("click", () => {
          if (currentPage > 1)
      
          displayPage(currentPage - 1);
        });
        paginationControls.appendChild(prevButton);
      
        const pageNumbersContainer = document.createElement("div");
        pageNumbersContainer.classList.add("page-numbers-container");
      
        for (let i = 1; i <= totalPages; i++) {
          const pageNumber = document.createElement("button");
          pageNumber.classList.add("pageBtn")
          pageNumber.textContent = i;
          pageNumber.addEventListener("click", () => displayPage(i));
          if (i === currentPage) {
            pageNumber.classList.add("active-page-btn");
          }
          pageNumbersContainer.appendChild(pageNumber);
      
          if (pageNumber.classList.contains("active-page-btn")){
            console.log("active page");
            // pageNumber.display.color = "red"
          }
        }
      
        
      
        paginationControls.appendChild(pageNumbersContainer);
      
        const nextButton = document.createElement("button");
        nextButton.classList.add("pageBtn");
        nextButton.classList.add("nextBtn");
        nextButton.innerHTML   = ">";
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