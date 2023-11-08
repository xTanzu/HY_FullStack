const Filter = ({ searchTerm, handleChange }) => {
  return (
    <>
      <label htmlFor="nameFilter">filter:</label>
      <input id="nameFilter" value={searchTerm} onChange={handleChange}/>
    </>
  )
}

export default Filter
