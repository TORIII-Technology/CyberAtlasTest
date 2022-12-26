import { useContext, useState } from "react"
import { useOwnedNFTs } from "services/apis/nft"
import { useUserPostList } from "services/apis/post"
import { Typography, Box, Stack, Avatar, styled } from "@mui/material"
import { AuthContext } from "components/context/AuthContext"
import MySamurai from "components/mySamurai/MySamurai"
import MyPost from "components/mySamurai/MyPost"
import MainButton from "components/buttons/MainButton"
import Container from "components/containers/Container"

import cooker from "assets/images/cooker.png"

const BasicProfile = styled(Stack)((props) => ({
  width: "100%",
  padding: "60px 0",
  direction: "column",
  alignItems: "center",
  borderBottom: `1px solid ${props.theme.palette.main.divider}`,
}))

const BasicProfileAvatar = styled(Avatar)((props) => ({
  width: "125px",
  height: "125px",
}))

const MePage = () => {
  const { state, dispatch } = useContext(AuthContext)
  const { data: postData } = useUserPostList()
  const { data: nftData } = useOwnedNFTs()

  //幫有NFT沒設大頭貼的用戶
  const firstNFT = nftData && nftData.nfts[0]
  const avatar = state.user.image || (firstNFT && firstNFT?.imageUrl) || cooker

  return (
    <Container textAlign="center">
      <BasicProfile spacing="20px">
        <BasicProfileAvatar src={avatar} />
        <Typography
          width="240px"
          textAlign="center"
          component="p"
          variant="body12"
        >
          {state.user?.walletAddress}
        </Typography>
      </BasicProfile>
      {nftData && <MySamurai isOwningSamurai="true" nfts={nftData.nfts} />}
      {postData && <MyPost posts={postData} />}
      <MainButton sx={{ my: 3 }} onClick={() => dispatch({ type: "LOGOUT" })}>
        LOG OUT
      </MainButton>
    </Container>
  )
}

export default MePage
