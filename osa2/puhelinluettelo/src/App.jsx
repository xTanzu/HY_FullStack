import { useState, useEffect } from "react"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

import PersonService from "./services/PersonService"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [wordFilter, setWordFilter] = useState("")
  const [notification, setNotification] = useState("Random message")

  useEffect(() => {
    PersonService.getAll()
      .then(persons => {
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

  const addNewPerson = (event) => {

    const notValid = (newPerson) => {
      if (newPerson.name.length == 0 || newPerson.number.length == 0) {
        return true
      }
      const numbers = persons.map(person => person.number)
      if (numbers.includes(newPerson.number)) {
        setNotification(`number '${newPerson.number}' already has an owner`)
        return true
      }
      return false
    }

    const personExists = (newPerson) => {
      const names = persons.map(person => person.name)
      if (names.includes(newPerson.name)) {
        return true
      }
      return false
    }

    const updatePerson = (updatedPerson) => {
      const targetPerson = persons.find(person => person.name === updatedPerson.name)
      PersonService.update(targetPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        })
    }

    const createPerson = () => {
      PersonService.create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
        })
    }

    const emptyInputFields = () => {
      setNewName("")
      setNewNumber("")
    }

    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (notValid(newPerson)) {
      return
    }
    if (personExists(newPerson)) {
      if (window.confirm(`${newPerson.name} already exists, replace the old number with this new one?`)) {
        updatePerson(newPerson)
        setNotification(`${newPerson.name} updated`)
        emptyInputFields()
      }
    } else {
      createPerson(newPerson)
      setNotification(`${newPerson.name} created`)
      emptyInputFields()
    }
  }

  const deletePerson = (id) => {
    event.preventDefault()
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Are u sure u want to delete ${personToDelete.name}?`)) {
      PersonService.remove(id)
        .then(() => {
          setNotification(`${personToDelete.name} deleted`)
        })
        .catch(error => {
          console.log("Error removing the person")
        })
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const disableNotification = () => {
    console.log("disabled")
    setNotification(null)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(wordFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} disableMessage={disableNotification}/>
      <Filter searchTerm={wordFilter} handleChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm name={{value: newName, handler: handleNameChange}} number={{value: newNumber, handler: handleNumberChange}} submitHandler={addNewPerson}/>
      <Persons persons={personsToShow} handleDelete={deletePerson}/>
    </div>
  )

}

export default App
