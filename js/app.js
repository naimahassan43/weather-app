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
  console.log(data);
};

getDataByCity("Dhaka");
