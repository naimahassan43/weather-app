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
  }
});

// Render Functions

//Updating the current weather

const updateWeather = (data) => {
  city.textContent = `${data.name}, ${data.sys.country}`;
  day.textContent = new Date().toLocaleDateString("en-EN", {
    weekday: "long",
  });
};
