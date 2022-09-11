//HOMEWORK 5
//1. Add date
let currentDate = new Date();
let dateSelector = document.querySelector("#current-date");

let date = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentDate.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentDate.getMonth()];
dateSelector.innerHTML = `${day}, ${date} ${month}, ${hours}:${minutes}`;

//2.Display the city name on the page after the user submits the form (press search). And display the current temperature of this city using Weather API
let form = document.querySelector("form");

//Function to display weather condition
const searchCity = (cityInput) => {
  let apikey = "9d0a642f80e2553b5682ef5d7e0c1269";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apikey}`;

  axios.get(apiurl).then(displayWeather);
};

let displayWeather = (res) => {
  let cityOutput = document.querySelector("#city-output");
  cityOutput.innerHTML = `${res.data.name} , ${res.data.sys.country}`;
  let description = document.querySelector("#description");
  description.innerHTML = res.data.weather[0].main;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(res.data.main.temp)}`;
  console.log(res.data);
  let maxTemp = document.querySelector("#max_temp");
  maxTemp.innerHTML = `${Math.round(res.data.main.temp_max)}°`;
  let minTemp = document.querySelector("#min_temp");
  minTemp.innerHTML = `${Math.round(res.data.main.temp_min)}°`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(res.data.wind.speed)}km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${res.data.main.humidity}%`;
  let sunrise = document.querySelector("#sunrise");
  let sunriseDate = new Date(res.data.sys.sunrise * 1000);
  let sunriseTime = sunriseDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunrise.innerHTML = sunriseTime;

  let sunset = document.querySelector("#sunset");
  let sunsetDate = new Date(res.data.sys.sunset * 1000);
  let sunsetTime = sunsetDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunset.innerHTML = sunsetTime;
};

// For displaying weather conditions when user press Search button
let handleCity = (event) => {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;

  searchCity(cityInput);
};
form.addEventListener("submit", handleCity);

searchCity("Hamburg");

//3. When clicking Current Location button, it uses the Geolocation API and display the city and current temperature using the OpenWeather API.
const getTempInCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let apikey = "9d0a642f80e2553b5682ef5d7e0c1269";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  });
};
let button = document.querySelector(".current_btn");
button.addEventListener("click", getTempInCurrentPosition);

//HOMEWORK 4
// //1. Add date
// let currentDate = new Date();
// let dateSelector = document.querySelector("#current-date");

// let date = currentDate.getDate();
// let hours = currentDate.getHours();
// let minutes = currentDate.getMinutes();
// let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// let day = days[currentDate.getDay()];
// let months = [
//   "Jan",
//   "Feb",
//   "March",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// let month = months[currentDate.getMonth()];
// dateSelector.innerHTML = `${day}, ${date} ${month}, ${hours}:${minutes}`;

// //2.Display the city name on the page after the user submits the form.
// let form = document.querySelector("form");
// let handleCity = (event) => {
//   event.preventDefault();
//   let cityInput = document.querySelector("#city-input");
//   let cityOutput = document.querySelector("#city-output");
//   cityOutput.innerHTML = cityInput.value;
//   console.log(cityInput.value);
// };
// form.addEventListener("submit", handleCity);

// //3. °C and °F links for temperature
// let tempRate = document.querySelector("#temperature");
// let temp = tempRate.innerHTML;
// let tempNum = parseFloat(temp);

// let fahrenheit = document.querySelector("#fahrenheit-link");
// let handleFahrTemp = () => {
//   let tempInFahr = Math.round((tempNum * 9) / 5 + 32);
//   tempRate.innerHTML = tempInFahr;
// };
// fahrenheit.addEventListener("click", handleFahrTemp);

// let celcius = document.querySelector("#celcius-link");
// let handleCelTemp = () => {
//   tempRate.innerHTML = tempNum;
// };
// celcius.addEventListener("click", handleCelTemp);

// HOMEWORK 3
// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// // write your code here
// let inputCity = prompt("Enter your city name, please!").toLowerCase().trim();
// if (weather[inputCity] !== undefined) {
//   let temp = Math.ceil(weather[inputCity].temp);
//   let fahrenheit = Math.round((temp * 9) / 5 + 32);
//   let hum = weather[inputCity].humidity;
//   let outputCity = inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
//   alert(
//     `It is currently ${temp}°C / ${fahrenheit}°F in ${outputCity} with a humidity of ${hum}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${inputCity}`
//   );
// }
