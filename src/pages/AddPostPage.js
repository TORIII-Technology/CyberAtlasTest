import { useRef, useContext, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "components/context/AuthContext"
import useImageUpload from "libs/hooks/useImageUpload"
import { useStoreById } from "services/apis/store"
import { postNewPost } from "services/apis/post"

import { Box, Stack, Typography as Text, styled, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab"

import Container from "components/containers/Container"
import AspectRatio from "components/AspectRatio"
import Statusbar from "components/Statusbar"
import CommentField from "components/Comment/CommentField"
import { CameraIcon, UploadIcon, RamenIcon } from "components/icons"
import CloseIcon from "components/icons/CloseIcon"

const PhotoUpload = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  direction: "row",
}))

const PhotoUploadTab = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  direction: "row",
  "& input": { display: "none" },
}))

const Divider = styled(Box)(({ theme }) => ({
  height: "100px",
  width: "1px",
  background: "#747474",
}))

const StoreDetailBar = styled(Box)((props) => ({
  height: "36px",
  backgroundColor: "#747474",
  color: "#fff",
  display: "flex",
  padding: "0 16px",
  alignItems: "center",
  justifyContent: "space-between",
}))

const PostContent = styled(Box)((props) => ({
  width: "100%",
  padding: "20px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

const SubmitButton = styled(LoadingButton)((props) => ({
  margin: "0px 30px",
  width: "200px",
  fontSize: "16px",
  textAlign: "center",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  padding: "0 20px",
  height: "36px",
}))

const Image = styled("img")({
  objectFit: "cover",
})

const CloseButton = styled(CloseIcon)({
  position: "absolute",
  zIndex: 99,
  top: "20px!important",
  left: "20px!important",
  width: "34px!important",
  height: "34px!important",
  background: "#000000AA",
  borderRadius: "50%",
  padding: 7,
  cursor: "pointer",
})

const AddPostPage = () => {
  const navigate = useNavigate()
  const { storeId } = useParams()
  const { state, token } = useContext(AuthContext)
  const { data: storeData } = useStoreById(storeId)

  const [image, imageHandler] = useImageUpload()
  const [isLoading, setIsLoading] = useState(false)
  const textInput = useRef(null)

  const handlePost = async () => {
    setIsLoading(true)
    if (!image || !textInput.current.value) {
      alert("請輸入內容與上傳圖片")
      setIsLoading(false)
      return
    }

    try {
      const url = await imageHandler.Upload()
      console.log(url)
      const newPost = {
        store_id: storeId,
        body: textInput.current.value,
        rating: 0,
        image_url: url,
        status: 1,
      }
      await postNewPost(newPost, token)

      //貼文成功後應該是來這裡?
      navigate(`/${storeId}/posts`, { replace: true })
    } catch (err) {
      alert("Post failed")
    }
  }

  return (
    <Container>
      <AspectRatio width="100%" ratio="100%">
        {!image && (
          <PhotoUpload direction="row" spacing="20px">
            <PhotoUploadTab>
              <Box as="label" flex="1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={imageHandler.Preview}
                />
                <Stack alignItems="center" fontSize="60px" spacing="5px">
                  <UploadIcon fontSize="60px" />
                  <Text>上傳照片</Text>
                </Stack>
              </Box>
              <Divider />
              <Box as="label" flex="1">
                <input
                  type="file"
                  accept="image/*"
                  capture="camera"
                  onChange={imageHandler.Preview}
                />
                <Stack alignItems="center" fontSize="60px" spacing="5px">
                  <CameraIcon fontSize="60px" />
                  <Text>拍照</Text>
                </Stack>
              </Box>
            </PhotoUploadTab>
          </PhotoUpload>
        )}
        {image && (
          <>
            <CloseButton onClick={imageHandler.Clear} />
            <Image src={image} alt="previewImage" />
          </>
        )}
      </AspectRatio>
      <StoreDetailBar>
        <Stack direction="row" spacing="5px" alignItems="center">
          <RamenIcon sx={{ fontSize: "15px" }} />
          <Text>{storeData.store.name}</Text>
        </Stack>
      </StoreDetailBar>
      <PostContent>
        <Statusbar address={state.user.walletAddress} />
        <CommentField ref={textInput} />
        <SubmitButton
          variant="outlined"
          onClick={handlePost}
          disabled={!image}
          loading={isLoading}
        >
          發布貼文
        </SubmitButton>
      </PostContent>
    </Container>
  )
}
export default AddPostPage
