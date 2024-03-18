import { useState } from 'react'


const Togglable = ({ buttonLabel, children }) => {

  const [visible, setVisible] = useState(false)

  // const hideWhenVisibleStyle = {
  //   display: visible ? "none" : ""
  // }
  const showWhenVisibleStyle = {
    display: visible ? "" : "none"
  }
  
  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div className="toggleWrapper">
      <div style={showWhenVisibleStyle}>
        {children}
      </div>
      <button onClick={toggleVisible} >{ visible ? "cancel" : buttonLabel }</button>
    </div>
  )
}

export default Togglable
