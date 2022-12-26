import { useReducer, createContext, useMemo } from "react"
import { useUser } from "services/apis/user"
const initialState = { token: "" }

export const AuthContext = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const token = action.payload?.user?.token
      localStorage.setItem("token", token)
      return { token: token }
    case "LOGOUT":
      localStorage.clear()
      return { token: "" }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const storageToken = localStorage.getItem("token") || ""

  const [state, dispatch] = useReducer(reducer, initialState)
  const { data, isLoading } = useUser(state.token || storageToken)

  const value = useMemo(() => {
    let isAuth = false
    if (data) {
      const key = Object.keys(data)[0]
      if (key === "errors") {
        dispatch({ type: "LOGOUT" })
        isAuth = false
      }
      isAuth = true
    }
    return {
      state: { ...data, isAuth },
      isLoading,
      dispatch,
      token: state.token || storageToken,
    }

    // eslint-disable-next-line
  }, [state, data, dispatch])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
