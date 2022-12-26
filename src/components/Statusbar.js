// the Statusbar is used to display post time & wallet address
import { styled, Stack, Box, Avatar, Typography as Text } from "@mui/material"
import cooker from "assets/images/cooker.png"
import useEncode from "libs/hooks/useEncode"
import dayjs from "dayjs"

const Space = styled(Box)((props) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: "8px",
}))

const Statusbar = (props) => {
  const { address, time, userImage } = props

  const { encodeAddress } = useEncode(address !== "訪客" ? address : false)

  const user = encodeAddress ?? "訪客"

  return (
    <Space>
      <Stack spacing="5px" direction="row" alignItems="center">
        <Avatar
          src={userImage || cooker}
          sx={{ width: "20px", height: "20px" }}
        />
        <Text>{user}</Text>
      </Stack>
      <Text variant="time">{dayjs(time).format("YYYY/MM/DD HH:mm")}</Text>
    </Space>
  )
}

export default Statusbar
