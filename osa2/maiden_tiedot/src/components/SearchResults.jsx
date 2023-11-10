const SearchResults = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  return (
    countries.map(country => <p key={country}>{country}</p>)
  )
}

export default SearchResults
