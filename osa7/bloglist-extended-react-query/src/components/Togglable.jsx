/** @format */

import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  // const hideWhenVisibleStyle = {
  //   display: visible ? "none" : ""
  // }
  const showWhenVisibleStyle = {
    display: visible ? '' : 'none',
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  return (
    <div className='toggleWrapper'>
      <div style={showWhenVisibleStyle}>{children}</div>
      <button onClick={toggleVisible}>{visible ? 'cancel' : buttonLabel}</button>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
