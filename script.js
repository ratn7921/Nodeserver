// JavaScript for Weather App
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = document.getElementById('search-input').value.trim();
    if (cityName) {
        updateWeatherDataByCityName(cityName);
    }
});

async function updateWeatherDataByCityName(cityName) {
    const apiKey = 'd2c6c7582bffa5be14b625b995eb89c3';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    const mapsUrl = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`;

    try {
        const [weatherResponse, mapsResponse] = await Promise.all([fetch(weatherUrl), fetch(mapsUrl)]);
        if (!weatherResponse.ok) throw new Error(`Weather API error: ${weatherResponse.statusText}`);
        if (!mapsResponse.ok) throw new Error(`Maps API error: ${mapsResponse.statusText}`);

        const weatherData = await weatherResponse.json();
        const mapsData = await mapsResponse.json();

        const locationName = `${weatherData.name}, ${weatherData.sys.country}`;
        const localtime = new Date(weatherData.dt * 1000).toLocaleString();
        const temp = `${weatherData.main.temp}°C (${(weatherData.main.temp * 9 / 5 + 32).toFixed(1)}°F)`;
        const humidity = `${weatherData.main.humidity}%`;
        const wind = `${weatherData.wind.speed} m/s ${weatherData.wind.deg}°`;

        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

        const weatherTable = document.getElementById('weather-table').getElementsByTagName('tbody')[0];
        weatherTable.innerHTML = `
            <tr>
                <td>${locationName}</td>
                <td>${localtime}</td>
                <td>${humidity}</td>
                <td>${wind}</td>
                <td>${temp}</td>
            </tr>
        `;

        updateBackgroundImage(cityName.toLowerCase());

    } catch (error) {
        console.error('Error fetching data:', error.message);
        alert('Error fetching data. Please try again later.');
    }
}

const cityImages = {
    // Add city images as per your requirement
    mumbai: 'https://images.unsplash.com/photo-1543877087-ebf71c898b3f',
    pune: 'https://images.unsplash.com/photo-1543877087-ebf71c898b3f',
    // Add more cities and their images here
};

// Function to update background image based on city name
function updateBackgroundImage(cityName) {
    const imageUrl = cityImages[cityName];
    const fallbackUrl = 'https://via.placeholder.com/1920x1080?text=City+Image+Not+Available';

    if (imageUrl) {
        loadImage(imageUrl)
            .then(() => {
                document.body.style.backgroundImage = `url(${imageUrl})`;
                document.body.style.backgroundSize = 'cover'; // Cover the entire element
                document.body.style.backgroundPosition = 'center'; // Center the image
            })
            .catch((error) => {
                console.error(`Failed to load image (${imageUrl}):`, error);
                setFallbackImage();
            });
    } else {
        setFallbackImage();
    }

    function setFallbackImage() {
        document.body.style.backgroundImage = `url(${fallbackUrl})`;
        document.body.style.backgroundSize = 'cover'; // Cover the entire element
        document.body.style.backgroundPosition = 'center'; // Center the image
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = (err) => reject(err);
        img.src = url;
    });
}
