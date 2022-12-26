import { useParams, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { usePostList } from "services/apis/post"
import APost from "components/APost"
import Container from "components/containers/Container"

const StorePostsPage = () => {
  const location = useLocation()
  const { storeId } = useParams()
  const { data: postData, mutate } = usePostList({ store_id: storeId })

  useEffect(() => {
    if (postData && location.hash) {
      document.getElementById(location.hash.slice(1)).scrollIntoView()
    }

    // eslint-disable-next-line
  }, [postData])

  return (
    <Container>
      {postData &&
        postData.posts.map((post) => (
          <APost
            key={`${post.id} + ${post.createdAt}`}
            post={post}
            mutate={mutate}
          />
        ))}
    </Container>
  )
}

export default StorePostsPage
