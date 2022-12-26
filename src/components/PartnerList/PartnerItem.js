import AspectRatio from "components/AspectRatio"

const PartnerItem = (props) => {
  return (
    <AspectRatio width="100%" ratio="100%">
      <img
        src={props.img}
        alt={props.name}
        loading="lazy"
        style={{ objectFit: "cover" }}
      />
    </AspectRatio>
  )
}
export default PartnerItem
