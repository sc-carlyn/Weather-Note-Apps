const apiKey = '2435a6c123c861a4e64634f8d7c48baa'; // OpenWeatherMap API Key
const searchButton = document.getElementById('search');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weather-info');
const weatherIcon = document.getElementById('weather-icon');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');

searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) fetchWeatherData(city);
});

function fetchWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(() => alert('Hava durumu verileri alınamadı.'));
}

function displayWeather(data) {
  const mainWeather = data.weather[0].main.toLowerCase();
  const temp = data.main.temp;
  const desc = data.weather[0].description;

  description.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
  temperature.textContent = `${temp}°C`;

  let animationFile = 'animations/sunny.json'; // default
  if (mainWeather.includes('cloud')) animationFile = 'animations/cloudy.json';
  if (mainWeather.includes('rain')) animationFile = 'animations/rain.json';

  loadAnimation(animationFile);
  weatherInfo.style.display = 'block';
}

function loadAnimation(animationFile) {
  weatherIcon.innerHTML = '';
  const animContainer = document.createElement('div');
  weatherIcon.appendChild(animContainer);

  lottie.loadAnimation({
    container: animContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animationFile
  });
}
