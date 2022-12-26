import URLs from "services/apis/url"

export const postImage = async (image, token) => {
  const formData = new FormData()
  formData.append("file", image)

  const res = await fetch(URLs.postFile, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText)
  }

  const data = await res.json()
  return data
}
