document.addEventListener("DOMContentLoaded", async function() {
  const provinces = await fetch("/api/provinces").then(res => res.json())
  if (provinces) {
    hideSpinner();
  }
  
  const nav = document.getElementById("region-select")
  const detailsHeader = document.querySelector("#region-details h2")
  const detailsBody = document.querySelector("#region-details tbody")
  
  provinces.forEach(province => {
    const button = document.createElement("button")
    //console.log('province',province);
    button.innerText = province.short
    button.setAttribute("id", province.short);
    button.classList.add("region-option")
    
    button.addEventListener("click", async function() {
      showSpinner();
      [...nav.children].forEach(child => child.classList.remove("selected"))
      this.classList.add("selected")
      detailsHeader.innerText = province.name
      // delte prev result
      detailsBody.innerHTML = ''
      // load and set new data for Cities and population
      const citiesByProvince = await getCityData(province.name)
      citiesByProvince.forEach(city => {
        detailsBody.innerHTML += `<tr><td class="left"> ${city.Municipality}</td><td class="right"> ${city['Population(2016)']}</td></tr>`
      })
      // add capital city to the end
      detailsBody.innerHTML += `<tr><td class="left"><span><b>${province.capital} </b> (capital)</span></td><td class="right"> ${Number(province.population).toLocaleString()}</td></tr>`
    })
    // load left Navigation bar
    nav.appendChild(button)
  })

  document.getElementById(provinces[0].short).click();
})

async function getCityData(province) {
  const response = await fetch(`/api/cities/${province}`)
  if (response) {
    hideSpinner();
  }
  let data = await response.json()
  return data
}

// Hide the Spinner
function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
} 
// Hide the Spinner
function showSpinner() {
  document.getElementById('spinner').style.display = 'block';
} 