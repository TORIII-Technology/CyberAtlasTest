import { Link, useResolvedPath, useMatch } from "react-router-dom"
import { useContext } from "react"
import { AnimateContext } from "components/context/AnimateContext"
import { styled } from "@mui/material/styles"

const Tab = styled("div")((props) => ({
  height: "60px",
  color: props.match
    ? props.theme.palette.interact.active
    : props.theme.palette.interact.unActive,
  width: "100%",
  zIndex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}))

export default function ThemeUsage(props) {
  const { handleRouting } = useContext(AnimateContext)
  let resolved = useResolvedPath(props.to)
  let match = useMatch({ path: resolved.pathname, end: true })
  // const color = match
  //   ? props.theme.palette.primary.main
  //   : props.theme.palette.primary.main
  return (
    // <Link to={`/${props.to}`}>
    <Tab match={match} onClick={handleRouting.bind(this, `/${props.to}`)}>
      {props.icon}
    </Tab>
    // </Link>
  )
}
