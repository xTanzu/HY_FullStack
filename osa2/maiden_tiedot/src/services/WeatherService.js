import axios from 'axios'

const getWeatherOfCapital = (country) => {
  const appId = import.meta.env.VITE_OWM_APP_ID
  const geocode_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]},${country.ccn3}&limit=1&appid=${appId}`

  return axios.get(geocode_URL).then(response => {
    const geocode = response.data[0]
    const weather_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${geocode.lat}&lon=${geocode.lon}&appid=${appId}&units=metric`
    return axios.get(weather_URL).then(response => {
      return {temperature: response.data.main.temp, windSpeed: response.data.wind.speed, iconURL: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
    })
  })

}

export default {getWeatherOfCapital}

