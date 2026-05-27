const API_KEY = '3d9b9f72076dc3e337b157a8de719883';

document.getElementById("seacrhBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;

    if (city) { getWeather(city); } else if (city === "") { alert("Please enter a city name"); return; }
})

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
        }
        else {
            document.getElementById("result").innerText =
                data.message;
        }

    }
    catch (error) {
        console.log(error);
    }
}
