// This module is not in use, but it was what was asked in the exercise, so I will include it
// I made a better and easier to use dropdown menu unstead

import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BornForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ setBornTo ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const message = error.graphQLErrors.map(e => e.message).join("\n")
      console.log(message)
    }
  })

  const submitBorn = async (event) => {
    event.preventDefault()
    const response = await setBornTo({ variables: { name, born: Number(born) } })
    if (response.data.editAuthor === null) {
      console.log("author not found")
      return
    }
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submitBorn}>
      <div>
        <label htmlFor="name">name</label>
        <br />
        <input 
          type="text"
          id="name"
          value={name} 
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        <label htmlFor="born">born</label>
        <br />
        <input
          type="number"
          id="born"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button type="submit">set born</button>
      </form>      
    </div>
  )
}

export default BornForm
