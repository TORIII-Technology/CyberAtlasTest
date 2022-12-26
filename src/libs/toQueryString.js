export default function toQueryString(queryObj) {
  let queryString = "?"
  for (let [key, value] of Object.entries({ ...queryObj })) {
    if (!value) continue
    queryString += `${key}=${encodeURIComponent(value)}&`
  }

  return queryString
}
