
        class WeatherApp {
            constructor() {
                this.searchInput = document.getElementById('cityInput');
                this.searchBtn = document.getElementById('searchBtn');
                this.loading = document.getElementById('loading');
                this.error = document.getElementById('error');
                this.weatherInfo = document.getElementById('weatherInfo');
                
                this.cityName = document.getElementById('cityName');
                this.weatherIcon = document.getElementById('weatherIcon');
                this.temperature = document.getElementById('temperature');
                this.description = document.getElementById('description');
                this.feelsLike = document.getElementById('feelsLike');
                this.humidity = document.getElementById('humidity');
                this.windSpeed = document.getElementById('windSpeed');

                this.initEventListeners();
                this.showDefaultWeather();
            }

            initEventListeners() {
                this.searchBtn.addEventListener('click', () => this.searchWeather());
                this.searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.searchWeather();
                    }
                });
            }

            showDefaultWeather() {
                // Show default weather for demo
                this.updateWeatherDisplay({
                    cityName: 'Patiala, IN',
                    temperature: 28,
                    description: 'Clear sky',
                    feelsLike: 32,
                    humidity: 65,
                    windSpeed: 12,
                    weatherCondition: 'clear-day'
                });
            }

            searchWeather() {
                const city = this.searchInput.value.trim();
                
                if (!city) {
                    this.showError('Please enter a city name');
                    return;
                }

                this.showLoading();
                
                // Simulate API call with setTimeout
                setTimeout(() => {
                    this.simulateWeatherData(city);
                }, 1500);
            }

            simulateWeatherData(city) {
                // Simulate different weather conditions based on city name
                const weatherConditions = {
                    'london': {
                        cityName: 'London, UK',
                        temperature: 15,
                        description: 'Light rain',
                        feelsLike: 13,
                        humidity: 85,
                        windSpeed: 8,
                        weatherCondition: 'rainy'
                    },
                    'tokyo': {
                        cityName: 'Tokyo, JP',
                        temperature: 22,
                        description: 'Partly cloudy',
                        feelsLike: 24,
                        humidity: 70,
                        windSpeed: 6,
                        weatherCondition: 'cloudy'
                    },
                    'mumbai': {
                        cityName: 'Mumbai, IN',
                        temperature: 32,
                        description: 'Hot and humid',
                        feelsLike: 38,
                        humidity: 80,
                        windSpeed: 10,
                        weatherCondition: 'clear-day'
                    },
                    'new york': {
                        cityName: 'New York, US',
                        temperature: 18,
                        description: 'Thunderstorm',
                        feelsLike: 16,
                        humidity: 90,
                        windSpeed: 15,
                        weatherCondition: 'thunderstorm'
                    },
                    'moscow': {
                        cityName: 'Moscow, RU',
                        temperature: -5,
                        description: 'Snow',
                        feelsLike: -10,
                        humidity: 75,
                        windSpeed: 20,
                        weatherCondition: 'snowy'
                    }
                };

                const cityKey = city.toLowerCase();
                
                if (weatherConditions[cityKey]) {
                    this.updateWeatherDisplay(weatherConditions[cityKey]);
                } else {
                    // Generate random weather for unknown cities
                    const randomWeather = this.generateRandomWeather(city);
                    this.updateWeatherDisplay(randomWeather);
                }
            }

            generateRandomWeather(city) {
                const conditions = ['clear-day', 'cloudy', 'rainy', 'foggy'];
                const descriptions = ['Clear sky', 'Partly cloudy', 'Light rain', 'Foggy'];
                const randomIndex = Math.floor(Math.random() * conditions.length);
                
                const temperature = Math.floor(Math.random() * 35) + 5; // 5-40°C
                const feelsLike = temperature + Math.floor(Math.random() * 10) - 5;
                const humidity = Math.floor(Math.random() * 60) + 40; // 40-100%
                const windSpeed = Math.floor(Math.random() * 25) + 5; // 5-30 km/h

                return {
                    cityName: city,
                    temperature: temperature,
                    description: descriptions[randomIndex],
                    feelsLike: feelsLike,
                    humidity: humidity,
                    windSpeed: windSpeed,
                    weatherCondition: conditions[randomIndex]
                };
            }

            updateWeatherDisplay(data) {
                this.hideLoading();
                this.hideError();

                this.cityName.textContent = data.cityName;
                this.temperature.textContent = `${data.temperature}°C`;
                this.description.textContent = data.description;
                this.feelsLike.textContent = `${data.feelsLike}°C`;
                this.humidity.textContent = `${data.humidity}%`;
                this.windSpeed.textContent = `${data.windSpeed} km/h`;

                // Update weather icon
                this.updateWeatherIcon(data.weatherCondition);

                // Update background
                this.updateBackground(data.weatherCondition);

                // Show weather info
                this.weatherInfo.classList.add('show');
            }

            updateWeatherIcon(condition) {
                const icons = {
                    'clear-day': '☀️',
                    'clear-night': '🌙',
                    'cloudy': '☁️',
                    'rainy': '🌧️',
                    'snowy': '❄️',
                    'thunderstorm': '⛈️',
                    'foggy': '🌫️'
                };

                this.weatherIcon.textContent = icons[condition] || '☀️';
            }

            updateBackground(condition) {
                // Remove all background classes
                document.body.className = '';
                
                // Add the new background class
                document.body.classList.add(condition);
            }

            showLoading() {
                this.loading.classList.add('show');
                this.weatherInfo.classList.remove('show');
                this.error.classList.remove('show');
            }

            hideLoading() {
                this.loading.classList.remove('show');
            }

            showError(message) {
                this.error.textContent = message;
                this.error.classList.add('show');
                this.hideLoading();
                this.weatherInfo.classList.remove('show');
            }

            hideError() {
                this.error.classList.remove('show');
            }
        }

        // Initialize the weather app when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new WeatherApp();
        });
