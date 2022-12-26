import { useContext, useState } from "react"
import { deleteComment } from "services/apis/comment"
import { AuthContext } from "components/context/AuthContext"
import {
  styled,
  Stack,
  Button,
  Typography as Text,
  ClickAwayListener,
} from "@mui/material"
import Statusbar from "components/Statusbar"

const Comment = styled(Stack)((props) => ({
  padding: "0 16px",
  display: "flex",
  // alignItems: "center",
  justifyContent: "center",
  position: "relative",
  margin: "12px 16px",
  color: "#747474",
}))

const StyledDeleteBtn = styled(Button)(({ theme, isDelete }) => ({
  alignSelf: "flex-start",
  marginTop: 24,
  height: 30,
  padding: "5px 25px 7px",
  borderRadius: 6,
  borderColor: isDelete ? theme.palette.error.main : "white",
  color: isDelete ? theme.palette.error.main : "white",
  "&:hover": {
    color: theme.palette.error.main,
  },
}))

const DeleteButton = ({ commentId, token, mutate }) => {
  const [isDelete, setIsDelete] = useState(false)

  const handleToDelete = () => {
    setIsDelete(true)
  }

  const handleCancelDelete = () => {
    setIsDelete(false)
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteComment(commentId, token)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ClickAwayListener onClickAway={handleCancelDelete}>
      <StyledDeleteBtn
        variant="outlined"
        // color="error"
        onClick={isDelete ? handleConfirmDelete : handleToDelete}
      >
        {isDelete ? "確認刪除" : "刪除回覆"}
      </StyledDeleteBtn>
    </ClickAwayListener>
  )
}

export default function CommentThemeUsage({
  isPostContent,
  comment,
  hideDelete,
  mutate,
  ...props
}) {
  const { state, token } = useContext(AuthContext)

  return (
    <>
      <Comment {...props} direction="column">
        <Statusbar
          userImage={comment.userImage}
          address={comment.userWalletAddress}
          time={comment.createdAt}
        />
        <Text variant="content" sx={{ whiteSpace: "pre-wrap" }}>
          {comment.body}
        </Text>
        {!hideDelete && comment.userId === state?.user?.id && (
          <DeleteButton commentId={comment.id} token={token} mutate={mutate} />
        )}
      </Comment>
    </>
  )
}
