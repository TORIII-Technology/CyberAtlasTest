import { styled } from "@mui/material/styles"
import { Button, Link } from "@mui/material"

const MainButton = styled(Button)({
  boxShadow: "none",
  fontSize: 16,
  padding: "6px 20px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "black",
  textDecoration: "none",
  textTransform: "uppercase",
  borderColor: "rgba(255, 255, 255, 0.8)",
  color: "white",
  "&:hover": {
    borderColor: "rgba(255, 255, 255,1)",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    borderColor: "rgba(255, 255, 255,1)",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
})

const ButtonLink = styled(Link)({
  textDecoration: "none",
})

export default function ThemeUsage(props) {
  // console.log(props.link)
  return (
    <>
      {!props.link && <MainButton {...props}>{props.children}</MainButton>}
      {props.link && (
        <ButtonLink href={props.link} target="_blank">
          <MainButton {...props}>{props.children}</MainButton>
        </ButtonLink>
      )}
    </>
  )
}
