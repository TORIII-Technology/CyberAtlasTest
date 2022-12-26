import { useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"

const MainContainer = styled("div")(({ theme }) => ({
  flex: "1 1 0%",
  overflowY: "scroll",
  minHeight: 0,
  /* without min-height/height:0 flex:1 doesn't work */
  width: "100%",
  margin: "0 auto",
  position: "relative",
  color: theme.palette.primary.text,
  backgroundColor: theme.palette.primary.background,
  borderRadius: 0,
  "::-webkit-scrollbar": {
    display: "none",
  },
}))

export default function ThemeUsage(props) {
  const container = useRef()
  const location = useLocation()
  useEffect(() => {
    container.current.scrollTop = 0
  }, [location])

  return <MainContainer ref={container}>{props.children}</MainContainer>
}
