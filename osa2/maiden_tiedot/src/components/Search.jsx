const Search = ({ value, changeHandler }) => {
  return (
    <p>
      find countries:
      <input type="text" value={value} onChange={changeHandler}/>
    </p>
  )
}

export default Search
