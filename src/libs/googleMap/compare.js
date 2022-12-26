import { useEffect, useRef } from "react"
import { createCustomEqual } from "fast-equals"

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    a instanceof window.google.maps.LatLng ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.google.maps.LatLng(a).equals(
      new window.google.maps.LatLng(b)
    )
  }

  // TODO extend to other types

  // use fast-equals for other objects
  return deepEqual(a, b)
})

const useDeepCompareMemoize = (value) => {
  const ref = useRef()

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

const useDeepCompareEffectForMaps = (callback, dependencies) => {
  // eslint-disable-next-line
  useEffect(callback, dependencies.map(useDeepCompareMemoize))
}

export default useDeepCompareEffectForMaps
