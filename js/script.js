const apiKey = "API-KEY";

console.log("JavaScript connected!");

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

const weatherIcon = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature");
const conditionElement = document.querySelector(".condition");
const cityNameElement = document.querySelector(".city-name");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind-speed");
const weatherCard = document.querySelector(".weather-card");

function searchWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a valid city name.");
        cityInput.focus();
        return;
    }

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

    searchButton.disabled = true;
    searchButton.textContent = "Loading...";

    fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("CITY_NOT_FOUND");
                }

                if (response.status === 401) {
                    throw new Error("INVALID_API_KEY");
                }

                throw new Error(`REQUEST_FAILED_${response.status}`);
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const cityName = data.name;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const condition = data.weather[0].main;

            let icon = "🌤️";
            let themeClass = "weather-default";

            if (condition === "Clear") {
                icon = "☀️";
                themeClass = "weather-clear";
            } else if (condition === "Clouds") {
                icon = "☁️";
                themeClass = "weather-clouds";
            } else if (condition === "Rain" || condition === "Drizzle") {
                icon = "🌧️";
                themeClass = "weather-rain";
            } else if (condition === "Thunderstorm") {
                icon = "⛈️";
                themeClass = "weather-thunderstorm";
            } else if (condition === "Snow") {
                icon = "❄️";
                themeClass = "weather-snow";
            } else if (
                condition === "Mist" ||
                condition === "Fog" ||
                condition === "Haze"
            ) {
                icon = "🌫️";
                themeClass = "weather-mist";
            }

            document.body.className = themeClass;

            weatherIcon.textContent = icon;
            cityNameElement.textContent = cityName;
            temperatureElement.textContent =
                `${Math.round(temperature)}°`;
            conditionElement.textContent = condition;
            humidityElement.textContent =
                `Humidity: ${humidity}%`;
            windElement.textContent =
                `Wind: ${Math.round(windSpeed)} mph`;

            weatherCard.classList.remove("updated");
            void weatherCard.offsetWidth;
            weatherCard.classList.add("updated");
        })
        .catch(function (error) {
            console.error("Error fetching weather:", error);

            if (error.message === "CITY_NOT_FOUND") {
                conditionElement.textContent = "City not found";
                cityNameElement.textContent = "Try another location";
            } else if (error.message === "INVALID_API_KEY") {
                conditionElement.textContent = "API key error";
                cityNameElement.textContent = "Check your API key";
            } else {
                conditionElement.textContent = "Unable to load weather";
                cityNameElement.textContent = "Please try again";
            }

            temperatureElement.textContent = "--°";
            humidityElement.textContent = "Humidity: --%";
            windElement.textContent = "Wind: -- mph";
            weatherIcon.textContent = "⚠️";

            document.body.className = "weather-default";
        })
        .finally(function () {
            searchButton.disabled = false;
            searchButton.textContent = "Search";
        });
}

searchButton.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchWeather();
    }
});