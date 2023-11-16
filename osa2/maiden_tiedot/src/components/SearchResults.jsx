import { useState, useEffect } from "react"

import CountryView from "./CountryView"

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const SearchResults = ({ countries }) => {
  const [expanded, setExpanded] = useState([])

  useEffect(() => {
    setExpanded(Array(countries.length).fill(false))
  }, [countries])

  const toggleExpand = (event, toggleIndex) => {
    setExpanded(expanded.map(( entry, index ) => index !== toggleIndex ? entry : !entry))
  }

  if (countries.length == 1) {
    return (
      <CountryView country={countries[0]}/>
    )
  } else if (countries.length < 10) {
    return (
      countries.map(( country, index ) => {
        return  (
          <div key={country.cca2}>
            {expanded[index] ? <CountryView country={country}/> : country.name.common}
              &nbsp;
              <Button text={expanded[index] ? "collapse" : "expand"} handleClick={event => toggleExpand(event, index)}/>
          </div>
        )
      })
    )
  }
  return <p>Too many matches, specify another filter</p>
}

export default SearchResults
