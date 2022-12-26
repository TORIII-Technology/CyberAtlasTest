import { styled } from "@mui/material/styles"

const Text = styled("p")((props) => ({
  margin: 0,
  color: "white",
}))

export default function ThemeUsage(props) {
  return <Text {...props}>{props.children}</Text>
}
