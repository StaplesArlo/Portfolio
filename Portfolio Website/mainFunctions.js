function openNav() {
    document.getElementById("myTopnav").style.height = "50px"; // Updated height
}

function closeNav() {
    document.getElementById("myTopnav").style.height = "0";
}

const x = document.getElementById("webpage");

function getWeather(latitude, longitude) {
    const apiKey = 'ba9bdf9c9247484b9c5162526250203'; // API key
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
        }, error => {
            console.error('Error getting location:', error);
            document.getElementById('weather-info').innerHTML = '<p>Unable to retrieve location. Please enable location services and try again.</p>';
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        document.getElementById('weather-info').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

document.addEventListener('DOMContentLoaded', getLocation);

//Error handling for LOCATION and Weather REQUEST
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "Your Geolocation request was denied. Try again & Select allow.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Location information is unavailable.Try again later.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "Location Request has timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "An unknown error occurred.";
            break;
    }
}
