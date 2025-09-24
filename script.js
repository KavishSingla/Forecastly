let cityInput = document.querySelector('#cityInput');
let searchBtn = document.querySelector('#searchBtn');
let loading = document.querySelector('#loading');
let error = document.querySelector('#error');
let weatherInfo = document.querySelector('#weatherInfo');
let cityName = document.querySelector('#cityName');
let temperature = document.querySelector('#temperature');
let weatherIcon = document.querySelector('#weatherIcon');
let description = document.querySelector('#description');
let feelsLike = document.querySelector('#feelsLike');
let humidity = document.querySelector('#humidity');
let windSpeed = document.querySelector('#windSpeed');

const apiKey = "7009e8f11943f03da09ca2cda634d583";

function displayError(msg) {
    

    error.innerText = msg;
    error.classList.add("show");
    weatherInfo.classList.remove("show");


}


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (!city) {
        displayError("Please enter a city name!")
        return;
    }



    getweather(city)


})

async function getweather(city) {
    try {
        loading.classList.add("show");
        error.classList.remove("show");
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

         if (data.cod === "404") {  
             loading.classList.remove("show"); 
             displayError("City not found!");
            
            return;
        }

        setTimeout(()=>{
            loading.classList.remove("show");
            updateWeatherUI(data);

        },2000);

        console.log(data);

    } catch (err) {
         loading.classList.remove("show");      
        displayError("Something went wrong!");

    }

}

function updateWeatherUI(data){
    document.body.className = "";

   cityName.innerText = `${data.name} , ${data.sys.country}`;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    description.innerText = data.weather[0].description;
    feelsLike.innerText = `${Math.round(data.main.feels_like)}°C`;
    humidity.innerText = `${data.main.humidity}%`;
    windSpeed.innerText = `${Math.round(data.wind.speed)} km/h`;

    const mainWeather = data.weather[0].main.toLowerCase();
    let icon = "☀️";
    if (mainWeather.includes("cloud")){
        document.body.classList.add("cloudy");
        icon = "☁️";
    } 
    else if (mainWeather.includes("rain")){ 
        document.body.classList.add("rainy")
        icon = "🌧️";
    }
    else if (mainWeather.includes("snow")) {
        document.body.classList.add("snowy")
        icon = "❄️";
    }
    else if (mainWeather.includes("thunder")) {
        document.body.classList.add("thunderstorm")
        icon = "⛈️";
    }
    else if (mainWeather.includes("mist") || mainWeather.includes("fog")) {
        document.body.classList.add("foggy")
        icon = "🌫️";
    }
    else if (mainWeather.includes("clear")) {
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 18) document.body.classList.add("clear-day");
    else document.body.classList.add("clear-night");
    icon = "☀️";
}

    weatherIcon.innerText = icon;
   
    weatherInfo.classList.add("show");

}



    
