import { useState, useEffect } from "react"
import WeatherService from "../services/WeatherService"

const Weather = ({ country }) => {
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [iconURL, setIconURL] = useState(null)

  useEffect(() => getWeatherData(), [])

  const getWeatherData = () => {
    WeatherService.getWeatherOfCapital(country).then(weather => {
      setTemp(weather.temperature)
      setWind(weather.windSpeed)
      setIconURL(weather.iconURL)
    })
  }

  return (
    <div className="weather">
    <h3>Weather in {country.capital[0]}</h3>
    <p>temperature {temp}&deg;C</p>
    <img src={iconURL}/>
    <p>wind {wind} m/s</p>
    </div>
  )
}

export default Weather
