import mapStyle from "config/mapStyle.json"
import { Wrapper } from "@googlemaps/react-wrapper"
import useDeepCompareEffectForMaps from "libs/googleMap/compare"
import { useRef, useState, useEffect, lazy, Suspense } from "react"
import { useStoreList } from "services/apis/store"
import mapOptions from "config/mapOptions.json"

const lastLocation = { lat: null, lng: null }

const Pop = lazy(() => import("components/Map/Popup"))
const CenterBtn = lazy(() => import("components/Map/CenterBtn"))

const [defaultLat, defaultLng] =
  process.env.REACT_APP_DEFAULT_LOCATION.split(",")
const [northBound, southBound, westBound, eastBound] =
  process.env.REACT_APP_MAP_BOUND.split(",")

const Map = () => {
  const ref = useRef(null)
  const [userLocation, setUserLocation] = useState({
    lat: +defaultLat,
    lng: +defaultLng,
  })
  const [map, setMap] = useState(null)
  const { data } = useStoreList({ with_posts: 1 })

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  useDeepCompareEffectForMaps(() => {
    const mapSetup = (lat = +defaultLat, lng = +defaultLng) => {
      map.setOptions({
        zoom: 14,
        //先預設在北車
        center: { lat, lng },
        //地圖的樣式，顯示道路或是地標 @ config/mapStyle
        styles: mapStyle,
        //地圖的邊界，於環境變數控制
        restriction: {
          latLngBounds: {
            north: +northBound,
            south: +southBound,
            west: +westBound,
            east: +eastBound,
          },
          strictBounds: false,
        },
        //地圖的互動以及設定 @ config/mapOptions
        //請注意mapOptions若設定了以上的key則會覆蓋，可以把上述內容當作預設值
        ...mapOptions,
      })

      map.addListener("center_changed", () => {
        const center = map.getCenter()
        lastLocation.lat = center.lat()
        lastLocation.lng = center.lng()
      })
    }

    if (map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const lat = +(lastLocation.lat ?? latitude)
          const lng = +(lastLocation.lng ?? longitude)
          setUserLocation({ lat: latitude, lng: longitude })
          return mapSetup(lat, lng)
        },
        () => {
          mapSetup()
          // 定位功能must served in HTTPS
          // 如果使用者本身的裝置設定拒絕定位，儘管瀏覽器同意也無法使用定位功能
          // 由於裝置間無法預測行為，這個alert暫時無法使用QQ
          // alert("無法取得您的位置，可能是裝置設定不同，請檢查")
        }
      )
    }
  }, [map])

  return (
    <>
      <div ref={ref} style={{ height: "100%" }} />
      <CenterBtn map={map} center={userLocation} />
      {map &&
        data &&
        data.stores.map((store) => (
          <Pop map={map} store={store} key={store.id} />
        ))}
    </>
  )
}

const MapPage = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Wrapper
        apiKey={process.env.REACT_APP_G_MAP_API_KEY}
        render={(stat) => <h1>{stat}</h1>}
      >
        <Map />
      </Wrapper>
    </Suspense>
  )
}

export default MapPage
