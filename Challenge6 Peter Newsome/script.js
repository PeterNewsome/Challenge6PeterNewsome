function getweatherdata(city){
    const apikey = "3804a60c2a6cba653618ba32cbe1e2ea";
    const apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`;

    fetch(apiurl)
    .then((response)=>response.json())
    .then((data)=>{
        const currentweather=document.getElementById('current-weather');
        console.log(data)
        const cityName = data.city.name;
        const currentDate = new Date(data.list[0].dt*1000);
        const weatherIcon = data.list[0].weather[0].icon;
        const temperature = data.list[0].main.temp;
        const humidity = data.list[0].main.humidity;
        const windSpeed = data.list[0].wind.speed;
        currentweather.innerHTML = `
      <h2>${cityName} - ${currentDate.toDateString()}</h2>
      <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
      <p>Temperature: ${temperature}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;
    
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = ''; // Clear previous forecast data

    for (let i = 0; i < 5; i++) {
      const forecastData = data.list[i * 8]; // Data for each day
      const date = new Date(forecastData.dt * 1000);
      const forecastIcon = forecastData.weather[0].icon;
      const forecastTemperature = forecastData.main.temp;
      const forecastHumidity = forecastData.main.humidity;
      const forecastWindSpeed = forecastData.wind.speed;

forecast.innerHTML += `
        <div class="forecast-item">
          <p>${date.toDateString()}</p>
          <img src="https://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather Icon">
          <p>Temperature: ${forecastTemperature}°C</p>
          <p>Humidity: ${forecastHumidity}%</p>
          <p>Wind Speed: ${forecastWindSpeed} m/s</p>
        </div>
      `;
    }
  })
  .catch((error) => {
    console.error('Error fetching weather data: ', error);
  });
  
}
document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const city = document.getElementById('city-input').value;
  getweatherdata(city);
});
