import { useMemo, useState } from "react"
import { Menu, Stack, Divider } from "@mui/material"
import { styled } from "@mui/system"
import dayjs from "dayjs"
import { ArrowDropDownIcon, ArrowDropUpIcon } from "components/icons"

const dayNameList = ["su", "mo", "tu", "we", "th", "fr", "sa"]
const today = dayNameList[dayjs().day()]

const TimeList = styled(Menu)({
  "& .MuiMenu-paper": {
    borderRadius: 7,
    minHeight: 210,
    border: "1px solid white",
    backgroundColor: "#000000",
    padding: "5.5px 25px 5.5px 8px",
    wordSpacing: "10px",
  },
})

const CustomDivider = styled(Divider)({
  borderColor: "#747474",
  borderBottomWidth: "0.5px",
})

const BusinessHourList = ({ data, RenderText }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    if (!data) return null
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const times = useMemo(() => {
    const arr = []
    if (data) {
      for (const [day, time] of Object.entries(data)) {
        arr.push({ day, time })
      }
    }
    return arr
  }, [data])

  return (
    <>
      <RenderText key="currentDay" onClick={handleClick}>
        {data ? data[today] : "無營業時間資料"}
        <ArrowDropDownIcon sx={{ width: "15px", height: "15px" }} />
      </RenderText>
      <TimeList
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          disablePadding: true,
        }}
      >
        <Stack divider={<CustomDivider />} spacing="7.5px">
          {times.map((item) => (
            <RenderText
              key={item.day}
              sx={{ color: item.day === today ? "#FFFFFF" : "#FFFFFF60" }}
            >
              {item.time}
            </RenderText>
          ))}
        </Stack>
        <ArrowDropUpIcon
          sx={{
            width: "15px",
            height: "15px",
            position: "absolute",
            right: -20,
            top: 0,
          }}
        />
      </TimeList>
    </>
  )
}

export default BusinessHourList
