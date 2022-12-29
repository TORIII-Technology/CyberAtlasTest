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
    site:"https://www.katanansamurai.art/",
  },
  {
    name: "kojirou",
    img: kojirou,
    site:"https://www.instagram.com/kojiroutaipei/",
  },
  {
    name: "demiHuman",
    img: demiHuman,
    site:"https://www.demiverse.io/",
  },
]

const PartnerList = () => {
  return (
    <ImageList sx={{ width: "100%" }} cols={3} gap={8}>
      {partners.map((partner) => (
        <ImageListItem key={partner.name}>
          <a
            target="_blank"
            rel="noreferrer noopenner"
            href={partner.site}
            >
            <PostItem img={partner.img} />
          </a>
        </ImageListItem>
      ))}
    </ImageList>
  )
}
export default PartnerList
