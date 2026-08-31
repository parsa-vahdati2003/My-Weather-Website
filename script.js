import axios from "axios";

console.log("hi");

// ========================================
// SELECTING ELEMENTS
// ========================================

const fahrenheitBtn = document.querySelector("#fahrenheit");
const celsiusBtn = document.querySelector("#celsius");

const hourShow = document.querySelector("#hour-show");
const fiveDayShow = document.querySelector("#five-Day-show");

const summeryWeather = document.querySelector("#summery-weather");

const highTemp = document.querySelector("#high-temp");
const lowTemp = document.querySelector("#low-temp");
const tepmNow = document.querySelector("#tepm-now");

const weatherIconTop = document.querySelector("#weather-icon-top");

const nameCountry = document.querySelector("#name-country");
const dateTime = document.querySelector("#date-time");
const weatherNow = document.querySelector("#weather-now");

const fiveDayContainer = document.querySelector("#five-day-container");
const hourlyContainer = document.querySelector("#hourly-container");
const hourlyContainerFetch = document.querySelector("#hourly-fetch");

const cityInput = document.querySelector("#city-input");
const searchCityBtn = document.querySelector("#search-city");

// ========================================
// TEMPERATURE UNIT
// ========================================

let temperatureUnit = "celsius";

// Celsius is active by default
celsiusBtn.classList.add("active");
fahrenheitBtn.classList.remove("active");

// ========================================
// FORECAST TABS
// ========================================

// hourShow section first show
hourShow.classList.add("active");
hourlyContainer.classList.add("active-forecast");
fiveDayContainer.classList.remove("active-forecast");

function showForecast(type) {
  const show = type === "hour" ? hourlyContainer : fiveDayContainer;

  const hide = type === "hour" ? fiveDayContainer : hourlyContainer;

  hourShow.classList.toggle("active", type === "hour");
  fiveDayShow.classList.toggle("active", type === "seven");

  // exit animation
  hide.classList.remove("active-forecast");

  setTimeout(() => {
    hide.classList.add("hidden");

    show.classList.remove("hidden");

    requestAnimationFrame(() => {
      show.classList.add("active-forecast");
    });
  }, 350);
}

// Hourly button
hourShow.addEventListener("click", () => {
  showForecast("hour");
});

// 5-Day button
fiveDayShow.addEventListener("click", () => {
  showForecast("seven");
});

// ========================================
// CELSIUS → FAHRENHEIT
// ========================================

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

// ========================================
// FAHRENHEIT → CELSIUS
// ========================================

function toCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

// ========================================
// API
// ========================================

const myApiKey = "24efe2301a69c816e64be75a1d36e7d7";

