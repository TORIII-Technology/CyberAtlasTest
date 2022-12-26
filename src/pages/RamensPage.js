import Container from "components/containers/Container"
import { usePostList } from "services/apis/post"
import APost from "components/APost"

const RamensPage = () => {
  const { data: postData, mutate } = usePostList({ is_public: true })

  return (
    <Container>
      {postData &&
        postData.posts.map((post) =>
          post.status !== 2 ? (
            <APost
              key={`${post.id} + ${post.createdAt}`}
              post={post}
              mutate={mutate}
            />
          ) : null
        )}
    </Container>
  )
}

export default RamensPage
