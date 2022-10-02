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

//2.Display the city name and current temperature on the page after the user submits the form (press search)
let form = document.querySelector("form");

//Function to display weather condition of the city the user searches
const searchCity = (cityInput) => {
  let apikey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apikey}`;

  axios.get(apiurl).then(displayWeather);
};

let displayWeather = (res) => {
  console.log(res.data);

  let cityOutput = document.querySelector("#city-output");
  cityOutput.innerHTML = `${res.data.name} , ${res.data.sys.country}`;

  let description = document.querySelector("#description");
  description.innerHTML = res.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
  );
  //change alt atribute of the img in html
  iconElement.setAttribute("alt", res.data.weather[0].main);

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(res.data.main.temp)}`;

  // °C and °F links for temperature

  let tempNum = parseFloat(Math.round(res.data.main.temp));

  let fahrenheit = document.querySelector("#fahrenheit-link");
  let handleFahrTemp = () => {
    //remove the active class from celcius link and add to fahrenheit
    let tempInFahr = Math.round((tempNum * 9) / 5 + 32);
    temperature.innerHTML = tempInFahr;
    celcius.classList.remove("active");
    fahrenheit.classList.add("active");
  };
  fahrenheit.addEventListener("click", handleFahrTemp);

  let celcius = document.querySelector("#celcius-link");
  let handleCelTemp = () => {
    temperature.innerHTML = tempNum;
    fahrenheit.classList.remove("active");
    celcius.classList.add("active");
  };
  celcius.addEventListener("click", handleCelTemp);

  //Weather details containers

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

  getForecast(res.data.coord);
};

// APi call for daily forecast
//call this function in Display weather func.
const getForecast = (coords) => {
  console.log(coords);
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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

//4. Displaying forecast days cards
const formatDay = (timeStamp) => {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
};

const displayForecast = (res) => {
  let dailyForecast = res.data.daily;
  console.log(res.data.daily);
  let forecastCard = document.querySelector("#forecast");

  let forecastHTML = "";

  dailyForecast.forEach((day, index) => {
    if ((index > 0) & (index < 7)) {
      forecastHTML =
        forecastHTML +
        `<div class="col text-center">
            <div class="px-1 py-3 mb-3 border rounded-2" >
              <div class="forecast-date">${formatDay(day.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">${`${Math.round(
                  day.temp.max
                )}°`}</span>
                <span class="weather-forecast-temp-min">${`${Math.round(
                  day.temp.min
                )}°`}</span>
              </div>
            </div>
          </div>
    
    `;
    }
  });

  forecastCard.innerHTML = forecastHTML;
};
displayForecast();