// ========================================
// GEOCODING API
// ========================================
async function getCityCoordinates(cityName) {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${myApiKey}`,
  );

  console.log("City Location:", response.data);

  if (response.data.length === 0) {
    throw new Error("City not found");
  }

  return response.data[0];
}

getCityCoordinates("Rasht");

// ========================================
// openWeather API
// ========================================
async function getWeather(cityName) {
  try {
    // ========================================
    // GET LAT / LON
    // ========================================

    const location = await getCityCoordinates(cityName);

    console.log("Selected City:", location);

    const lat = location.lat;
    const lon = location.lon;

    console.log("Latitude:", lat);
    console.log("Longitude:", lon);

    // ========================================
    // WEATHER API
    // ========================================

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=metric`,
    );

    console.log("API DATA:", res.data);

    // ========================================
    // API DATA
    // ========================================

    const forecast = res.data.list;
    const city = res.data.city;

    console.log("Forecast:", forecast);
    console.log("City:", city);

    // ========================================
    // CURRENT WEATHER
    // ========================================

    const currentWeather = forecast[0];

    console.log("Current Weather:", currentWeather);

    const currentTemp = Math.round(currentWeather.main.temp);

    const feelsLikeValue = Math.round(currentWeather.main.feels_like);

    const humidity = currentWeather.main.humidity;

    const pressure = currentWeather.main.pressure;

    const wind = currentWeather.wind.speed;

    const iconTop = currentWeather.weather[0].icon;

    const description = currentWeather.weather[0].description;

    // ========================================
    // SUNRISE / SUNSET
    // ========================================

    const sunrise = new Date(city.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const sunset = new Date(city.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // ========================================
    // TOP CARD
    // ========================================

    tepmNow.textContent = `${currentTemp}°`;

    weatherIconTop.src = `https://openweathermap.org/img/wn/${iconTop}@2x.png`;

    weatherIconTop.alt = description;

    // ========================================
    // CITY / COUNTRY
    // ========================================

    const nameOfCity = city.name;
    const nameOfCountry = city.country;

    nameCountry.textContent = `${nameOfCountry}, ${nameOfCity}`;

    // ========================================
    // WEATHER DESCRIPTION
    // ========================================

    weatherNow.textContent = description;

    // ========================================
    // DATE / TIME
    // ========================================

    const now = new Date();

    dateTime.textContent = now.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    // ========================================
    // HIGH / LOW TODAY
    // ========================================

    const today = forecast[0].dt_txt.split(" ")[0];

    const todayTemps = forecast
      .filter((item) => item.dt_txt.startsWith(today))
      .map((item) => item.main.temp);

    const maxTemp = Math.round(Math.max(...todayTemps));

    const minTemp = Math.round(Math.min(...todayTemps));

    highTemp.textContent = `H:${maxTemp}°`;

    lowTemp.textContent = `L:${minTemp}°`;

    // ========================================
    // SUMMARY
    // ========================================

    function renderSummary() {
      const isFahrenheit = temperatureUnit === "fahrenheit";

      const displayedFeelsLike = isFahrenheit
        ? toFahrenheit(feelsLikeValue)
        : feelsLikeValue;

      const summaryItems = [
        {
          title: "FEELS LIKE",
          icon: "./assets/icon/thermometer.png",
          value: `${displayedFeelsLike}°`,
        },

        {
          title: "HUMIDITY",
          icon: "./assets/icon/humidity.png",
          value: `${humidity}%`,
        },

        {
          title: "WIND",
          icon: "./assets/icon/wind.png",
          value: `${wind} m/s`,
        },

        {
          title: "PRESSURE",
          icon: "./assets/icon/pressure.png",
          value: `${pressure} hPa`,
        },

        {
          title: "SUNRISE",
          icon: "./assets/icon/sunrise.png",
          value: sunrise,
        },

        {
          title: "SUNSET",
          icon: "./assets/icon/sunset.png",
          value: sunset,
        },
      ];

      summeryWeather.innerHTML = "";

      summaryItems.forEach((item) => {
        summeryWeather.insertAdjacentHTML("beforeend", templateSummary(item));
      });
    }

    renderSummary();

    // ========================================
    // 5-DAY FORECAST
    // ========================================

    const dailyData = {};

    forecast.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];

      if (!dailyData[date]) {
        dailyData[date] = [];
      }

      dailyData[date].push(item);
    });

    console.log("Daily Data:", dailyData);

    // ========================================
    // GET 5 DAYS
    // ========================================

    const days = Object.keys(dailyData)
      .slice(0, 5)
      .map((date) => {
        const items = dailyData[date];

        const temps = items.map((item) => item.main.temp);

        const minTemp = Math.round(Math.min(...temps));

        const maxTemp = Math.round(Math.max(...temps));

        const rain = Math.round(
          Math.max(...items.map((item) => item.pop)) * 100,
        );

        const weatherItem = items[Math.floor(items.length / 2)];

        const icon = weatherItem.weather[0].icon;

        const description = weatherItem.weather[0].description;

        const [year, month, day] = date.split("-").map(Number);

        const dateObject = new Date(year, month - 1, day);

        const dayName = dateObject
          .toLocaleDateString("en-US", {
            weekday: "short",
          })
          .toUpperCase();

        const monthDay = dateObject.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return {
          date,
          day: dayName,
          monthDay,
          icon,
          description,
          rain,
          minTemp,
          maxTemp,
        };
      });

    console.log("5 Days:", days);

    // ========================================
    // RENDER 5 DAYS
    // ========================================

    function renderFiveDays() {
      fiveDayContainer.innerHTML = "";

      days.forEach((item) => {
        const convertedItem = {
          ...item,
          minTemp:
            temperatureUnit === "fahrenheit"
              ? toFahrenheit(item.minTemp)
              : item.minTemp,
          maxTemp:
            temperatureUnit === "fahrenheit"
              ? toFahrenheit(item.maxTemp)
              : item.maxTemp,
        };

        fiveDayContainer.insertAdjacentHTML(
          "beforeend",
          templateFiveDay(convertedItem),
        );
      });
    }

    renderFiveDays();

    // ========================================
    // CELSIUS BUTTON
    // ========================================

    celsiusBtn.onclick = () => {
      temperatureUnit = "celsius";

      celsiusBtn.classList.add("active");

      fahrenheitBtn.classList.remove("active");

      tepmNow.textContent = `${currentTemp}°`;

      highTemp.textContent = `H:${maxTemp}°`;

      lowTemp.textContent = `L:${minTemp}°`;

      renderSummary();

      renderFiveDays();
    };

    // ========================================
    // FAHRENHEIT BUTTON
    // ========================================

    fahrenheitBtn.onclick = () => {
      temperatureUnit = "fahrenheit";

      fahrenheitBtn.classList.add("active");

      celsiusBtn.classList.remove("active");

      tepmNow.textContent = `${toFahrenheit(currentTemp)}°`;

      highTemp.textContent = `H:${toFahrenheit(maxTemp)}°`;

      lowTemp.textContent = `L:${toFahrenheit(minTemp)}°`;

      renderSummary();

      renderFiveDays();
    };

    // ========================================
    // HOURLY FORECAST
    // ========================================

    const currentTime = new Date();

    const currentHourly = forecast.reduce((closest, item) => {
      const itemTime = new Date(item.dt * 1000);

      const closestTime = new Date(closest.dt * 1000);

      const itemDiff = Math.abs(itemTime - currentTime);

      const closestDiff = Math.abs(closestTime - currentTime);

      return itemDiff < closestDiff ? item : closest;
    });

    console.log("Current Hourly:", currentHourly);

    // ========================================
    // HOURLY DATA
    // ========================================

    const hourlyData = forecast.slice(0, 9).map((item) => {
      const time = new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "numeric",
      });

      const tempCelsius = Math.round(item.main.temp);

      const temp =
        temperatureUnit === "fahrenheit"
          ? toFahrenheit(tempCelsius)
          : tempCelsius;

      const icon = item.weather[0].icon;

      const rain = Math.round(item.pop * 100);

      const isNow = item === currentHourly;

      return {
        time,
        temp,
        icon,
        rain,
        isNow,
      };
    });

    console.log("Hourly Data:", hourlyData);

    // ========================================
    // RENDER HOURLY
    // ========================================

    hourlyContainerFetch.innerHTML = "";

    hourlyData.forEach((item) => {
      hourlyContainerFetch.insertAdjacentHTML(
        "beforeend",
        templateHourly(item),
      );
    });
  } catch (err) {
    console.log("API ERROR:", err);

    alert("City not found!");
  }
}

