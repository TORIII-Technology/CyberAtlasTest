import { Typography, Stack, styled } from "@mui/material"

import MainButton from "components/buttons/MainButton"
import OpenseaIcon from "components/icons/OpenseaIcon"
import DoorIcon from "components/icons/DoorIcon"

const SamuraiPurChase = styled(Stack)((props) => ({
  alignItems: "center",
  width: "100%",
  paddingTop: props.isOwningSamurai && "40px",
}))

export default function SamuraiPurChaseThemeUsage(props) {
  const { isOwningSamurai } = props
  return (
    <SamuraiPurChase>
      <Typography
        component="p"
        variant="body12"
        width="240px"
        textAlign="center"
      >
        {isOwningSamurai
          ? "If you want get more SAMURAI, you could get one on opensea."
          : "You're not a SAMURAI yet, please get one samurai on opensea."}
      </Typography>
      <Stack
        paddingTop="20px"
        spacing="24px"
        direction="row"
        justifyContent="center"
        width="100%"
      >
        <MainButton
          link="https://www.katanansamurai.art/"
          startIcon={<DoorIcon />}
        >
          WEBSITE
        </MainButton>
        <MainButton
          link="https://opensea.io/collection/katana-n-samurai-2"
          startIcon={<OpenseaIcon />}
        >
          OPENSEA
        </MainButton>
      </Stack>
    </SamuraiPurChase>
  )
}
