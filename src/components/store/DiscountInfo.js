import { styled } from "@mui/system"
import { Stack, Typography } from "@mui/material"
import { CouponIcon } from "components/icons"

const Container = styled(Stack)({
  flexDirection: "row",
  width: 308,
  height: 91,
  border: "1px solid #FFFFFF55",
  borderRadius: 8,
})

const Title = styled(Stack)({
  flexBasis: "30%",

  backgroundImage: "linear-gradient(#FFFFFF55 40%, rgba(255,255,255,0) 0%)",
  backgroundPosition: "right",
  backgroundSize: "1px 8px",
  backgroundRepeat: "repeat-y",

  alignItems: "center",
  justifyContent: "center",
  "& > p": {
    fontSize: "12px",
  },
})

const Content = styled(Stack)({
  flexBasis: "70%",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 38px",
  overflow: "hidden",
  "& > p": {
    fontSize: "12px",
    whiteSpace: "pre-wrap",
  },
})

const DiscountInfo = ({ data }) => {
  return (
    <Container>
      <Title>
        <CouponIcon sx={{ marginBottom: "5px" }} />
        <Typography>{data.title}</Typography>
        <Typography>店家招待</Typography>
      </Title>
      <Content>
        <Typography>{data.body}</Typography>
      </Content>
    </Container>
  )
}

export default DiscountInfo
