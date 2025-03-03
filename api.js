
let countriesData = [];
let filteredData = [];
let currentPage = 1;
const countriesPerPage = 5;

///Get data from the fetch

fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
        countriesData = data;
        filteredData = data;
        displayCountries()
        updatePaginationInfo();
    });

// Display country data in UI

    function displayCountries() {
        let countriesTable = document.getElementById("countries-table-body");
        countriesTable.innerHTML = "";
        
       
            let tableData = '';
            
            const start = (currentPage - 1) * countriesPerPage
            
            const end = start + countriesPerPage
            console.log(end)
            const paginatedData = filteredData.slice(start, end);


            let num = start + 1;
            for (let i = 0; i < paginatedData.length; i++) {
                let values = paginatedData[i];
                let currencyInfo = '';
                let millionVal = (values.population/100000).toFixed(2)
                if (values.currencies) {
                    for (const [code, details] of Object.entries(values.currencies)) {
                        currencyInfo += `${details.name} (${details.symbol})`;
                    }
                } else {
                    currencyInfo = 'N/A';
                }

                const countryName = values.name.common;
                const capital = values.capital ? values.capital[0] : 'N/A';
                
                const flagUrl = values.flags.png;

                tableData += ` 
                    <tr>
                        <td id='number'>${num}</td>
                        <td>${countryName}</td>
                        <td>${capital}</td>
                         <td>${values.region}</td>
                         <td>${millionVal}M</td>
                        <td>${currencyInfo}</td>

                        <td><img src="${flagUrl}" alt="Flag of ${countryName}"></td>
                        <td><button id = "showBtn" class="js-showbtn" onclick='showDetails("${values.name.common}")'>Show Details</button></td>
                    </tr>`;
                num++;
            }
            countriesTable.innerHTML = tableData
        }
    
        
// pagination go to previous Page    

function prevPage() {
if (currentPage > 1) {
currentPage--;
displayCountries()
updatePaginationInfo();
}
}

// // pagination go to next Page    

function nextPage() {
if (currentPage < Math.ceil(filteredData.length /countriesPerPage )) {
        currentPage++;
        displayCountries()
        updatePaginationInfo();
    }
}

//Update page no

function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredData.length / countriesPerPage);
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
}

//Show details in popup 
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
                    <li>Capital: ${country.capital}</li>
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

//Close the popup

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("opacity").style.display = "none";
}

// Filter by input country data from user

function filterTable() {
    const input = document.getElementById('inputCountry');
    const filter = input.value.toLowerCase();
    
    filteredData = countriesData.filter((item) => {
        const countryName = item.name.common.toLowerCase();
        return countryName.includes(filter);
    });



    console.log(filteredData)
    currentPage = 1; 
    displayCountries();
    updatePaginationInfo();
}

