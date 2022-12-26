//TODO: 為了測試下不帶storeID的

import { useContext } from "react"
import { AuthContext } from "components/context/AuthContext"

import useSWR from "swr"
import fetcher from "services/apis/fetcher"
import URLs from "services/apis/url"
import toQueryString from "libs/toQueryString"

export const usePostList = (queryOpts, swrOpts, fetchable = true) => {
  const queryString = toQueryString({ ...(queryOpts || {}) })
  const { data, error, mutate } = useSWR(
    fetchable ? `${URLs.getPosts}${queryString}` : null,
    fetcher,
    { ...(swrOpts || {}) }
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  }
}

export const useUserPostList = (queryOpts, swrOpts) => {
  const { token } = useContext(AuthContext)
  const fetchArgus = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data, error, mutate } = useSWR(
    token ? [`${URLs.getPosts}`, fetchArgus] : null,
    fetcher,
    { ...(swrOpts || {}) }
  )

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  }
}

export const postNewPost = async (
  { store_id, body, rating, image_url, status },
  token
) => {
  if (!token) {
    throw new Error("No token")
  }

  const res = await fetch(URLs.postPost, {
    method: "POST",
    body: JSON.stringify({
      post: {
        store_id,
        body,
        rating,
        image_url,
        status,
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

export const deletePost = async (postId, token) => {
  const res = await fetch(`${URLs.deletePost}/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}
