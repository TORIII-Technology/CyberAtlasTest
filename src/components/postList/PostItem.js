import AspectRatio from "components/AspectRatio"

const PostItem = (props) => {
  return (
    <AspectRatio width="100%" ratio="100%">
      <img
        src={props.img}
        alt="postImage"
        loading="lazy"
        style={{ objectFit: "cover" }}
      />
    </AspectRatio>
  )
}
export default PostItem
