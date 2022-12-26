import { useContext } from "react"
import { AuthContext } from "components/context/AuthContext"
import useSWR from "swr"
import fetcher from "services/apis/fetcher"
import URLs from "services/apis/url"
import toQueryString from "libs/toQueryString"

const fetchArgus = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const useStoreList = (queryOpts, swrOpts, fetchable = true) => {
  const { token } = useContext(AuthContext)

  const queryString = toQueryString({ ...(queryOpts || {}) })
  const { data, error, mutate } = useSWR(
    fetchable ? [`${URLs.getStores}${queryString}`, fetchArgus(token)] : null,
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

export const useStoreById = (storeId, swrOpts) => {
  const { token } = useContext(AuthContext)

  const { data, error, mutate } = useSWR(
    storeId ? [`${URLs.getStore}/${storeId}`, fetchArgus(token)] : null,
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
