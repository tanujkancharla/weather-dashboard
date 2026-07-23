const apiKey = "e892968134cbb6b331801a5a68e787d8";
console.log("JavaScript connected!");

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

searchButton.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a valid city name.");
        return;
    }

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
});