import { useState } from "react"

const NumberListing = ({ persons }) => {
  return (
    <>
      <h2>Numbers:</h2>
      <div className="persons">
        {persons.map(person => <Person key={person.name} person={person}/>)}
      </div>
    </>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ]) 
  const [newName, setNewName] = useState("")

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`'${newName}' already exists`)
      return
    }
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName("")
    console.log("New Person added!")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
    <NumberListing persons={persons}/>
    </div>
  )

}

export default App
