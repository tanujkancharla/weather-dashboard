console.log("JavaScript connected!");

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

searchButton.addEventListener("click", function () {

    const city = cityInput.value;

    if (city === "") {
        alert("Please enter a valid city name.");
        return;
    }

    console.log(city);

});