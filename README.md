# 🌤️ Weather Website

A responsive weather application built with **HTML, CSS, and JavaScript** that allows users to search for a city and view current weather conditions and forecasts.

## 🚀 Live Demo

🔗 [View Live Website](https://my-weather-website-ten.vercel.app/)

## ✨ Features

* 🔍 Search weather by city name
* 🌍 Geocoding support for converting city names into geographic coordinates
* 🌡️ Display current temperature and weather conditions
* 💨 Display weather details such as humidity, wind speed, and pressure
* 🕐 Hourly weather forecast
* 📅 Multi-day weather forecast
* 🌤️ Dynamic weather icons
* 📱 Responsive design for different screen sizes
* ⚡ Dynamic data loading using JavaScript and Axios

## 🛠️ Technologies

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **Axios**
* **OpenWeather API**
* **OpenWeather Geocoding API**
* **Vercel**

## 🌐 APIs

### OpenWeather API

Used to retrieve weather information and forecasts for the selected location.

### OpenWeather Geocoding API

Used to convert a city name into its **latitude and longitude**, which are then used to request weather data for the exact location.

OpenWeather recommends using geographical coordinates for accurate location-based weather requests.

## 📁 Project Structure

```text
weather-website/
│
├── assets/
│   └── icons/
│
├── index.html
├── style.css
├── script.js
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd weather-website
```

Install dependencies:

```bash
npm install
```

```for run
1.npm run dev
2.npm run start:tw
```

Then open the project with your preferred development environment.

## 🔑 API Key

This project uses an **OpenWeather API key**.

For security, do not expose your personal API key in a public repository. Store sensitive credentials using environment variables or your deployment platform's environment-variable settings.

## 📸 Preview

The application provides a clean and responsive interface for searching cities and viewing their weather information.

## 🚀 Deployment

The project is deployed using **Vercel**.

🔗 [Live Demo](https://my-weather-website-ten.vercel.app/)

## 📚 API Documentation

* [OpenWeather API](https://openweathermap.org/api)
* [OpenWeather Geocoding API](https://openweathermap.org/api/geocoding-api)

## 👨‍💻 Author

Developed as a front-end web development project using JavaScript and REST APIs.
