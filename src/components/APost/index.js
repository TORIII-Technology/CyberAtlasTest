import { Stack, styled, Button } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import useDisclosure from "libs/hooks/useDisclosure"
import APostDetail from "./APostDetail"
import APostReviewToggle from "./APostReviewToggle"
import Comment from "components/Comment"
import dayjs from "dayjs"

const APost = styled(Stack)((props) => ({
  width: "100%",
  backgroundColor: "#000",
  paddingBottom: "54px",
}))

const CommentButton = styled(Button)((props) => ({
  margin: "10px 30px 0 30px",
  textAlign: "left",
  border: "1px solid #747474",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "flex-start",
  padding: "0 20px",
  color: "#747474",
  height: "36px",
}))

const PostCommentList = ({ comments, mutate, isOpen }) => {
  const sortedComment = comments.sort(
    (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix()
  )

  if (!isOpen) {
    return null
  }

  return (
    <>
      {sortedComment.map((comment) => (
        <Comment comment={comment} key={comment.id} mutate={mutate} />
      ))}
    </>
  )
}

export default function ThemeUsage({ post, mutate, mePage, ...props }) {
  const location = useLocation()
  const { isOpen, onToggle } = useDisclosure(false)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/${post.storeId}/${post.id}/addComment`, { state: location })
  }

  const authorComment = {
    body: post.body,
    userId: post.userId,
    userWalletAddress: post.userWalletAddress,
    createdAt: post.createdAt,
    userImage: post.userImage,
  }

  return (
    <APost {...props}>
      <APostDetail post={post} />
      <Comment comment={authorComment} hideDelete={true} />
      {!mePage && post.comments.length > 0 && (
        <>
          <APostReviewToggle isOpen={isOpen} onToggle={onToggle} />
          <PostCommentList
            comments={post.comments}
            mutate={mutate}
            isOpen={isOpen}
          />
        </>
      )}
      {!mePage && <CommentButton onClick={handleClick}>留言...</CommentButton>}
    </APost>
  )
}
