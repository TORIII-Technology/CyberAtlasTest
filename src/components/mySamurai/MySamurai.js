import { useState, useContext } from "react"
import { Stack, Button, styled } from "@mui/material"

import { putUserImage, useUser } from "services/apis/user"
import { AuthContext } from "components/context/AuthContext"
import Title from "components/mySamurai/Title"
import SamuraiList from "components/mySamurai/SamuraiList"
import SamuraiIcon from "components/icons/SamuraiIcon"
import SamuraiPurchase from "components/mySamurai/SamuraiPurchase"
import MainButton from "components/buttons/MainButton"


const MySamurai = styled(Stack)((props) => ({
  alignItems: "center",
  width: "100%",
  padding: "12px 0",
  paddingBottom: "48px",
  borderBottom: `1px solid ${props.theme.palette.main.divider}`,
}))

const SettingButton = styled(Button)((props) => ({
  border: "1px solid #ffffff50",
  fontSize: "12px",
  height: "26px",
  color: props.isSettingMode ? "#000" : "#fff",
  backgroundColor: props.isSettingMode ? "#fff" : "#000",
  "&:hover": {
    backgroundColor: "#ffffff70",
  },
}))

const SettingPFPButton = ({
  isSettingMode,
  selectedSamurai,
  toggleSettingMode,
  handleChangePFP,
}) => {
  const handleClick = () => {
    if (isSettingMode && selectedSamurai) {
      handleChangePFP()
      toggleSettingMode()
    } else {
      toggleSettingMode()
    }
  }

  return (
    <SettingButton onClick={() => handleClick()}>
      {selectedSamurai && isSettingMode ? "Save" : " Change PFP"}
    </SettingButton>
  )
}

export default function MySamuraiThemeUsage(props) {
  const { isOwningSamurai, nfts } = props
  const { state, token } = useContext(AuthContext)
  const { mutate } = useUser(token)
  const [isSettingMode, setIsSettingMode] = useState(false)
  const [selectedSamurai, setSelectedSamurai] = useState(state.user.image)

  const toggleSettingMode = () => setIsSettingMode(!isSettingMode)

  const handleChangePFP = async () => {
    try {
      await putUserImage(selectedSamurai, token)
      mutate()
      setIsSettingMode(!isSettingMode)
    } catch (err) {
      alert("change failed")
    }
  }

  return (
    <MySamurai>
      <Title
        icon={<SamuraiIcon fontSize="large" />}
        // button={
        //   nfts.length > 0 && (
        //     <SettingPFPButton
        //       isSettingMode={isSettingMode}
        //       toggleSettingMode={toggleSettingMode}
        //       handleChangePFP={handleChangePFP}
        //       selectedSamurai={selectedSamurai}
        //     />
        //   )
        // }
      >
        Certified NFT
      </Title>
      <MainButton
        link="https://www.katanansamurai.art/"
      >
        change PFP
      </MainButton>
      <SamuraiList
        nfts={nfts}
        isSettingMode={isSettingMode}
        selectedSamurai={selectedSamurai}
        setSelectedSamurai={setSelectedSamurai}
      />
      <SamuraiPurchase isOwningSamurai={isOwningSamurai} />
    </MySamurai>
  )
}
