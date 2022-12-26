import URLs from "services/apis/url"

export const getNonce = async () => {
  try {
    const response = await fetch(URLs.getNonce)

    if (!response.ok || response.status !== 200) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const postLogin = async (loginInfo) => {
  try {
    const response = await fetch(URLs.postLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginInfo,
    })

    if (!response.ok || response.status !== 200) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
