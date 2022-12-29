import React, { useContext } from "react"
// import { Link } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { Stack, Avatar, Link, Typography } from "@mui/material"

import { useOwnedNFTs } from "services/apis/nft"
// import MetaMaskIcon from "components/icons/MetaMaskIcon"
// import DoorIcon from "components/icons/DoorIcon"
import { AuthContext } from "components/context/AuthContext"
import HeaderDrawer from "components/header/HeaderDrawer"
// import Image from "components/Image"
// import logoMap from "assets/images/logoMap.svg"
import cooker from "assets/images/cooker.png"
import { encodeToken } from "libs/string/encodeToken"

const Header = styled("div")(({ theme }) => ({
  height: "54px",
  width: "100%",
  padding: "0 12px",
  minW: "375px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.main.divider}`,
  color: theme.palette.primary.text,
  backgroundColor: "black",
  borderRadius: 0,
  fontSize: "8px",
}))

const UserData = ({ user }) => {
  const [encodeTokenHead, encodeTokenBottom] = encodeToken(user.walletAddress)
  const { data: nftData } = useOwnedNFTs()

  const firstNFT = nftData && nftData.nfts[0]
  const avatar = user.image || (firstNFT && firstNFT?.imageUrl) || cooker

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar sx={{ width: 24, height: 24 }} size="medium" src={avatar} />
      <Stack direction="column">
        <span>{encodeTokenHead}</span>
        <span>{encodeTokenBottom}</span>
      </Stack>
    </Stack>
  )
}

export default function ThemeUsage(props) {
  const { state, isLoading } = useContext(AuthContext)

  return (
    <Header>
      <Stack direction="row" alignItems="center" spacing={2}>
        <HeaderDrawer />
        {/* <Image
          left="42px"
          right="100"
          position="absolute"
          margin="0 auto"
          width="224px"
          src={logoMap}
        /> */}
        <Typography variant="body16mediumPixel">
          CYBER ATLAS
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing="16px">
        {!isLoading && state.isAuth && <UserData user={state.user} />}

        {/* <MuiLink
          sx={{ color: "#fff" }}
          href="https://www.katanansamurai.art/"
          target="_blank"
        >
          <DoorIcon color="white" fontSize="medium" />
        </MuiLink> */}
      </Stack>
    </Header>
  )
}
