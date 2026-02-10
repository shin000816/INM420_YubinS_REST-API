document.getElementById("btn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("city").value;
    const weatherDiv = document.getElementById("weather");
    const status = document.getElementById("status");

    // Loading status
    status.style.display = "block";
    status.textContent = "Loading...";
    weatherDiv.innerHTML = "";

    fetch(`https://api.weatherapi.com/v1/current.json?key=${ACCESS_KEY}&q=${city}`)
        .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        return response.json();
    })
    .then(data => {
        status.style.display = "none";

        const name = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const localtime = data.location.localtime;

        const windMph = data.current.wind_mph;
        const humidity = data.current.humidity;
        const cloud = data.current.cloud;
        const feelsLike = data.current.feelslike_c;
        const windChill = data.current.windchill_c;

        const tempC = data.current.temp_c;
        const conditionText = data.current.condition.text;
        const iconUrl = "https:" + data.current.condition.icon;
        
        const isDay = data.current.is_day; // 1 = day, 0 = night

        weatherDiv.classList.remove("day", "night");

        if (isDay === 1) {
            weatherDiv.classList.add("day");
        } else {
            weatherDiv.classList.add("night");
        }

        // HTML structure for weather card
        weatherDiv.innerHTML = `
            <div class="cardTop">
            <div class="place">
                <h2>${name}, ${region}, ${country}</h2>
                <p>Local time: ${localtime}</p>
                <span class="badge">${conditionText}</span>
            </div>

            <div class="temp">
                <img src="${iconUrl}" alt="${conditionText}">
                <div class="deg">${tempC}°C</div>
            </div>
            </div>

            <div class="grid">
            <div class="item">
                <div class="label">Wind</div>
                <div class="value">${windMph} mph</div>
            </div>
            <div class="item">
                <div class="label">Humidity</div>
                <div class="value">${humidity}%</div>
            </div>
            <div class="item">
                <div class="label">Cloud Cover</div>
                <div class="value">${cloud}%</div>
            </div>
            <div class="item">
                <div class="label">Feels Like</div>
                <div class="value">${feelsLike}°C</div>
            </div>
            <div class="item">
                <div class="label">Wind Chill</div>
                <div class="value">${windChill}°C</div>
            </div>
            </div>
        `;
    })
    .catch(error => {
        status.style.display = "block";
        status.textContent = "Error: Unable to load weather data.";
        console.error(error);
    });
};