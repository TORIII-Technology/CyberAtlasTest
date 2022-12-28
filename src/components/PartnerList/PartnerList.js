import { Link } from "react-router-dom"
import { ImageList, ImageListItem } from "@mui/material"
import PostItem from "components/postList/PostItem"

import theLastRamen from "assets/images/partner/theLastRamen.jpg"
import demiHuman from "assets/images/partner/demiHuman.png"
import kojirou from "assets/images/partner/kojirou.jpg"


const partners = [
  {
    name: "theLastRamen",
    img: theLastRamen,
  },
  {
    name: "kojirou",
    img: kojirou,
  },
  {
    name: "demiHuman",
    img: demiHuman,
  },
]

const PartnerList = () => {
  return (
    <ImageList sx={{ width: "100%" }} cols={3} gap={8}>
      {partners.map((partner) => (
        <ImageListItem key={partner.name}>
          <PostItem img={partner.img} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
export default PartnerList
