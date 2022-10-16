// let city = prompt("Enter a city!")
// city = city.toLowerCase().trim();

// let weather = {
//     paris: {
//         temp: 19.7,
//         humidity: 80
//     },
//     tokyo: {
//         temp: 17.3,
//         humidity: 50
//     },
//     lisbon: {
//         temp: 30.2,
//         humidity: 20
//     },
//     "san francisco": {
//         temp: 20.9,
//         humidity: 100
//     },
//     oslo: {
//         temp: -5,
//         humidity: 20
//     }
// };


// if (weather[city]) {
//     alert(`It is currently ${Math.floor(weather[city].temp)} ° degrees in ${city} with ${Math.floor(weather[city].humidity)} % humidity`);
// } else {
//     alert("Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney");
// }
     
// function isWindy (speed, unit) {
// return speed >= 5
// return unit = "metric"
// }
// let speed = prompt("What is the wind speed?");
// let unit = prompt("In whas unit(metric or imperial)?");
// if (isWindy(20, metric)){
//   return true;
// } else {
//   return false;
// }

let cityInput = document.getElementById("enterYourCity");
let enterCityBtn = document.getElementById("enterCityBtn");
let temperatureC = document.getElementById("temperatureC");
let temperatureF = document.getElementById("temperatureF");
let myPosition = document.getElementById("myPosition");
let latitude = document.getElementById("latitude");
let longitude = document.getElementById("longitude");

let days = [
  "Saturday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "Oktober",
  "November",
  "December"
];
let changeTemp = document.getElementById("changeTemp");
let precipitation = document.getElementById("precipitation");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let cityName = document.getElementById("cityName");
let dateNow = document.getElementById("dateNow");
let timeNow = document.getElementById("timeNow");

function searchСity(e) {
  e.preventDefault();

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=68714f8012f38a2a9e09dd6b144ea965`;
  axios.get(url).then(showCityTemp);

  let date = new Date();
  let dayW = days[date.getDay()];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  cityName.innerHTML = cityInput.value;
  dateNow.innerHTML = `${dayW} ${day} ${month}`;
  timeNow.innerHTML = `Time ${hour} : ${minute}`;
}

function convertTemp(el, e) {
  e.stopPropagation();

  if (el.toLowerCase() === "c") {
    changeTemp.innerHTML = Math.floor(((62.6 - 32) * 5) / 9);
  } else if (el.toLowerCase() === "f") {
    console.log(el, "el");
    changeTemp.innerHTML = Math.floor((17 * 9) / 5 + 32);
  }
}

enterCityBtn.addEventListener("click", searchСity);
temperatureC.addEventListener("click", (e) => {
  convertTemp("c", e);
});
temperatureF.addEventListener("click", (e) => {
  convertTemp("f", e);
});

 function showCityTemp(response) {
  console.log(response, '---------------response')
  changeTemp.innerHTML = response.data.main.temp
  changeTemp.setAttribute('data-temp', response.data.main.temp);


  precipitation.innerHTML = `precipitation: ${response.data.weather[0].description}` 
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`
  wind.innerHTML = `wind: ${response.data.wind.speed} m/s` 
}

myPosition.addEventListener("click", getMyPosition);

function getMyPosition() {
  const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  const crd = pos.coords;

  latitude.innerHTML = crd.latitude;
  longitude.innerHTML = crd.longitude;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
}
