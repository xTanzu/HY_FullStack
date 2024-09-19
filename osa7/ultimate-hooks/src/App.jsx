import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onClear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onClear
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get(baseUrl)
      setResources(resp.data)
    }
    getData()
  }, [])

  const create = (resource) => {
    //  Tämä oli tyhmää, mutta tänne muistiin miten Promiseja hylätään manuaalisesti
    // if (resource.content.trim().length === 0) {
    //   return Promise.reject(new Error("input is empty..."))
    // }
    return axios.post(baseUrl, resource)
      .then((resp) => {
        setResources(resources.concat(resp.data))
        return true
      })
      .catch(() => {
        return false
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const { onClear: clearContent, ...content } = useField('text')
  const { onClear: clearName, ...name } = useField('text')
  const { onClear: clearNumber, ...number } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
      .then((success) => {
        if (success) {
          clearContent()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
      .then((success) => {
        if (success) {
          clearName()
          clearNumber()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App
