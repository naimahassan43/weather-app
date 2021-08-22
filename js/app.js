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
//Api endpoint
const weatherApiKey = "ab71f09d1c46c7344587c67407c9583e";
const weatherEndPoint = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${weatherApiKey}`;

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
const getDataByCity = async (city) => {
  const endPoint = `${weatherEndPoint}&q=${city}`;
  const request = await fetch(endPoint);
  const data = await request.json();
  return data;
  console.log(data);
};

// getDataByCity("Dhaka");

//Search functionality
searchInput.addEventListener("keydown", async (e) => {
  //   console.log(e);
  const cityName = searchInput.value;
  if (e.keyCode === 13) {
    const cityData = await getDataByCity(cityName);
    updateWeather(cityData);
    console.log(cityData);
    searchInput.value = "";
  }
});

// Render Functions

//Updating the current weather

const updateWeather = (data) => {
  city.textContent = `${data.name}, ${data.sys.country}`;
  day.textContent = new Date().toLocaleDateString("en-EN", {
    weekday: "long",
  });
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
