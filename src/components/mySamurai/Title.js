import { styled, Typography, Stack } from "@mui/material"

const TitleGroup = styled("div")((props) => ({
  padding: "12px 24px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  direction: "row",
}))

const Title = styled(Stack)((props) => ({
  alignItems: "center",
}))

export default function ThemeUsage(props) {
  return (
    <TitleGroup>
      <Title spacing="12px" direction="row">
        {props.icon}
        <Typography component="h3" variant="body16mediumPixel">
          {props.children}
        </Typography>
      </Title>
      {props.button}
    </TitleGroup>
  )
}
