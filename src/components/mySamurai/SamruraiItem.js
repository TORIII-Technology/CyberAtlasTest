import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { Typography, Box, styled, Popover, Modal } from "@mui/material"
import useDisclosure from "libs/hooks/useDisclosure"
import AspectRatio from "components/AspectRatio"

const ProfileTag = styled(Typography)((props) => ({
  padding: "8px 0",
  background: "rgba(0,0,0,0.65)",
  color: "white",
  position: "absolute",
  bottom: "0",
  width: "100%",
  textAlign: "center",
  fontSize: "12px",
}))

const ModalContainer = styled(Modal)((props) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

const ModalBox = styled("div")((props) => ({
  "&:focus": {
    outline: "none",
  },
}))

const TimeSection = styled(Typography)((props) => ({
  paddingTop: "8px",
  textAlign: "center",
  fontSize: "24px",
  "@media (max-width: 768px)": {
    paddingTop: "20px",
  },
}))

const Image = styled("img")((props) => ({
  background: "black",
  width: "375px",
  height: "375px",
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 768px)": {
    width: "100%",
    height: "auto",
  },
  "&:focus": {
    outline: "none",
  },
}))

const Timer = () => {
  const [time, setTime] = useState(dayjs().format("A HH:mm:ss"))
  useEffect(() => {
    const now = setTimeout(() => {
      setTime(dayjs().format("A HH:mm:ss"))
    }, 1000)
    return () => clearTimeout(now)
  })
  return <TimeSection>{time}</TimeSection>
}

const SamuraiItem = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isSettingMode,
    index,
    imageUrl,
    selectedSamurai,
    setSelectedSamurai,
  } = props

  let isSelected = false

  if (isSettingMode) {
    if (selectedSamurai) {
      isSelected = selectedSamurai === imageUrl
    } else {
      isSelected = index === 0
    }
  }

  const handleClick = () => {
    if (!isSettingMode) {
      onOpen()
    } else {
      setSelectedSamurai(imageUrl)
    }
  }

  return (
    <>
      <AspectRatio
        onClick={() => handleClick()}
        width="100%"
        ratio="100%"
        sx={{ cursor: "pointer" }}
      >
        <img src={props.imageUrl} alt={props.name} loading="lazy" />
        {isSelected && (
          <Box sx={{ height: "40px" }}>
            <ProfileTag>Profile Picture</ProfileTag>
          </Box>
        )}
      </AspectRatio>
      <ModalContainer open={isOpen} onClose={onClose}>
        <ModalBox>
          <Image src={props.imageUrl} alt={props.name} loading="lazy" />
          <Timer />
        </ModalBox>
      </ModalContainer>
    </>
  )
}

export default SamuraiItem
