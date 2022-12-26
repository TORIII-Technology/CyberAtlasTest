import { useRef, useContext } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "components/context/AuthContext"
import { postComment } from "services/apis/comment"
import { Box, Stack, styled, Button } from "@mui/material"
import Statusbar from "components/Statusbar"
import CommentField from "components/Comment/CommentField"
import Container from "components/containers/Container"

const CommentContent = styled(Box)((props) => ({
  width: "100%",
  padding: "20px 20px",
  display: "flex",
  flexDirection: "column",
}))

const ActionButton = styled(Button)(({ variant }) => ({
  width: "130px",
  height: "34px",
  fontSize: "15px",
  borderRadius: 7,
  color: variant === "contained" ? "black" : "white",
  borderColor: "white",
  background: variant === "contained" ? "white" : "transparent",
}))

const AddCommentPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state, token } = useContext(AuthContext)
  const textInput = useRef(null)
  const { storeId, postId } = useParams()

  const from = location.state?.from?.pathname || `/${storeId}/posts#${postId}`

  const handleSubmit = async () => {
    if (textInput.current.value.length === 0) {
      return
    }

    try {
      await postComment(
        { post_id: postId, body: textInput.current.value },
        token
      )
      setTimeout(() => navigate(from, { replace: true }), 500)
    } catch (error) {
      alert("新增失敗")
    }
  }

  return (
    <Container>
      <CommentContent>
        <Stack w="100%" spacing={2}>
          <Statusbar address={state?.user?.walletAddress} />
          <CommentField ref={textInput} />
          <Stack direction="row" justifyContent="center" spacing={3}>
            <ActionButton variant="outlined" onClick={() => navigate(-1)}>
              取消
            </ActionButton>
            <ActionButton
              variant="contained"
              disableElevation
              onClick={handleSubmit}
            >
              留言
            </ActionButton>
          </Stack>
        </Stack>
      </CommentContent>
    </Container>
  )
}

export default AddCommentPage
