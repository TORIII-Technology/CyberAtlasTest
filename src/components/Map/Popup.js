import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from 'components/Map/Popup.module.css'
import dayjs from 'dayjs'
import defaultAvatar from 'assets/images/cooker.png'

function isLatestPostIn24Hours(postCreatedTime) {
  const now = dayjs()
  const postDate = dayjs(postCreatedTime)
  const diff = now.diff(postDate, 'hour')
  return diff < 24
}

class Popup extends window.google.maps.OverlayView {
  position
  containerDiv
  onClick
  constructor(position, store, onClick) {
    const posts = store.posts

    super()
    this.position = position
    this.name = store.name
    this.rating = store.rating
    this.reviewCount = store.reviewCount
    // this.imgUrl =
    //   (posts &&
    //     isLatestPostIn24Hours(posts[0].createdAt) &&
    //     (posts[0].userImage ?? defaultAvatar)) ??
    //   store.image.url

    this.imgUrl = store.image?.url || defaultAvatar

    if (posts && isLatestPostIn24Hours(posts[0].createdAt)) {
      this.imgUrl = posts[0].userImage
    }

    this.onClick = onClick

    const container = document.createElement('div')
    container.classList.add(styles.marker__container)

    container.innerHTML = `
      <div class="${styles.marker__img__container}">
        <div class="${styles.marker__img__body}" style="background-image: url(${this.imgUrl})"></div>
      </div>
      <div class="${styles.marker__content} ${styles.top}">
        <div class="${styles.main__text}">${this.name}</div>
      </div>
      <div class="${styles.marker__content} ${styles.btm}">
        <div class="${styles.secondary__text} ${styles.rate__text}">${this.rating}</div>
        <i class="${styles.rate__icon}"></i>
        <div class="${styles.secondary__text} ${styles.reviews__text}">(${this.reviewCount}則評論)</div>
      </div>
    `
    this.containerDiv = container

    // Optionally stop clicks, etc., from bubbling up to the map.
    Popup.preventMapHitsAndGesturesFrom(this.containerDiv)
  }

  /** Called when the popup is added to the map. */
  onAdd() {
    this.containerDiv.addEventListener('click', this.onClick)
    this.getPanes().floatPane.appendChild(this.containerDiv)
  }
  /** Called when the popup is removed from the map. */
  onRemove() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.removeEventListener('click', this.onClick)
      this.containerDiv.parentElement.removeChild(this.containerDiv)
    }
  }
  /** Called each frame when the popup needs to draw itself. */
  draw() {
    const divPosition = this.getProjection().fromLatLngToDivPixel(this.position)
    // Hide the popup when it is far out of view.
    const display =
      Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
        ? 'block'
        : 'none'

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px'
      this.containerDiv.style.top = divPosition.y + 'px'
    }

    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display
    }
  }
}

function Pop({ map, store }) {
  const navigate = useNavigate()
  const [popup, setPopup] = useState(null)

  const lat = store.location?.lat
  const lng = store.location?.lng

  useEffect(() => {
    if (!store.location) {
      return null
    }
    if (map) {
      const popup = new Popup(
        new window.google.maps.LatLng(lat, lng),
        store,
        handleClick
      )
      setPopup(popup)
    }
    // eslint-disable-next-line
  }, [map])

  useEffect(() => {
    if (popup) {
      popup.setMap(map)
    }

    return () => {
      if (popup) {
        popup.setMap(null)
      }
    }

    // eslint-disable-next-line
  }, [popup])

  if (!store.location) {
    return null
  }

  const handleClick = () => {
    navigate(`/${store.id}`)
  }

  return null
}

export default Pop
