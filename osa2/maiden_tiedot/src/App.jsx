import { useState, useEffect } from "react"

import Search from "./components/Search"
import SearchResults from "./components/SearchResults"
import CountryService from "./services/CountryService"

const App = () => {

  const [countryData, setCountryData] = useState({})
  const [countryNames, setCountryNames] = useState([])
  const [wordFilter, setWordFilter] = useState("")

  useEffect(() => getAllCountryData(), [])

  const getAllCountryData = () => {
    CountryService.getAllCountries()
      .then(responseData => {
        setCountryData(responseData)
        setCountryNames(responseData.map(country => country.name.common))
      })
  }

  const handleSearchChange = (event) => {
    setWordFilter(event.target.value)
  }

  const filteredCountryNames = countryNames.filter(country => country.toLowerCase().includes(wordFilter.toLowerCase()))

  return (
    <>
      <Search value={wordFilter} changeHandler={handleSearchChange}/>
      <SearchResults countries={filteredCountryNames}/>  
    </>
  )

}

export default App
