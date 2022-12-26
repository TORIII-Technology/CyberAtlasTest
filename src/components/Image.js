import { styled } from "@mui/material/styles"

const Image = styled("img")((props) => ({
  objectFit: "cover",
  position: props.position || "relative",
  margin: props.margin || "unset",
  width: props.width || "100%",
  height: props.height || "unset",
  left: props.left || "unset",
  right: props.right || "unset",
}))

export default function ThemeUsage(props) {
  return <Image {...props} />
}
