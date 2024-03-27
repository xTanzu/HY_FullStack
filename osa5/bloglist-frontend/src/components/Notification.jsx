const ErrorMessage = ({ message }) => {
  const style = {
    background: "red"
  }

  return (
    <NotificationMessage message={message} style={style} />
  )
}

const SuccessMessage = ({ message }) => {
  const style = {
    background: "green"
  }

  return (
    <NotificationMessage message={message} style={style} />
  )
}

const NotificationMessage = ({ message, style }) => {
  const baseStyle = {
    display: message ? "block" : "none",
    padding: "10px",
    margin: "10px",
    borderWidth: "2px",
    borderColor: "black",
    borderRadius: "10px",
    fontFamily: "Helvetica",
    fontWeight: "bold",
    background: "grey",
    color: "white"
  }
  const compoundStyle = { ...baseStyle, ...style }

  return (
    <div style={compoundStyle}>
      { message }
    </div>
  )
}

export { ErrorMessage, SuccessMessage }

