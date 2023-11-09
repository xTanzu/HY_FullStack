const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      <h2>Numbers:</h2>
      <div className="persons">
        {persons.map(person => <Person key={person.name} person={person} handleDelete={handleDelete}/>)}
      </div>
    </>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number} &nbsp; 
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  )
}

export default Persons
