// navigation.js
function openNav() {
    document.getElementById("myTopnav").style.height = "50px"; // Updated height
}

function closeNav() {
    document.getElementById("myTopnav").style.height = "0";
}

// weather.js
function getWeather(latitude, longitude) {
    const apiKey = 'YOUR_API_KEY_HERE'; // Use a secure method to handle your API key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <h2>${data.location.name}</h2>
                <h4>Temperature: ${data.current.temp_c}°C</h4>
                <h4>${data.current.condition.text}</h4>
                <h4>Wind: ${data.current.wind_kph} km/h</h4>
                <h4>Cloud: ${data.current.cloud}%</h4>`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeather(latitude, longitude);
        }, showError);
    } else {
        console.error('Geolocation is not supported by this browser.');
        document.getElementById('weather-info').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

document.addEventListener('DOMContentLoaded', getLocation);

function showError(error) {
    const locationElement = document.getElementById("location");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationElement.innerHTML = "Your geolocation request was denied. Please enable location services and try again.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationElement.innerHTML = "Location information is unavailable. Please try again later.";
            break;
        case error.TIMEOUT:
            locationElement.innerHTML = "The location request has timed out. Please try again.";
            break;
        case error.UNKNOWN_ERROR:
            locationElement.innerHTML = "An unknown error occurred. Please try again.";
            break;
    }
}
