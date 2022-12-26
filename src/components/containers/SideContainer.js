import { styled } from "@mui/material/styles"
import bgPcLeft from "../../assets/images/SideBg-L.png"
import bgPcRight from "../../assets/images/SideBg-R.png"


const SideContainer = styled("div")((props) => ({
  height: "100%",
  width: "calc(50% - 200px)",
  position: "fixed",
  top: "0",
  zIndex: "1",
  right: props.right && 0,
  backgroundRepeat: "no-repeat",
  backgroundImage: props.right ? `url(${bgPcRight})` : `url(${bgPcLeft})`,
  backgroundPosition: props.right ? "center left":"center right",
  backgroundSize: "cover",
}))

export default function ThemeUsage(props) {
  return <SideContainer {...props} />
}
