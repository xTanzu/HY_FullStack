import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

import { setErrorMsg, setSuccessMsg, useNotificationDispatch } from '../context/NotificationContext'

const BornSelect = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const notificationDispatch = useNotificationDispatch()

  const [ setBornTo ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const message = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(message)
      notificationDispatch(setErrorMsg(message))
    },
    onCompleted: () => {
      notificationDispatch(setSuccessMsg('Birth year set succesfully'))
    }
  })

  const submitBorn = async (event) => {
    event.preventDefault()
    console.log(`name: ${name}, born: ${born}`)
    const response = await setBornTo({ variables: { name, born: Number(born) } })
    if (response.data.editAuthor === null) {
      console.log("author not found")
      return
    }
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      
      <select onChange={({ target }) => setName(target.value)}>
        {authors.map((author) => (
          <option key={author.id} value={author.name}>{author.name}</option>
        ))}
      </select>
      <form onSubmit={submitBorn}>
        <input
          type="number"
          id="born"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type="submit">set born</button>
      </form>

    </div>
  )
}

export default BornSelect
