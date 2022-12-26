export const encodeTokenHead = (token) => {
  return token.slice(0, 5) + "..."
}

export const encodeTokenBottom = (token) => {
  return "..." + token.slice(token.length - 5, token.length)
}

export const encodeToken = (token) => {
  if (!token) return ["", ""]

  const head = token.slice(0, 5) + "..."
  const btm = "..." + token.slice(token.length - 5, token.length)

  return [head, btm]
}
