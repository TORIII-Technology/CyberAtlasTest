import { useState, forwardRef } from "react"
import { styled } from "@mui/system"
import { Box, Typography as Text } from "@mui/material"

const CHARACTER_LIMIT = 500

const FormControl = styled(Box)((props) => ({
  // border: "1px solid red",
  width: "100%",
  position: "relative",
  marginBottom: "30px",
}))

const TextArea = styled("textarea")((props) => ({
  border: "1px solid white",
  //ToFix: element style
  width: "100%",
  height: "200px !important",
  background: "transparent",
  resize: "none",
  display: "black",
  padding: "10px",
  borderRadius: "16px",
  color: "white",
  fontSize: "16px",
  fontFamily: "Noto Sans TC",
}))

const HelperTextLimit = styled(Text)((props) => ({
  position: "absolute",
  fontSize: "12px",
  opacity: "0.5",
  transform: "scale(.85)",
  bottom: "14px",
  right: "14px",
}))

const CommentField = (props, ref) => {
  const [text, setText] = useState("")

  const handleChange = (evt) => {
    if (evt.target.value.length > CHARACTER_LIMIT) {
      return
    }
    setText(evt.target.value)
  }

  return (
    <>
      <FormControl>
        <TextArea
          ref={ref}
          placeholder="留言..."
          value={text}
          onChange={handleChange}
        />
        <HelperTextLimit>{text.length} /500</HelperTextLimit>
      </FormControl>
    </>
  )
}

export default forwardRef(CommentField)
