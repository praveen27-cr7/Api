let countriesData = [];
let filterData = []
let currentPage = 1;
const countriesPerPage = 10;

 fetch("https://restcountries.com/v3.1/all").then((response) => response.json()).then((data) => {

    countriesData =  data
    filterData = data
    displayCountries();
    setupPagination();
})
     

function displayCountries() {
    let countriesTable = document.getElementById("countries-table-body");
    countriesTable.innerHTML = "";
    
    let startIndex = (currentPage - 1) * countriesPerPage;
    let endIndex = startIndex + countriesPerPage;
    let paginatedCountries = countriesData.slice(startIndex, endIndex);
    
    paginatedCountries.forEach((country, index) => {
        let millionVal = (country.population / 1000000).toFixed(2);
        const currencies = country.currencies;
        let currencyName = "N/A";
        let currencySymbol = "N/A";

        if (currencies) {
            let firstCurrency = Object.values(currencies)[0];
            currencyName = firstCurrency.name || "N/A";
            currencySymbol = firstCurrency.symbol || "N/A";
        }

        let row = `<tr>
                <td>${startIndex + index + 1}</td>
                <td>${country.name.common}</td>
                <td>${country.capital}</td>
                <td>${country.region}</td>
                <td>${millionVal}M</td>
                <td>${currencyName} (${currencySymbol})</td>
                <td><img src="${country.flags.png}" width="50"></td>
                <td><button class="js-showbtn" onclick="showDetails('${country.name.common}')">Show Details</button></td>
            </tr>`;
        countriesTable.innerHTML += row;
    });

    updatePaginationButtons();
}

async function showDetails(countryName) {
    try {
        let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        let countryData = await response.json();
        let country = countryData[0];

        let millionVal = (country.population / 1000000).toFixed(2);
        let currencyName = "N/A";
        let currencySymbol = "N/A";
        let languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";

        if (country.currencies) {
            let firstCurrency = Object.values(country.currencies)[0];
            currencyName = firstCurrency.name || "N/A";
            currencySymbol = firstCurrency.symbol || "N/A";
        }

        let popup = document.getElementById("popup");
        popup.innerHTML = `
            <p class="countryName">${country.name.common}</p>
            <div class="popDetails">
                <ul>
                    <li><img src="${country.flags.png}" class="popupImg"></li>
                    <li>Capital: ${country.capital || "N/A"}</li>
                    <li>Population: ${millionVal}M</li>
                    <li>Region: ${country.region}</li>
                    <li>Languages: ${languages}</li>
                    <li>Currency: ${currencyName} (${currencySymbol})</li>
                </ul>
            </div>
            <button id="close" onclick="closePopup()">&#10006</button>
        `;
        document.getElementById("popup").style.display = "block";
        document.getElementById("opacity").style.display = "block";
    } catch (error) {
        console.error("Error fetching country details:", error);
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("opacity").style.display = "none";
}

function setupPagination() {
    let paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = `
        <button id="prevPage" onclick="changePage(-1)">Previous</button>
        <span id="pageInfo"></span>
        <button id="nextPage" onclick="changePage(1)">Next</button>
    `;
    updatePaginationButtons();
}

function updatePaginationButtons() {
    let totalPages = Math.ceil(countriesData.length / countriesPerPage);
    // document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

function changePage(direction) {
    let totalPages = Math.ceil(countriesData.length / countriesPerPage);
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    displayCountries();
}

// let getInput;
// getInput = document.getElementById('inputCountry')
// getInput.addEventListener('keyup', () => {
//     let countriesTable = document.getElementById('countries-table-body') 
//     let countryName = getInput.value.toLowerCase()

//     if(countryName === ""){
//         countriesTable.innerHTML =  displayCountries()
//     }

//     let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
//     //  console.log(finalUrl)
//      fetch(finalUrl).then((response) => response.json())
//      .then((data) => {
        
//         let countryData  = data[0]
//         // console.log(countryData);

//         let createOneROw = ''
//         const currencies = countryData.currencies;
//         let millionVal = (countryData.population/100000).toFixed(2)

//      if (currencies) {
//       // Get the first currency (most countries have one primary currency)
//       const currencyName = Object.values(currencies)[0].name || 'N/A';
//       const currencySymbol = Object.values(currencies)[0].symbol || 'N/A';

//         createOneROw += ` <tr>
//             <td>1</td>
//             <td>${countryData.name.common}</td>
//             <td>${countryData.capital}</td>
//             <td>${countryData.region}</td>
//            <td>${millionVal}M</td>
//             <td>${currencyName} (${currencySymbol})</td>
//             <td><img src= ${countryData.flags.png}></td>
//             <td><button id = "showBtn" class="js-showbtn"
//             onclick = "showDetails('${countryData.name.common}')">Show Details</button></td>
//         </tr>`
    
//         countriesTable.innerHTML = createOneROw


    
// ///////////////////////////     



// ////////////Show Popup 
//         let btns = document.querySelectorAll('.js-showbtn')
//         let popup = document.getElementById('popup')
//         let opacity = document.getElementById('opacity')
 
//     btns.forEach((btn) => {
//             btn.addEventListener('click', () => {
//                 popup.style.display = 'block'
//                 opacity.style.display = 'block'
//             })
//         })
// ////////////////////////////////////       
        
//   }   })
  
            
//         })


        ////typing input live update
            
function filterTable() {
    let getInput = document.getElementById('inputCountry')
    const filter = getInput.value.toLowerCase();
            
            filteredData = countriesData.filter((item) => {
                const countryName = item.name.common.toLowerCase();
                return countryName.includes(filter);
            });

            currentPage = 1; 
            displayCountries();            setupPagination();
}


