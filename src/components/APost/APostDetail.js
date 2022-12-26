import { Link } from "react-router-dom"
import { useStoreById } from "services/apis/store"
import { Box, Skeleton, Stack, Typography as Text, styled } from "@mui/material"
import AspectRatio from "components/AspectRatio"
import { RamenIcon } from "components/icons"

const APostDetailBar = styled(Box)((props) => ({
  height: "36px",
  backgroundColor: "#747474",
  color: "#fff",
  display: "flex",
  padding: "0 16px",
  alignItems: "center",
  justifyContent: "space-between",
}))

const APostDetail = ({ post }) => {
  const { imageUrl, storeId } = post
  const { data: storeData } = useStoreById(storeId)

  return (
    <>
      <span id={post.id} />

      <AspectRatio width="100%" ratio="100%">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="imagePost"
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        )}
        {!imageUrl && <Skeleton variant="rectangular" width="100%" />}
      </AspectRatio>
      <APostDetailBar>
        <Stack direction="row" spacing="5px" alignItems="center">
          <RamenIcon sx={{ fontSize: "15px" }} />
          <Text>{storeData?.store.name}</Text>
        </Stack>
        <Link to={`/${storeId}`} style={{ textDecoration: "none" }}>
          <Text variant="link16medium">查看店家</Text>
        </Link>
      </APostDetailBar>
    </>
  )
}

export default APostDetail
