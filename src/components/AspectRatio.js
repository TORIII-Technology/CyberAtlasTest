import { Box, styled } from "@mui/material"

const AspectRatio = styled(Box)((props) => ({
  position: "relative",
  // "&:hover": {
  //   color: "#9E804D",
  // },
  "&:before": {
    height: "0",
    content: `""`,
    display: "block",
    paddingBottom: props.ratio ? "100%" : `${props.ratio}%`,
  },
  "& > *:not(style)": {
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > img, & > video": {
      objectFit: "cover",
    },
  },
}))

export default function ThemeUsage(props) {
  return <AspectRatio {...props}>{props.children}</AspectRatio>
}
