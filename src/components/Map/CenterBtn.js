import { useEffect } from "react"
import styles from "components/Map/CenterBtn.module.css"
import gpsFixed from "assets/images/gps_fixed.png"

const gpsFixedSvg = `<image src="${gpsFixed}" width="24" height="24" />`

function CenterBtn({ map, center }) {
  useEffect(() => {
    if (map) {
      if (map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM]) {
        map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].pop()
      }

      const centerControlDiv = document.createElement("div")
      centerControlDiv.className = styles.center__button
      centerControlDiv.innerHTML = `<button>${gpsFixedSvg}</button>`
      centerControlDiv.index = 1
      centerControlDiv.style.paddingTop = "10px"
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
        centerControlDiv
      )

      centerControlDiv.addEventListener("click", () => {
        const userCenter = new window.google.maps.LatLng(center)
        map.setCenter(userCenter)
      })
    }
  })

  return null
}

export default CenterBtn
