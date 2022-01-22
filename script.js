const api = "3c809b99ce00a826ded71fe85e5f0e15";
const searchBtn = document.getElementById("btn");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherType = document.getElementById("weather");
const tempC = document.getElementById("temp");
const fahrF = document.getElementById("fahr");
const sunRise = document.getElementById("sun-rise");
const sunSet = document.getElementById("sun-set");
const timeBlock = document.getElementById('sunrise-set');
const circle = document.getElementById('circle');
function display(base) {
    timeBlock.classList.remove('inactive');
    circle.classList.remove('inactive');
  fetch(base)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp } = data.main;
      const city = data.name;
      const { description, icon } = data.weather[0];
      const { sunrise, sunset } = data.sys;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      const fahrenheit = ((temp - 273.15) * 9) / 5 + 32;
      const sunriseGMT = new Date(sunrise * 1000);
      const sunsetGMT = new Date(sunset * 1000);
      weatherIcon.src = iconUrl;
      cityName.innerHTML = `Weather in ${city}`;
      weatherType.innerHTML = description;
      tempC.innerHTML = `${(temp - 273.15).toFixed(2)} °C`;
      fahrF.innerHTML = `${fahrenheit.toFixed(2)} °F`;
      sunRise.innerHTML = `Sun-rise: ${sunriseGMT.toLocaleTimeString()}`;
      sunSet.innerHTML = `Sun-set : ${sunsetGMT.toLocaleTimeString()}`;
    });
}
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
      timeBlock.classList.remove('inactive');
    circle.classList.remove('inactive');
  fetch(base)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp } = data.main;
      const city = data.name;
      const { description, icon } = data.weather[0];
      const { sunrise, sunset } = data.sys;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      const fahrenheit = ((temp - 273.15) * 9) / 5 + 32;
      const sunriseGMT = new Date(sunrise * 1000);
      const sunsetGMT = new Date(sunset * 1000);
      weatherIcon.src = iconUrl;
      cityName.innerHTML = `Weather in ${city}`;
      weatherType.innerHTML = description;
      tempC.innerHTML = `${(temp - 273.15).toFixed(2)} °C`;
      fahrF.innerHTML = `${fahrenheit.toFixed(2)} °F`;
      sunRise.innerHTML = `Sun-rise: ${sunriseGMT.toLocaleTimeString()}`;
      sunSet.innerHTML = `Sun-set : ${sunsetGMT.toLocaleTimeString()}`;
    });
    });
  }
});
searchBtn.addEventListener("click", () => {
  const city = document.getElementById("input").value;
  const base = `https://api.openweathermap.org/data/2.5/weather?appid=${api}&q=${city}`;
  display(base);
  document.getElementById("input").value = "";
});
