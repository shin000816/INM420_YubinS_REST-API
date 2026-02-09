document.getElementById("btn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("city").value;

    fetch (`http://api.weatherapi.com/v1/current.json?key=${ACCESS_KEY}&q=${city}`)
    .then(response => response.json())
    .then(data => {
        const name = data.location.name;
        const region = data.location.region;
        const country = data.location.country;
        const localtime = data.location.localtime;

        const windMph = data.current.wind_mph;
        const humidity = data.current.humidity;
        const cloud = data.current.cloud;
        const feelsLike = data.current.feelslike_c;
        const windChill = data.current.windchill_c;
        // console.log(name, region, country, localtime, windMph, humidity, cloud, feelsLike, windChill);

        document.getElementById("weather").innerHTML = `
            <h2>Weather in ${name}, ${region}, ${country}</h2>
            <p>Local Time: ${localtime}</p>
            <p>Wind Speed: ${windMph} mph</p>
            <p>Humidity: ${humidity}%</p>
            <p>Cloud Cover: ${cloud}%</p>
            <p>Feels Like: ${feelsLike} °C</p>
            <p>Wind Chill: ${windChill} °C</p>
        `;
    });
};