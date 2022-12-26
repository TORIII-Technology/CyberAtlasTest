import { styled } from "@mui/material/styles"
import Tab from "./Tab"
import SamuraiIcon from "components/icons/SamuraiIcon"
import MapIcon from "components/icons/MapIcon"
import RamenIcon from "components/icons/RamenIcon"

const tabList = [
  {
    icon: <RamenIcon fontSize="large" />,
    to: "ramens",
  },
  {
    icon: <MapIcon fontSize="large" />,
    to: "",
  },
  {
    icon: <SamuraiIcon fontSize="large" />,
    to: "me",
  },
]
const TabBar = styled("div")(({ theme }) => ({
  height: "60px",
  width: "100%",
  bottom: "0",
  zIndex: "1",
  borderTop: `1px solid ${theme.palette.main.divider}`,
  backgroundColor: theme.palette.main.background,
  display: "flex",
  justifyContent: "space-around",
}))

export default function ThemeUsage(props) {
  return (
    <TabBar>
      {tabList.map((tab) => (
        <Tab key={tab.to} icon={tab.icon} to={tab.to} />
      ))}
    </TabBar>
  )
}
