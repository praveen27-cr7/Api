////First get data for fetch api and convert to json foramt and then return


async function getCountries() {
    let response = await fetch("https://restcountries.com/v3.1/all")
    let countriesData = await response.json()
    return countriesData
}

/////////////

   


/////Display the countries data in UI

async function displayCountries() {
    let countries =  await getCountries()
     console.log(countries);
     

    let countriesTable = document.getElementById('countries-table-body') 

    
    
    let createRow = ''
    
    
    countries.forEach((country,index) => {
        let millionVal = (country.population/100000).toFixed(2)
        const currencies = country.currencies;

        if (currencies) {
          // Get the first currency (most countries have one primary currency)
          const currencyName = Object.values(currencies)[0].name || 'N/A';
          const currencySymbol = Object.values(currencies)[0].symbol || 'N/A';

          
        
        createRow += ` <tr>
                <td>${index+1}</td>
                <td>${country.name.common}</td>
                <td>${country.capital}</td>
                <td>${country.region}</td>
                <td>${millionVal}M</td>
                <td>${currencyName} (${currencySymbol})</td>
                <td><img src= ${country.flags.png}></td>
                <td><button id = "showBtn" class="js-showbtn" 
                ">Show Details</button></td>
            </tr>`
            countriesTable.innerHTML = createRow



            
        }
    });


   //////////////
    

     
     //   btn.addEventListener('click', () => {
        
        //       popup.style.display = 'block'
        //    })
        
/////Show Popup on UI

            let btns = document.querySelectorAll('.js-showbtn')
            let popup = document.getElementById('popup')
            let opacity = document.getElementById('opacity')
        
        btns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    popup.style.display = 'block'
                    opacity.style.display = 'block'
                })
            })
        
//////////////

///////When click the show button you will see the country data in Popup
            let createPopupDetails = ''
        
       countries.forEach((country) => {
            
            let millionVal = (country.population/100000).toFixed(2)

                const currencies = country.currencies;
                let languages = country.languages
              

                if (currencies) {
                    // Get the first currency (most countries have one primary currency)
                    const currencyName = Object.values(currencies)[0].name || 'N/A';
                    const currencySymbol = Object.values(currencies)[0].symbol || 'N/A';
                    
                    const langaugeName = Object.values(languages).toString().split(',').join(',')
                    
                    createPopupDetails = `<p class = "countryName">${country.name.common}</p>
                    
                    <div class= "popDetails">
                    <img src= ${country.flags.png} class = "popupImg">
                    <p>Capital: ${country.capital}</p>
                    <p>Population: ${millionVal}M</p>
                    <p>Region: ${country.region}</p>
                    <p>Languages: ${langaugeName}</p>
                    <p>Currency : ${currencyName} (${currencySymbol})</p>
                    </div>
                    <button id="close" >&#10006</button>
                    `
                    
                    
                    popup.innerHTML = createPopupDetails

                    
                } })

               
                
     //////////////
     
     //////Close the popup
                
              
                let closeBtn = document.getElementById('close')
                
            
                 closeBtn.addEventListener('click', () => {
                   
                   popup.style.display = "none"
                   opacity.style.display = 'none'
                })
                
        }
        
           
                
      ///////////          
                
            
    /////Function calling        
            
        displayCountries()


        ///////

///Get input from the user and show the country data
        let getInput;
        getInput = document.getElementById('inputCountry')
        
       
        // let searchBtn = document.querySelector('.search')
 
    getInput.addEventListener('keypress', () => {
        let countriesTable = document.getElementById('countries-table-body') 
        let countryName = getInput.value
        let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
         console.log(finalUrl)
         fetch(finalUrl).then((response) => response.json())
         .then((data) => {
            
            let countryData  = data[0]
            // console.log(countryData);

            let createOneROw = ''
            const currencies = countryData.currencies;
            let millionVal = (countryData.population/100000).toFixed(2)

         if (currencies) {
          // Get the first currency (most countries have one primary currency)
          const currencyName = Object.values(currencies)[0].name || 'N/A';
          const currencySymbol = Object.values(currencies)[0].symbol || 'N/A';


            createOneROw += ` <tr>
                <td>1</td>
                <td>${countryData.name.common}</td>
                <td>${countryData.capital}</td>
                <td>${countryData.region}</td>
               <td>${millionVal}M</td>
                <td>${currencyName} (${currencySymbol})</td>
                <td><img src= ${countryData.flags.png}></td>
                <td><button id = "showBtn" class="js-showbtn"
                }">Show Details</button></td>
            </tr>`
        
            countriesTable.innerHTML = createOneROw


    ///////////////////////////     
    
    

  ////////////Show Popup 
            let btns = document.querySelectorAll('.js-showbtn')
            let popup = document.getElementById('popup')
            let opacity = document.getElementById('opacity')
     
        btns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    popup.style.display = 'block'
                    opacity.style.display = 'block'
                })
            })
   ////////////////////////////////////     

           /*  let createPopupDetails = ''
        
       countryData.map((country) => {
            
            let millionVal = (country.population/100000).toFixed(2)

                const currencies = country.currencies;
                
                if (currencies) {
                    // Get the first currency (most countries have one primary currency)
                    const currencyName = Object.values(currencies)[0].name || 'N/A';
                    const currencySymbol = Object.values(currencies)[0].symbol || 'N/A';
                    
                   
                    
                    
                    createPopupDetails = `<p class = "countryName">${country.name.common}</p>
                    
                    <div class= "popDetails">
                    <img src= ${country.flags.png} class = "popupImg">
                    <p>Capital: ${country.capital}</p>
                    <p>Population: ${millionVal}M</p>
                    <p>Region: ${country.region}</p>
                    <p>Languages: ${country.languages}</p>
                    <p>Currency : ${currencyName} (${currencySymbol})</p>
                    </div>
                    <button id="close" >&#10006</button>
                    `
                    
                    
                    popup.innerHTML = createPopupDetails

                    
                } })
                 */
                
      //////Close Popup          
              
                let closeBtn = document.getElementById('close')
                
            
                 closeBtn.addEventListener('click', () => {
                   
                   popup.style.display = "none"
                   opacity.style.display = 'none'
                })
            
            //////////////////////////
            
      }   })
                
            })


            