import { Link } from "react-router-dom"
import { ImageList, ImageListItem } from "@mui/material"
import PostItem from "components/postList/PostItem"

const PostList = ({ posts }) => {
  return (
    <ImageList sx={{ width: "100%" }} cols={3}>
      {posts.map((post) => (
        <Link key={post.id} to={`../posts#${post.id}`}>
          <ImageListItem>
            <PostItem img={post.imageUrl} />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  )
}
export default PostList
