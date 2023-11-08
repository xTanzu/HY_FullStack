const PersonForm = ({ name, number, submitHandler }) => {
  return (
    <form>
      <div>
        <label htmlFor="name_field">name: </label>
        <input id="name_field" value={name.value} onChange={name.handler}/><br/>
        <label htmlFor="number_field">number: </label>
        <input id="number_field" value={number.value} onChange={number.handler}/>
      </div>
      <div>
        <button type="submit" onClick={submitHandler}>add</button>
      </div>
    </form>
  )
}

export default PersonForm
