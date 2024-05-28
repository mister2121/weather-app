const cityInput = document.querySelector(".cityInput")
const weatherForm = document.querySelector(".weatherForm")
const card = document.querySelector(".card")
const errorContainer = document.querySelector(".errorContainer")
const apiKey = YOUR_API_KEY_HERE

// Get your own api key from openweathermap.org

weatherForm.addEventListener("submit", async (event) => {
	event.preventDefault()

	const city = cityInput.value
	if (city) {
		try {
			const weatherData = await fetchWeatherData(city)
			displayWeatherInfo(weatherData)
			clearError()
		} catch (error) {
			console.error(error)
			displayError(error)
		}
	} else {
		displayError("Enter a city name")
	}
})

async function fetchWeatherData(city) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

	const response = await fetch(apiUrl)

	if (!response.ok) {
		throw new Error("Could not fetch weather data")
	} else {
		return await response.json()
	}
}

function displayWeatherInfo(data) {
	const {
		name: city,
		main: { temp, humidity },
		weather: [{ description, id }],
		wind: { speed },
	} = data

	document.querySelector(".weatherEmoji").textContent = getWeatherEmoji(id)
	document.querySelector(".tempDisplay").textContent = `${(
		temp - 273.15
	).toFixed(1)} C`
	document.querySelector(".cityNameDisplay").textContent = city
	document.querySelector(".descDisplay").textContent = description
	document.querySelector(
		".humidityPercentage"
	).innerHTML = `<i class="fa-solid fa-water"></i> ${humidity}%`
	document.querySelector(
		".windSpeed"
	).innerHTML = `<i class="fa-solid fa-wind"></i> ${speed} km/h`

	card.style.display = "flex"
}

function getWeatherEmoji(weatherId) {
	switch (true) {
		case weatherId >= 200 && weatherId < 300:
			return "⛈️"
			break

		case weatherId >= 300 && weatherId < 400:
			return "🌧️"
			break

		case weatherId >= 500 && weatherId < 600:
			return "🌦️"
			break

		case weatherId >= 600 && weatherId < 700:
			return "❄️"

		case weatherId >= 700 && weatherId < 800:
			return "🌫️"
			break

		case weatherId === 800:
			return "☀️"
			break

		case weatherId > 800 && weatherId < 900:
			return "☁️"
			break

		default:
			return "🌈"
			break
	}
}

function displayError(message) {
	errorContainer.style.display = "flex"
	errorContainer.textContent = message
}

function clearError() {
	errorContainer.textContent = ""
	errorContainer.style.display = "none"
}
