const input = document.querySelector('#cityinput');
const btn = document.querySelector('#add');
const city = document.querySelector('#cityoutput');
const description = document.querySelector('#description');
const temperature = document.querySelector('#temp');
const wind = document.querySelector('#wind');
const dateTime = document.querySelector('#datetime');
const weatherContainer = document.querySelector("#weather-container");
// const countryName = document.querySelector('#country-name');

const API_KEY = "3045dd712ffe6e702e3245525ac7fa38";

const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

const formatDate = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  
  
fetch('./cities.json')
.then((response) => response.json())
.then((data) => {
  const cities = data.map(city => city.name);
  const datalist = document.querySelector('#cities');
  for (const city of cities) {
    const option = document.createElement('option');
    option.value = city;
    datalist.appendChild(option);
  }
});


btn.addEventListener('click', () => {
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      city.innerHTML = `City: ${data.name}`;
      temperature.innerHTML = `Temperature: ${kelvinToCelsius(data.main.temp)} C`;
      description.innerHTML = `Conditions: ${data.weather[0].description}`;
      wind.innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
      dateTime.innerHTML = `Date and Time: ${formatDate(new Date())}`;
    })
    .catch(() => alert('You entered an incorrect city name'));
});



navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat)
  console.log(lon)
  // fetch the weather data from the OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      weatherContainer.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${kelvinToCelsius(data.main.temp)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Description: ${data.weather[0].description}</p>
      `;
    })
    .catch(error => console.error(error));
});

