import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { actionSetNotification, actionClearNotification } from "../reducers/notificationReducer.js"

const Notification = () => {

  const dispatch = useDispatch()
  const timeoutRef = useRef()
  const notification = useSelector(({ notification }) => notification)

  // Tämä hoitaa homman, mutta koska efekti ei tiedä mitään actionien dispatchaamisesta,
  // jos esim tykkää samasta monta kertaa, ei laskuri nollaannu, ja sama viesti ei saa lisäaikaa.
  // Tämä johtuu siitä, että notifikaatioviesti ei muutu actionien triggeröintien välissä
  // ja kun efekti katsoo vain ekaa rendaamista ja sitä kun viestin arvo muuttuu
  // Tämä pitäisi hoitaa storen päässä tyyliin middlewareilla, mutta en tunne niitä reduxissa vielä
  useEffect(() => {
    if (notification === "") {
      return
    }
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      dispatch(actionClearNotification())
    }, 5000)
    return () => clearTimeout(timeoutRef.current) 
  }, [notification])

  const style = {
    visibility: notification === "" ? "hidden" : "",
    border: 'solid 2px green',
    borderRadius: 10,
    padding: 10,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    backgroundColor: "LightGreen",
    color: "green",
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
