//Selectors

const searchInput = document.querySelector(".weather__search");
const city = document.querySelector(".weather__city");
const day = document.querySelector(".weather__day");
const humidity = document.querySelector(".weather__indicator--humidity>.value");
const wind = document.querySelector(".weather__indicator--wind>.value");
const pressure = document.querySelector(".weather__indicator--pressure>.value");
const image = document.querySelector(".weather__image");
const temp = document.querySelector(".weather__temperature>.value");
const forecastBlock = document.querySelector(".weather__forecast");
const suggestions = document.querySelector("#suggestions");
//Api endpoint
const weatherApiKey = "ab71f09d1c46c7344587c67407c9583e";
const weatherEndPoint = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${weatherApiKey}`;
const forecastEndPoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${weatherApiKey}`;
const cityBaseEndPoint = `https://api.teleport.org/api/cities/?search=`;

//Image Icons data
const weatherImages = [
  {
    url: "./images/clear-sky.png",
    ids: [800],
  },
  {
    url: "./images/broken-clouds.png",
    ids: [803, 804],
  },
  {
    url: "./images/few-clouds.png",
    ids: [801],
  },
  {
    url: "./images/mist.png",
    ids: [701, 711, 721, 731, 741, 751, 761, 771, 781],
  },
  {
    url: "./images/rain.png",
    ids: [501, 502, 503, 504],
  },
  {
    url: "./images/scattered-clouds.png",
    ids: [802],
  },
  {
    url: "./images/shower-rain.png",
    ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321],
  },
  {
    url: "./images/snow.png",
    ids: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  },
  {
    url: "./images/thunderstorm.png",
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  },
  //   {
  //     url: "./images/wind.png",
  //     ids: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  //   }
];

//Fetch Data from Server

//Get weather data by city name
const getDataByCity = async (cityString) => {
  let city;
  if (cityString.includes(",")) {
    city =
      cityString.slice(0, cityString.indexOf(",")) +
      cityString.slice(cityString.lastIndexOf(","));
  } else {
    city = cityString;
  }

  const endPoint = `${weatherEndPoint}&q=${city}`;
  const request = await fetch(endPoint);
  if (request.status !== 200) {
    alert("Invalid city request");
    searchInput.value = "";
    return;
  }
  const data = await request.json();
  return data;
  // console.log(data);
};

// getDataByCity("Dhaka");

//Get Forecast data by city id

const getForecastData = async (id) => {
  const endpoint = `${forecastEndPoint}&id=${id}`;
  const result = await fetch(endpoint);
  const forecast = await result.json();
  const forecastList = forecast.list;
  const dailyTemp = [];
  forecastList.forEach((day) => {
    let date = new Date(day.dt_txt.replace(" ", "T"));
    let hours = date.getHours();
    if (hours === 12) {
      dailyTemp.push(day);
    }
  });
  updateForecast(dailyTemp);
};
//Search functionality
searchInput.addEventListener("keydown", async (e) => {
  //   console.log(e);
  const cityName = searchInput.value;
  if (e.keyCode === 13) {
    const cityData = await getDataByCity(cityName);
    const cityId = cityData.id;

    updateWeather(cityData);
    getForecastData(cityId);

    console.log(cityData);
    searchInput.value = "";
  }
});

//City suggestions functionality
searchInput.addEventListener("input", async () => {
  const endpoint = cityBaseEndPoint + searchInput.value;
  const request = await fetch(endpoint);
  const result = await request.json();
  suggestions.innerHTML = "";
  const cityList = result._embedded["city:search-results"];
  const length = cityList.length > 7 ? 7 : cityList.length;
  for (let i = 0; i < length; i++) {
    const option = document.createElement("option");
    option.value = cityList[i].matching_full_name;
    suggestions.appendChild(option);
  }
  console.log(result);
});

//***Render Functions* */

//Updating the current weather

const updateWeather = (data) => {
  city.textContent = `${data.name}, ${data.sys.country}`;
  day.textContent = dayOfWeek();
  humidity.textContent = data.main.humidity;
  wind.textContent = `${calcWindDir(data.wind.deg)}, ${data.wind.speed}`;
  pressure.textContent = data.main.pressure;
  temp.textContent =
    data.main.temp >= 0
      ? `+${Math.round(data.main.temp)}`
      : `-${Math.round(data.main.temp)}`;
  const imgId = data.weather[0].id;
  weatherImages.forEach((obj) => {
    if (obj.ids.includes(imgId)) {
      image.src = obj.url;
    }
  });
};

//Updating the 5-day forecast
const updateForecast = (data) => {
  forecastBlock.innerHTML = "";
  data.forEach((day) => {
    let iconUrl = ` http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    let dayName = dayOfWeek(day.dt * 1000);
    let temp =
      day.main.temp >= 0
        ? `+${Math.round(day.main.temp)}`
        : `-${Math.round(day.main.temp)}`;
    let forecastElem = `
            <article class="weather__forecast__item">
              <img
                  src="${iconUrl}"
                  alt="${day.weather[0].description}"
                  class="weather__forecast__icon"
              />
              <h3 class="weather__forecast__day">${dayName}</h3>
              <p class="weather__forecast__temperature">
                  <span class="value">${temp}</span> &deg;C
              </p>
          </article>
    `;
    forecastBlock.insertAdjacentHTML("beforeend", forecastElem);
  });
};
//Day of Week
const dayOfWeek = (dt = new Date().getTime()) => {
  return new Date(dt).toLocaleDateString("en-EN", {
    weekday: "long",
  });
};
//calculating wind direction

const calcWindDir = (deg) => {
  if (deg > 45 && deg <= 135) {
    return "East";
  } else if (deg > 135 && deg <= 225) {
    return "South";
  } else if (deg > 225 && deg <= 315) {
    return "West";
  } else {
    return "North";
  }
};
