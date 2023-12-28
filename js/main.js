const API_KEY = "7fb53047d3443d6513a7ff2d99afcdfc";

const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
form.onsubmit = submitHandler;

async function submitHandler(e) {
  e.preventDefault();

  if (!input.value.trim()) {
    console.log("name");
    return;
  }
  const cityInfo = await getGeo(input.value.trim());
  input.value = "";
  if (cityInfo.length === 0) return;
  const weatherInfo = await getWeather(cityInfo[0]["lat"], cityInfo[0]["lon"]);
  console.log(weatherInfo);

  // Компонуємо у виді об'єкта

  const weatherData = {
    img: weatherInfo.weather[0]["main"],
    temp: weatherInfo.main.temp,
    name: weatherInfo.name,
    humidity: weatherInfo.main.humidity,
    speed: weatherInfo.wind.speed,
  };
  renderWeatherData(weatherData);
}

async function getGeo(name) {
  const getUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
  const response = await fetch(getUrl);
  const data = await response.json();
  console.log(data);
  return data;
}
async function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  console.log(data);
  return data;
}

function renderWeatherData(data) {

  document.querySelector('.weather_details').classList.remove('none');
  document.querySelector('.weather__info-wrapper').classList.remove('none');
  const img = document.querySelector("#img");
  const temp = document.querySelector(".weather__temp");
  const name = document.querySelector(".weather__city");
  const humidity = document.querySelector("#humidity");
  const speed = document.querySelector("#speed");
  // console.log(img, temp, humidity, speed, name);

  const fileNamesImg = {
    Clouds: "clouds",
    Clear: "clear",
    Rain: "rain",
    Snow: "snow",
    Drizzle: "drizzle",
    Mist: "mist",
  };
  if (fileNamesImg[data.img]) {
    img.src = `./img/ui/${fileNamesImg[data.img]}.png`;
  }

  temp.innerText = Math.floor(data.temp) + "°с";
  name.innerText = data.name;
  humidity.innerText = data.humidity + "%";
  speed.innerText = data.speed + "km/h";
}
