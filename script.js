const API_KEY = '3d9b9f72076dc3e337b157a8de719883';

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if (city) { getWeather(city); } else if (city === "") { alert("Please enter a city name"); return; }
})

document.getElementById("cityInput")
    .addEventListener("keypress", (e) => {

        if (e.key === "Enter") {
            getWeather(
                document.getElementById("cityInput").value
            );
        }
    });

const date = new Date();
const options = { weekday: 'long', month: 'long', day: 'numeric' };
document.getElementById("date").innerHTML = date.toLocaleDateString(undefined, options);

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

const getTimePeriod = () => {
    const h = new Date().getHours();
    if (h >= 5 && h < 7) ("Dawn");
    else if (h >= 7 && h < 12) ("Morning")
    else if (h >= 12 && h < 17) ("Afternoon")
    else if (h >= 17 && h < 20) ("Evening")
    else ("Night");
    return "day";
}

const timeBgs = {
    dawn: 'linear-gradient(160deg, #f6a469 0%, #f9c97a 50%, #fde8b0 100%)',
    morning: 'linear-gradient(160deg, #74b9ff 0%, #a8d8ff 60%, #dff0ff 100%)',
    day: 'linear-gradient(160deg, #2980b9 0%, #6bb8f5 50%, #b8dcf7 100%)',
    evening: 'linear-gradient(160deg, #e76f51 0%, #f4a261 45%, #fde8c8 100%)',
    dusk: 'linear-gradient(160deg, #6c3483 0%, #a569bd 40%, #f1948a 100%)',
    night: 'linear-gradient(160deg, #0d1b2a 0%, #1b2a3b 60%, #2c3e55 100%)',
};

const timeTextColors = {
    dawn: '#3d1f00',
    morning: '#0a2a4a',
    day: '#0a2040',
    evening: '#3b1200',
    dusk: '#1a0030',
    night: '#e8f0ff',
};

function getWeatherCardBg(description) {
    const d = description.toLowerCase();
    if (d.includes('thunder') || d.includes('storm')) return 'linear-gradient(135deg, #2c3e50, #4a5568)';
    if (d.includes('snow') || d.includes('sleet')) return 'linear-gradient(135deg, #dfe9f3, #c9d6df)';
    if (d.includes('rain') || d.includes('drizzle') || d.includes('shower')) return 'linear-gradient(135deg, #4b6cb7, #6a85b6)';
    if (d.includes('mist') || d.includes('fog')) return 'linear-gradient(135deg, #b0bec5, #cfd8dc)';
    if (d.includes('haze') || d.includes('smoke') || d.includes('dust')) return 'linear-gradient(135deg, #c8a96e, #e0c97f)';
    if (d.includes('cloud') || d.includes('overcast')) return 'linear-gradient(135deg, #8fa8c8, #b0c4de)';
    if (d.includes('clear') || d.includes('sunny')) return 'linear-gradient(135deg, #f7d774, #f5a623)';
    return 'linear-gradient(135deg, #74b9ff, #a8d8ff)'; // default
}

function getWeatherCardTextColor(description) {
    const d = description.toLowerCase();
    if (d.includes('thunder') || d.includes('storm')) return '#ecf0f1';
    if (d.includes('snow') || d.includes('sleet')) return '#2c3e50';
    if (d.includes('rain') || d.includes('drizzle') || d.includes('shower')) return '#ecf0f1';
    if (d.includes('mist') || d.includes('fog')) return '#2c3e50';
    if (d.includes('haze') || d.includes('smoke') || d.includes('dust')) return '#2c3e50';
    if (d.includes('cloud') || d.includes('overcast')) return '#2c3e50';
    if (d.includes('clear') || d.includes('sunny')) return '#2c3e50';
    return '#2c3e50'; // default
}

function applyTimeBackground() {
    const period = getTimePeriod();
    const body = document.body;
    const container = document.querySelector('.container');
    const dateEL = document.getElementById('date');
    const timeEL = document.getElementById('time');
    const textColor = timeTextColors[period];

    container.style.background = timeBgs[period];
    body.style.background = 'rgba(255, 255, 255, 0.8)';

    dateEL.style.color = textColor;
    timeEL.style.color = textColor;
}

function applyWeatherCardBackground(description) {
    const card = document.querySelector('.weatherCard');
    const cardTextColor = getWeatherCardTextColor(description);

    card.style.background = getWeatherCardBg(description);
    card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.18)';
    card.style.transition = 'background 0.8s ease, box-shadow 0.8s ease';

    // Update text colors inside the card
    document.getElementById('temp').style.color = cardTextColor === '#fff' ? '#fff' : '#4a90d9';
    document.getElementById('cityName').style.color = cardTextColor;
    document.getElementById('descript').style.color = cardTextColor;

    const statEls = document.querySelectorAll('.box h3, .box p');
    statEls.forEach(el => { el.style.color = cardTextColor; });

    const hrs = document.querySelectorAll('.weatherCard hr');
    hrs.forEach(hr => {
        hr.style.borderTopColor = 'rgba(255,255,255,0.3)';
        hr.style.backgroundColor = 'rgba(255,255,255,0.3)';
    });
}

applyTimeBackground();
document.getElementById('time').innerHTML = getCurrentTime();

setInterval(() => {
    document.getElementById('time').innerHTML = getCurrentTime();
    applyTimeBackground();
}, 60000);

// const getCurrentLocationWeather = () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;
//             getWeatherByCoordinates(lat, lon);
//         });
//     }
// };

document.getElementById("temp").innerHTML = "Loading...";

const getWeather = async (city) => {
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if (data.cod == 200) {
            document.getElementById("cityName").innerHTML = `${data.name}, ${data.sys.country}`;
            document.getElementById("temp").innerHTML = `${data.main.temp} °C`;
            document.getElementById("descript").innerHTML = `${data.weather[0].description}`;
            document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById("humidity").innerHTML = `${data.main.humidity} %`;
            document.getElementById("wind").innerHTML = `${data.wind.speed} km/h`;
            document.getElementById("feelsLike").innerHTML = `${data.main.feels_like} °C`;

            applyWeatherCardBackground(data.weather[0].description);
        } else if (data.cod == 404) {
            alert("City not found. Please enter a valid city name.");
        }
        else {
            alert("Something went wrong. Please try again later.");
        }

    }
    catch (error) {
        console.log(error);

        // document.getElementById("result").innerText =
        //     "Something went wrong";
    }
}

// getWeather('Delhi');
// getWeather('Perth');
// getWeather('New York');
// getWeather('Tokyo');
