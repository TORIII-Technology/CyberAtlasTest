import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100%",
  backgroundColor: theme.palette.main.background,
  // backgroundColor: "transparent",
}))

export default function ThemeUsage(props) {
  return <Container {...props}>{props.children}</Container>
}
