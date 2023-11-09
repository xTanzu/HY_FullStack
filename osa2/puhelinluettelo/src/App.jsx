import { useState, useEffect } from "react"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

import PersonService from "./services/PersonService"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [wordFilter, setWordFilter] = useState("")

  useEffect(() => {
    PersonService.getAll()
      .then(persons => {
        console.log("Setting initial Persons")
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    // console.log(event.target.value)
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
    PersonService.create(newPerson)
      .then(createdPerson => {
        setNewName("")
        setNewNumber("")
        setPersons(persons.concat(createdPerson))
        // console.log("New Person added!")
      })
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