// ========================================
// SEARCH CITY
// ========================================

searchCityBtn.addEventListener("click", () => {
  const cityName = cityInput.value.trim();

  if (!cityName) {
    return;
  }

  getWeather(cityName);
});

// ========================================
// ENTER KEY
// ========================================

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const cityName = cityInput.value.trim();

    if (!cityName) {
      return;
    }

    getWeather(cityName);
  }
});

// ========================================
// DEFAULT CITY
// ========================================

getWeather("New York");

// ========================================
// SUMMARY TEMPLATE
// ========================================

function templateSummary(item) {
  return `
    <div
      class="w-34 backdrop-blur-md rounded-2xl p-4
      transition-all hover:scale-[1.02]
      hover:bg-white/10 bg-bg-Input
      border border-solid border-border"
    >

      <div class="flex items-center gap-1.5 mb-2">

        <img
          class="size-5"
          src="${item.icon}"
          alt="${item.title}"
        />

        <span
          class="font-jetbrains text-xs
          text-muted-foreground tracking-wide"
        >
          ${item.title}
        </span>

      </div>

      <p
        class="font-semibold text-white
        text-lg font-jetbrains"
      >
        ${item.value}
      </p>

    </div>
  `;
}

// ========================================
// 5-DAY TEMPLATE
// ========================================

