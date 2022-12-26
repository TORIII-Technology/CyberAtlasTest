import useSWR from "swr"
import fetcher from "services/apis/fetcher"
import URLs from "services/apis/url"

export const useUser = (token, swrOpts) => {
  const fetchArgus = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data, error, mutate } = useSWR(
    token ? [URLs.getUser, fetchArgus] : null,
    fetcher,
    { revalidateOnFocus: false, ...(swrOpts || {}) }
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  }
}

export const putUserImage = async (image_url, token) => {
  if (!token) {
    throw new Error("No token")
  }

  const res = await fetch(URLs.putUser, {
    method: "PUT",
    body: JSON.stringify({
      user: {
        image: image_url,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText)
  }

  const data = await res.json()
  return data
}
