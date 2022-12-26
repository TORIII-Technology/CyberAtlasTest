import { useState, useContext } from "react"
import { AuthContext } from "components/context/AuthContext"
import { postImage } from "services/apis/file"

const LIMIT_FILE_SIZE = 20971520

export default function useImageUpload() {
  const { token } = useContext(AuthContext)

  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)

  const handlePreviewImage = (evt) => {
    const uploadFile = evt.target.files[0]

    if (uploadFile.size > LIMIT_FILE_SIZE) {
      alert("File Size Limit: 20MB")
      return
    }

    const src = URL.createObjectURL(uploadFile)
    setFile(uploadFile)
    setImage(src)
  }

  const handleUploadImage = async () => {
    try {
      const res = await postImage(file, token)
      const { public_url } = res
      return public_url
    } catch (err) {
      alert("Upload Failed")
      throw new Error("Upload Failed")
    }
  }

  const handleClearImage = () => {
    URL.revokeObjectURL(image)
    setFile(null)
    setImage(null)
  }

  return [
    image,
    {
      Preview: handlePreviewImage,
      Upload: handleUploadImage,
      Clear: handleClearImage,
    },
  ]
}
