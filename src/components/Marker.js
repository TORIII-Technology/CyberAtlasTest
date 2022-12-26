import { styled } from "@mui/material/styles"
import { Avatar } from "@mui/material"
import triangle from "assets/images/triangle.png"
import BlossomIcon from "./icons/BlossomIcon"

const Marker = styled("div")(({ theme }) => ({
  width: "58px",
  height: "58px",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.502)",
  position: "relative",
}))

const Circle = styled("div")(({ theme }) => ({
  zIndex: "5", //TODO: check if this is needed
  borderRadius: "50%",
  width: "58px",
  height: "58px",
  backgroundColor: "black",
  border: "3px solid #fff",
  flex: "1",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const Triangle = styled("img")(({ theme }) => ({
  zIndex: "1",
  width: "32px",
  bottom: "-16px",
  position: "absolute",
  margin: "0 auto",
  left: "0",
  right: "0",
}))

const TopContent = styled("div")(({ theme }) => ({
  zIndex: "1",
  width: "100px",
  height: "18px",
  position: "absolute",
  paddingLeft: "10px",
  top: "12px",
  right: "-92px",
  backgroundColor: "white",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  color: "black",
}))

const Text = styled("p")(({ theme }) => ({
  fontSize: "10px",
  width: "auto",
  display: "inline-block",

  lineHeight: "18px",
  margin: "0",
}))

const BottomContent = styled("div")(({ theme }) => ({
  zIndex: "1",
  display: "flex",
  alignItems: "center",
  paddingLeft: "10px",
  width: "95px",
  height: "18px",
  position: "absolute",
  top: "30px",
  right: "-85px",
  color: "white",
  backgroundColor: "gray",
  fontSize: "8px",
  borderRadius: "4px 0 4px 4px",
}))

const Span = styled("span")(({ theme }) => ({
  fontSize: "8px",
  lineHeight: "18px",
  margin: "0",
  color: "#555",
}))

export default function ThemeUsage(props) {
  return (
    <Marker>
      <Circle>
        <Avatar sx={{ width: "42px", height: "42px" }} size="medium" />
      </Circle>
      <TopContent>
        <Text>鷹流東京醬油..</Text>
      </TopContent>
      <BottomContent direction="row">
        <Text>4.5</Text>
        <BlossomIcon fontSize="10px" />
        <Span>(88則評論)</Span>
      </BottomContent>
      <Triangle src={triangle} alt="triangle" />
    </Marker>
  )
}
