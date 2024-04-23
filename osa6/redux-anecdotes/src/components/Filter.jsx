import { useDispatch } from "react-redux"
import { actionSetFilter } from "../reducers/filterReducer.js"

const Filter = () => {

  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    const filter = event.target.value
    dispatch(actionSetFilter(filter))
  }

  const filterStyle = {
    marginBottom: 10
  }

  return (
    <div style={filterStyle}>
      filter <input onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter
