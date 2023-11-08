import { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hella", number: "040-1231234" },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [wordFilter, setWordFilter] = useState("")

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setWordFilter(event.target.value)
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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(wordFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={wordFilter} handleChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm name={{value: newName, handler: handleNameChange}} number={{value: newNumber, handler: handleNumberChange}} submitHandler={addNewPerson}/>
      <Persons persons={personsToShow}/>
    </div>
  )

}

export default App