function templateFiveDay(item) {
  return `
    <div
      class="flex items-center gap-4 px-8 py-5
      transition-all cursor-default
      border-b border-solid border-bg-Input
      bg-bg-Input"
    >

      <!-- DAY / DATE -->

      <div class="w-16">

        <p
          class="font-bold text-base tracking-wide
          font-jetbrains text-t-active"
        >
          ${item.day}
        </p>

        <p
          class="font-jetbrains text-xs
          text-muted-foreground"
        >
          ${item.monthDay}
        </p>

      </div>

      <!-- WEATHER ICON -->

      <img
        src="https://openweathermap.org/img/wn/${item.icon}@2x.png"
        alt="icon-weather"
        class="size-9"
      />

      <!-- DESCRIPTION -->

      <p
        class="flex-1 text-base font-medium
        text-muted-foreground"
      >
        ${item.description}
      </p>

      <!-- RAIN -->

      <span
        class="text-xs px-2.5 py-1 rounded-full
        font-medium font-jetbrains
        bg-t-percent/15 text-t-percent"
      >
        ${item.rain}%
      </span>

      <!-- MIN / MAX -->

      <div
        class="flex items-center gap-4 ml-auto"
      >

        <span
          class="text-sm w-8 text-right
          font-medium font-jetbrains
          text-muted-foreground"
        >
          ${item.minTemp}°
        </span>

        <div
          class="relative h-1.5 w-24
          bg-white/10 rounded-full overflow-hidden"
        >

          <div
            class="absolute h-full rounded-full
            bg-linear-to-r
            from-cyan-400 to-violet-500
            left-[12%] w-[60%]"
          ></div>

        </div>

        <span
          class="text-sm w-8 font-bold
          text-white font-jetbrains"
        >
          ${item.maxTemp}°
        </span>

      </div>

    </div>
  `;
}

// ========================================
// HOURLY TEMPLATE
// ========================================

function templateHourly(item) {
  return `
    <div
      class="
        border border-solid border-border2
        ${item.isNow ? "bg-btnFC-active" : "bg-transparent"}
        flex-none flex flex-col items-center
        gap-3 rounded-2xl px-5 py-5
        transition-all hover:-translate-y-1
        hover:shadow-lg cursor-default min-w-21
      "
    >

      <span
        class="
          text-base font-semibold
          font-jetbrains text-t-active
          tracking-wider
        "
      >
        ${item.isNow ? "NOW" : item.time}
      </span>

      <img
        src="https://openweathermap.org/img/wn/${item.icon}@2x.png"
        alt="weather-icon"
        class="size-9"
      />

      <span
        class="
          font-bold text-white
          text-lg font-jetbrains
        "
      >
        ${item.temp}°
      </span>

      <span
        class="
          text-xs font-medium
          font-jetbrains text-t-percent
        "
      >
        ${item.rain}%
      </span>

    </div>
  `;
}
