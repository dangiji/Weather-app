const apikey = "d16626eb340383f903778426ba94907b";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".Weather-icon");
const errorElement = document.querySelector(".error");

async function checkweather(city) {
    try {
        // Always hide error before making API call
        errorElement.style.display = "none";

        // Fetch weather data
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Set weather icon based on condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition === "clouds") {
            weathericon.src = "images/images - Copy/clouds.png";
        } else if (weatherCondition === "clear") {
            weathericon.src = "images/images - Copy/clear.png";
        } else if (weatherCondition === "drizzle") {
            weathericon.src = "images/images - Copy/drizzle.png";
        } else if (weatherCondition === "mist") {
            weathericon.src = "images/images - Copy/mist.png";
        } 

        // Show the weather section
        document.querySelector(".Weather").style.display = "block";
    } catch (error) {
        // Show error message and hide weather data
        errorElement.style.display = "block";
        document.querySelector(".Weather").style.display = "none";
    }
}

// Add event listener to the search button
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});
