import { Link as RouterLink } from "react-router-dom"
import { Link, styled } from "@mui/material"

const MenuLink = styled(Link)((props) => ({
  fontFamily: 'QuinqueFive',
  color: "white",
  fontWeight: "500",
  // textUnderlineOffset: props.isExternal ? 0 : "2px",
  // textDecoration: props.isExternal ? "none" : "underline white 1px",
  textDecoration: "none",
  fontSize: "20px",
  "&:hover": {
    color: "#FFF315",
  },
}))

export default function ThemeUsage(props) {
  const { isExternal } = props
  return (
    <>
      {isExternal && (
        <MenuLink href={props.href} target="_blank">
          {props.children}
        </MenuLink>
      )}
      {!isExternal && (
        <MenuLink to={`/${props.to}`} component={RouterLink} {...props}>
          {props.children}
        </MenuLink>
      )}
    </>
  )
}
