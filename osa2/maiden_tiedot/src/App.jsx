import { useState, useEffect } from "react"

import Search from "./components/Search"
import SearchResults from "./components/SearchResults"
import CountryService from "./services/CountryService"

const App = () => {

  const [countryData, setCountryData] = useState([])
  const [wordFilter, setWordFilter] = useState("")

  useEffect(() => getAllCountryData(), [])

  const getAllCountryData = () => {
    CountryService.getAllCountries()
      .then(responseData => {
        setCountryData(responseData)
      })
  }

  const handleSearchChange = (event) => {
    setWordFilter(event.target.value)
  }

  const filteredCountries = countryData.filter(country => country.name.common.toLowerCase().includes(wordFilter.toLowerCase()))

  return (
    <>
      <Search value={wordFilter} changeHandler={handleSearchChange}/>
      <SearchResults countries={filteredCountries}/>  
    </>
  )

}

export default App
