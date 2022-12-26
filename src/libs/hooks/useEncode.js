const useEncode = (address) => {
  if (!address) {
    return {
      encodeAddress: null,
      encodeAddressHead: null,
      encodeAddressBottom: null,
    }
  }

  const head = address.slice(0, 5)
  const bottom = address.slice(address.length - 5, address.length)
  const encodeAddress = head + "..." + bottom
  const encodeAddressHead = head + "..."
  const encodeAddressBottom = "..." + bottom

  return {
    encodeAddress,
    encodeAddressHead,
    encodeAddressBottom,
  }
}

export default useEncode
