import { useContext } from "react"
import { AuthContext } from "components/context/AuthContext"
import useSWR from "swr"
import fetcher from "services/apis/fetcher"
import URLs from "services/apis/url"

export const useOwnedNFTs = (swrOpts) => {
  const { token } = useContext(AuthContext)
  const fetchArgus = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data, error, mutate } = useSWR(
    token ? [`${URLs.getNfts}`, fetchArgus] : null,
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
