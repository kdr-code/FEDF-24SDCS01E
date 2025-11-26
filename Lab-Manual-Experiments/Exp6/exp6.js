const API_KEY = "1aff1c1ffc8310c788a58e1fe828d880";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("errorMsg");
const lastCityInfo = document.getElementById("lastCityInfo");

// Fetch weather using async/await
async function getWeather(city) {
    if (!city) return;

    errorMsg.textContent = "";
    weatherResult.textContent = "Loading...";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        const data = await response.json();

        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const feelsLike = data.main.feels_like;

        weatherResult.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${temp} °C</p>
            <p>Feels like: ${feelsLike} °C</p>
            <p>Condition: ${desc}</p>
        `;

        // store last searched city
        localStorage.setItem("lastCity", data.name);
        showLastCity();
    } catch (error) {
        weatherResult.textContent = "";
        errorMsg.textContent = error.message;
    }
}

function showLastCity() {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        lastCityInfo.textContent = `Last searched city: ${lastCity}`;
    } else {
        lastCityInfo.textContent = "";
    }
}

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    getWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        getWeather(city);
    }
});

// On page load: auto-fetch last city (if exists)
window.addEventListener("load", () => {
    const lastCity = localStorage.getItem("lastCity");
    showLastCity();
    if (lastCity) {
        getWeather(lastCity);
    }
});
