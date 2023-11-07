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
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1231234" }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const notValid = (newPerson) => {
    if (newPerson.name.length == 0 || newPerson.number.length == 0) {
      return true
    }
    const names = persons.map(person => person.name)
    if (names.includes(newPerson.name)) {
      alert(`'${newPerson.name}' already exists`)
      return true
    }
    const numbers = persons.map(person => person.number)
    if (numbers.includes(newPerson.number)) {
      alert(`number '${newPerson.number}' already has an owner`)
      return true
    }
    return false
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (notValid(newPerson)) {
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
    console.log("New Person added!")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/><br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
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
