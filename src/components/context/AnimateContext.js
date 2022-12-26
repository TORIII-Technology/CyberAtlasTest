import { createContext, useContext, useState, useEffect } from "react"
import { animated, useSpring } from "react-spring"
import { useLocation, useNavigate } from "react-router-dom"

export const AnimateContext = createContext()

let timeout

export const AnimateProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  //以state當作toggle animation
  const [state, setState] = useState(false)
  const springStyles = useSpring({ opacity: state ? 1 : 0 })

  useEffect(() => {
    setState(true)
  }, [location.pathname])

  //使用這個handler來navigate
  const handleRouting = (url) => {
    if (location.pathname === url) {
      const top = document.getElementById("toppest")
      if (top) {
        top.scrollIntoView({ behavior: "smooth" })
      }
      return
    }

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      setState(false)
      setTimeout(() => navigate(url), 500)
    }, 250)
  }

  return (
    <AnimateContext.Provider value={{ springStyles, handleRouting }}>
      {children}
    </AnimateContext.Provider>
  )
}

const AnimatedDiv = animated("div")

export const AnimatedContainer = ({ children }) => {
  const { springStyles } = useContext(AnimateContext)

  return (
    <AnimatedDiv style={{ height: "100%", overflow: "auto", ...springStyles }}>
      {children}
    </AnimatedDiv>
  )
}
