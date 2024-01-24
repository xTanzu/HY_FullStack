import { useState } from "react"

import LoginForm from "./components/LoginForm"
import BlogListing from "./components/BlogListing"

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)

  return (
    <div>
      { !loggedInUser && <LoginForm setLoggedInUser={setLoggedInUser} /> } 
      { loggedInUser && <BlogListing loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> }
    </div>
  )
}

export default App
