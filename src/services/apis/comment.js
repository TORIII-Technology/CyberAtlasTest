import URLs from "services/apis/url"

export const postComment = async ({ post_id, body }, token) => {
  const res = await fetch(URLs.postComment, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      comment: {
        post_id,
        body,
        status: 1,
      },
    }),
  })

  if (!res.ok || res.status !== 200) {
    throw new Error(res.statusText)
  }

  return await res.json()
}

export const deleteComment = async (comment_id, token) => {
  const res = await fetch(`${URLs.deleteComment}/${comment_id}`, {
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
