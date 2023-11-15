import CountryView from "./CountryView"

const SearchResults = ({ countries }) => {
  if (countries.length == 1) {
    return (
      <CountryView country={countries[0]}/>
    )
  } else if (countries.length < 10) {
    return (
      countries.map(country => <p key={country.cca2}>{country.name.common}</p>)
    )
  }
  return <p>Too many matches, specify another filter</p>
}

export default SearchResults
