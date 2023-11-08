const Persons = ({ persons }) => {
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

export default Persons
