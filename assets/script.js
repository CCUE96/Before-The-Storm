// created a variable for the API KEY
var apiKey = '137868e6ad7a28f7612c1490a801723d';

let searchedCities=[];
// function to fetch weather data single day
    function fetchWeatherData(city) {
        // Plug variable for api key appid=${api key var }
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No Response');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
             displayWeatherData(data);
            //  fetch lat and Lon for the 5 day forecast
             fetchForecastData(data.coord.lat,data.coord.lon)
            })
            .catch(error => {
                console.error('Did not work:', error);
            });
    }
//  function to fetch forecast data
    function fetchForecastData(lat, lon) {
        console.log(apiKey)
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No Response');
                }
                return response.json();
            })
            .then(data => {
                displayForecastData(data);
            })
            .catch(error => {
                console.error('Did not work:', error);
            });
    }

    

function displayWeatherData(data) {
    // variables to store api data
    const cityName = data.name;
    // return temperature in Kelvin
    const temperatureK = data.main.temp;
    // convert Kelvin to Celsius
    const temperatureC = (temperatureK - 273.15).toFixed(2);
    // convert Celsius to Fahrenheit
    const temperatureF = (temperatureC * 9/5 + 32).toFixed(2);
    const weatherMain = data.weather[0].main;
    const windSpeed=data.wind.speed
    const humidity=data.main.humidity
    const weatherIcon= data.weather[0].icon

    // Update the cityname
    document.getElementById('currentCity').textContent = cityName;
    
    const weatherIconImg = document.createElement('img');
    weatherIconImg.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    weatherIconImg.alt = 'Weather Icon';
 


    // Get weather data container created in html
    const weatherDataContainer = document.getElementById('weatherData');
    weatherDataContainer.textContent = '';

    // Created Tempurature Element
    const temperatureEl = document.createElement('p');
    temperatureEl.textContent = `Temperature: ${temperatureF} °F`;
    console.log(temperatureEl)

    // Created Weather Element
    const weatherEl = document.createElement('p');
    weatherEl.textContent = `Weather: ${weatherMain}`;
    console.log(weatherEl)

        // Created Wind Speed Element
        const windSpeedEl = document.createElement('p');
        windSpeedEl.textContent = `Wind Speed: ${windSpeed} m/s`;
    console.log(windSpeedEl)
        // Created Humidity Element
        const humidityEl = document.createElement('p');
        humidityEl.textContent = `Humidity: ${humidity}%`;
    console.log(humidityEl)

    // append created elements to the HTML
    weatherDataContainer.appendChild(temperatureEl);
    weatherDataContainer.appendChild(weatherEl);
    weatherDataContainer.appendChild(windSpeedEl);
    weatherDataContainer.appendChild(humidityEl);
    weatherDataContainer.appendChild(weatherIconImg);
   
}

function displayForecastData(forecastData) {
    console.log(forecastData)
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    for (let i = 0; i < forecastData.list.length; i+=8) {
        const forecast = forecastData.list[i];
        const date = new Date(forecast.dt * 1000);
       
        
       
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        
        // Date
        
        const dateElement = document.createElement('p');
        dateElement.classList.add('forecast-header');
        dateElement.textContent = date.toDateString();
        card.appendChild(dateElement);
        
        // Weather icon
        const iconElement = document.createElement('img');
        iconElement.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        iconElement.alt = 'Weather Icon';
        card.appendChild(iconElement);
        
        // Temperature
        const temperatureK = forecast.main.temp;
        const temperatureC = (temperatureK - 273.15).toFixed(2);
        const temperatureF = (temperatureC * 9/5 + 32).toFixed(2);
        const tempElement = document.createElement('p');
        tempElement.textContent = `Temperature: ${temperatureF} °F`;
        card.appendChild(tempElement);

          // Temperature
          const windSpeedElement = document.createElement('p');
          windSpeedElement.textContent = `Wind Speed: ${forecast.wind.speed} m/s`;
          card.appendChild(windSpeedElement);
          
        
        // Humidity
        const humidityElement = document.createElement('p');
        humidityElement.textContent = `Humidity: ${forecast.main.humidity}%`;
        card.appendChild(humidityElement);
        
        // Append card to forecast container
        forecastContainer.appendChild(card);
    }
}


function addSearchedCities(city){
    console.log('added:',addSearchedCities)
    searchedCities.push(city);
    displaySearchedCities();
}

function displaySearchedCities(){
    console.log(displaySearchedCities);
    const cityListContainer =document.getElementById('searchedCitiesContainer')
    cityListContainer.innerHTML=''

    for (let i=0; i< searchedCities.length; i++){
        const city=searchedCities[i]
        const cityItems=document.createElement('button')
        cityItems.classList.add('cityItems')
        cityItems.textContent=city;
        console.log(cityItems)
        cityItems.addEventListener('click',() => {
            console.log(cityItems)
            fetchWeatherData(city)
        });
        cityListContainer.appendChild(cityItems)
        console.log(cityItems)
    }


}


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('Search').value.trim();
    if (city) {
        fetchWeatherData(city);
        addSearchedCities(city)
    }
});

