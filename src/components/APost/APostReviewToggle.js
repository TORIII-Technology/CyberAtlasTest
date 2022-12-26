import { styled, Stack, Typography as Text, Box } from "@mui/material"

const APostReviewToggle = styled(Stack)((props) => ({
  height: "30px",
  margin: "5px 0px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}))

const Line = styled(Box)((props) => ({
  height: "1px",
  width: "100%",
  backgroundColor: "#74747480",
}))

const ToggleText = styled(Text)((props) => ({
  cursor: "pointer",
  position: "absolute",
  background: "black",
  padding: "0 24px",
  color: "#747474",
  fontSize: "10px",
}))

export default function ThemeUsage(props) {
  return (
    <>
      <APostReviewToggle>
        <Line />
        <ToggleText onClick={props.onToggle} bg="black">
          {props.isOpen ? "收合留言" : "顯示留言"}
        </ToggleText>
      </APostReviewToggle>
    </>
  )
}
