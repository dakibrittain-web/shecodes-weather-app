let now = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let dayName = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let dateTimeString = `${dayName} ${hours}:${minutes}`;

let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = dateTimeString;

function displayWeather(response) {
    let temperature = response.data.temperature.current;
    let cityName = response.data.city;
    let humidity = response.data.temperature.humidity;
    let wind = response.data.wind.speed;
    let description = response.data.condition.description;
    let iconUrl = response.data.condition.icon_url;

    let cityHeading = document.querySelector("#city-name");
    cityHeading.innerHTML = cityName;

    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(temperature);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${Math.round(wind)}km/h`;

    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = description;

    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${description}" class="weather-icon" />`;
}

    function searchCity(city) {
    let apiKey = "964a2b13adba1ft84430ea495183898o";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
    axios.get(url).then(displayWeather);
}

    let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#city-input").value;
    searchCity(currentCity);
});

searchCity("Copenhagen");