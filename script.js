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

function displayForecast(response) {
    console.log(response.data);

    let forecastHtml = "";

    response.data.daily.forEach(function(day, index){
        if (index < 5) {
            let date = new Date(day.time * 1000);
            let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]; 

            forecastHtml += `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${dayName}</div>
                    <img src="${day.condition.icon_url}" class="weather-forecast-icon" alt="${day.condition.description}" />
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span>
                        <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
                    </div>
                </div>
            `;
        
            }
    })

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

 function searchCity(city) {
    let apiKey = "964a2b13adba1ft84430ea495183898o";
    
  
    let currentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(currentUrl).then(displayWeather);
    
  
    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(forecastUrl).then(displayForecast);
}

    let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#city-input").value;
    searchCity(currentCity);
});

searchCity("Copenhagen");