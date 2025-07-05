const input = document.querySelector("#cityInput");
const form = document.querySelector("#weatherForm");
const formBtn = document.querySelector("#formBtn");
const weatherInfo = document.querySelector("#weatherInfo");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#windSpeed");
const icon = document.querySelector("#icon");
const errorMsg = document.querySelector("#errorMsg");


const apiKey = "f8a74c69dd694da8910134442250207";

function clearInputScreen() {
  input.value = "";
}

async function submitHandler(event) {
event.preventDefault(); //prevent reloading of the page
const inputValue = input.value;

if (inputValue.trim() === "") {
  alert("Please enter a city");
}

function errClear() {
     temperature.innerHTML = ` ` 
      cityName.innerHTML =` `;
      windSpeed.innerHTML =` `;
      icon.src=``;
}

  try {
    //fetch data
    const response = await fetch (
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputValue}&aqi=no`);
    console.log(response);

    //check if response is okay
    if (response.ok === false) {
      errorMsg.innerHTML = "Error:City not found";
      errClear();
      return;
    } 
   
      errorMsg.innerHTML = "";
    
    
      const data = await response.json();
      console.log(data);

      //display data on screen
      temperature.innerHTML = ` ${data.current.temp_c}&#176C` ;

      cityName.innerHTML =` ${data.location.name}`;
      
      windSpeed.innerHTML =` The wind speed is ${data.current.wind_kph} kph`;

      icon.src=`https:${data.current.condition.icon}`;
      

      //clear input screen
      clearInputScreen();
    }
   catch (error) {
    console.log(error);
  }
}


document.addEventListener("DOMContentLoaded",() => {
  form.addEventListener("submit", submitHandler);
})