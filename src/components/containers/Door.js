import React, { useState } from "react"
import { Box, styled } from "@mui/material"
import { useSpring, animated } from "react-spring"
// import door from "assets/images/door.png"
import SideContainer from "./SideContainer"

const AnimatedBox = animated(Box)

const DoorContainer = styled(AnimatedBox)((props) => ({
  position: "fixed",
  zIndex: "10",
  top: "0",
  background: "transparent",
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#747474",
  height: "100vh",
  width: "50vw",
  cursor: "pointer",
}))


// const DoorImage = styled("div")((props) => ({
//   width: "100%",
//   height: "100%",
//   position: "absolute",
//   right: "0",
//   backgroundImage: `url(${door})`,
//   backgroundPosition: "center right",
//   backgroundSize: "cover",
//   transform: props.direction === "right" && "scaleX(-1)",
// }))


const Door = () => {
  const [open, setOpen] = useState(false)
  const [openLight, setOpenLight] = useState(false)

  const styleLeft = useSpring({
    left: open ? -200 : 200,
    // top: open? -500 : 0,
    background: "transparent",
    onRest: () => handelAfterOpenDoor(),
  })

  const styleRight = useSpring({
    right: open ? -200 : 200,
    // top: open? 500 : 0,
    background: "transparent",
    onRest: () => handelAfterOpenDoor(),
  })

  const handleClick = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
      setOpenLight(false)
    }
  }

  const handelAfterOpenDoor = () => {
    if (open) {
      setOpenLight(true)
    }
  }

  const BlurGlass = styled("div")({
    width: "100%",
    height: "100%",
    position: "absolute",
    padding: "30%",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: openLight? "none":"blur(3px)",
    "::-webkit-backdrop-filter": openLight? "none":"blur(3px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  })


  return (
    <>
      <DoorContainer
        direction="left"
        style={styleLeft}
        onClick={() => handleClick()}
      >
        <BlurGlass direction="left" alt="dbg" />
        {/* <DoorImage direction="left" src={door} alt="door" /> */}
      </DoorContainer>
      <DoorContainer
        direction="right"
        style={styleRight}
        onClick={() => handleClick()}
      >
        <BlurGlass direction="right" alt="dbg" />
        {/* <DoorImage direction="right" src={door} alt="door" /> */}
      </DoorContainer>
      <SideContainer />
      <SideContainer right="true" />
    </>
  )
}

export default Door
