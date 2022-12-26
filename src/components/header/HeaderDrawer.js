import { styled, IconButton, Stack, Link, Typography, Box } from "@mui/material"

import useDisclosure from "libs/hooks/useDisclosure"
import Image from "components/Image"
import MenuLink from "components/header/MenuLink"
import PartnerList from "components/PartnerList/PartnerList"

import DoorIcon from "components/icons/DoorIcon"
import MenuIcon from "components/icons/MenuIcon"
import CloseIcon from "components/icons/CloseIcon"
import DiscordIcon from "components/icons/DiscordIcon"
import TwitterIcon from "components/icons/TwitterIcon"
import OpenseaIcon from "components/icons/OpenseaIcon"
// import logoEn from "assets/images/logoEn.png"
import logoEn from "assets/images/logoMap.svg"
import cyberAuthLogo from "assets/images/cyberauth.png"


const MenuList = [
  {
    title: "ATLAS",
    to: "",
  },
  {
    title: "POSTS",
    to: "ramens",
  },
  {
    title: "MY NFTS",
    to: "me",
  },
  {
    title: "CONNECT WALLET",
    to: "login",
  },
]

const Button = styled(IconButton)(({ theme }) => ({
  color: theme.palette.interact.unActive,
}))

const Menu = styled("div")(({ theme }) => ({
  zIndex: "10",
  position: "absolute",
  // display: "flex",
  flexDirection: "column",
  top: "0",
  left: "-16px",
  height: "100%",
  width: "100%",
  backgroundColor: "black",
  overflow: "scroll",
}))

const MenuHead = styled("div")(({ theme }) => ({
  height: "54px",
  display: "flex",
  position: "sticky",
  top: "0",
  alignItems: "center",
  width: "100%",
  backgroundColor: "black",
  zIndex: "100",
}))

const MenuContent = styled("div")(({ theme }) => ({
  zIndex: "10",
  flex: "1",
  display: "flex",
  minHeight: 0,
  overflowY: "scroll",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  padding: "20px",
  backgroundColor: "black",
}))

const Line = styled(Box)((props) => ({
  height: "1px",
  width: "100%",
  backgroundColor: "#74747480",
}))

const LineDivider = styled("div")(({ theme }) => ({
  height: "30px",
  margin: "5px 0px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}))

const DividerText = styled(Typography)((props) => ({
  position: "absolute",
  background: "black",
  padding: "0 24px",
  color: "#747474",
  fontSize: "10px",
}))

const PartnerContainer = styled("div")(() => ({
  width: "100%",
  marginTop: "20px",
  textTransform: "uppercase",
}))

const PartnerSection = () => {
  return (
    <>
      <PartnerContainer>
        <LineDivider>
          <Line />
          <DividerText>PARTNER</DividerText>
        </LineDivider>
        <PartnerList />
      </PartnerContainer>
    </>
  )
}

const HeaderDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>
        <MenuIcon />
      </Button>
      {isOpen && (
        <Menu>
          <MenuHead>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Image
              left="0"
              right="0"
              position="absolute"
              margin="0 auto"
              width="150px"
              src={logoEn}
            />
          </MenuHead>
          <MenuContent>
            <Stack spacing={2} alignItems="center">
              {MenuList.map((item) => (
                <MenuLink key={item.title} to={item.to} onClick={onClose}>
                  {item.title}
                </MenuLink>
              ))}
            </Stack>
            {/* <Stack direction="row" spacing={2} pt="40px">
              <Link
                target="_blank"
                href="https://discord.com/invite/BqgSAxx6EP"
                sx={{ textDecoration: "none", color: "#fff" }}
              >
                <DiscordIcon sx={{ fontSize: 32 }} />
              </Link>
              <Link
                target="_blank"
                href="https://twitter.com/kns_nft"
                sx={{ textDecoration: "none", color: "#fff" }}
              >
                <TwitterIcon sx={{ fontSize: 32 }} />
              </Link>
              <Link
                target="_blank"
                href="https://opensea.io/collection/katana-n-samurai-2"
                sx={{ textDecoration: "none", color: "#fff" }}
              >
                <OpenseaIcon sx={{ fontSize: 32 }} />
              </Link>
            </Stack> */}
            <PartnerSection />
            <Link
              target="_blank"
              href="https://www.aiii.ai/cyber-auth"
              sx={{ textDecoration: "none" }}
            >
              {/* <Stack direction="row" spacing={2} pt="15px" alignItems="center">
                <Typography variant="menu">
                  <cyberAuthLogo
                    sx={{
                      fontSize: 24,
                      marginRight: "5px",
                    }}
                  />
                  <span>CyberAuth</span>
                </Typography>
              </Stack> */}
              <Stack direction="row" spacing={2} pt="15px" alignItems="center">
              <Image
                left="0"
                right="0"
                position="absolute"
                margin="0 auto"
                width="150px"
                src={cyberAuthLogo}
              />
              </Stack>
            </Link>
          </MenuContent>
          {/* <PartnerSection /> */}
        </Menu>
      )}
    </>
  )
}

export default HeaderDrawer
