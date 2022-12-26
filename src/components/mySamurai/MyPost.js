import { useNavigate } from "react-router-dom"
import { Stack, styled, Typography } from "@mui/material"

import Title from "components/mySamurai/Title"
import PostList from "components/postList/PostList"
import MainButton from "components/buttons/MainButton"
import RamenIcon from "components/icons/RamenIcon"

const MyPost = styled(Stack)((props) => ({
  alignItems: "center",
  width: "100%",
  padding: "12px 0",
  paddingBottom: "48px",
  borderBottom: `1px solid ${props.theme.palette.main.divider}`,
}))

export default function MyPostThemeUsage(props) {
  const { posts } = props
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }

  return (
    <MyPost>
      <Title icon={<RamenIcon fontSize="large" />}>my posts</Title>
      {posts.total ? (
        <PostList posts={posts.posts} path="me" />
      ) : (
        <>
          <Typography
            padding="30px 0"
            component="p"
            variant="body12"
            width="240px"
            textAlign="center"
          >
            You didn't have any post, let's post your first comment now!
          </Typography>
          <MainButton onClick={handleClick}>share now</MainButton>
        </>
      )}
    </MyPost>
  )
}
