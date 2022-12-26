import { useState, useEffect } from "react"
import { useMediaQuery, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import Door from "components/containers/Door"
import Image from "components/Image"
import topBanner from "assets/images/BannerTop.png"
import bottomBanner from "assets/images/BannerBot.png"

const DesktopContainer = styled("div")(({ theme }) => ({}))

// for desktop setting width: 100% to "400px"
const MobileLayout = styled(Box)((props) => ({
  display: "flex",
  height: props.windowInnerHeight,
  overflow: "hidden",
  flexDirection: "column",
  margin: "0 auto",
  position: "relative",
}))

const InnerContainer = styled("div")((props) => ({
  display: "flex",
  flexDirection: "column",
  flex: "1",
  minHeight: "480px",
  position: "relative",
}))

export default function ThemeUsage(props) {
  const matchDesktop = useMediaQuery("(min-width:800px)")
  const [windowInnerHeight, setWindowInnerHeight] = useState(0)

  useEffect(() => {
    setWindowInnerHeight(window.innerHeight)
  }, [])

  return (
    <DesktopContainer>
      {matchDesktop && <Door />}
      <MobileLayout
        windowInnerHeight={windowInnerHeight}
        width={matchDesktop ? "400px" : "100%"}
      >
        {matchDesktop && <Image width="100%" height="150px" src={topBanner} />}
        <InnerContainer flex="1">{props.children}</InnerContainer>
        {matchDesktop && (
          <Image width="100%" height="150px" src={bottomBanner} />
        )}
      </MobileLayout>
    </DesktopContainer>
  )
}
