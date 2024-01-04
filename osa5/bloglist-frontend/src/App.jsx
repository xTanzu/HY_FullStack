import { useState } from "react"

import LoginForm from "./components/LoginForm"
import BlogListing from "./components/BlogListing"

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)

  return (
    <div>
      { !loggedUser && <LoginForm setLoggedUser={setLoggedUser} /> } 
      { loggedUser && <BlogListing loggedUser={loggedUser} /> }
    </div>
  )
}

export default App
