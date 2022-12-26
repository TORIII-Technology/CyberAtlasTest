import { ImageList, ImageListItem } from "@mui/material"
import SamuraiItem from "components/mySamurai/SamruraiItem"

const SamuraiList = ({
  nfts,
  isSettingMode,
  selectedSamurai,
  setSelectedSamurai,
}) => {
  return (
    <ImageList sx={{ width: "100%" }} cols={3}>
      {nfts?.map((nft, index) => (
        <ImageListItem key={`nft_${nft.id}`}>
          <SamuraiItem
            {...nft}
            isSettingMode={isSettingMode}
            selectedSamurai={selectedSamurai}
            setSelectedSamurai={setSelectedSamurai}
            index={index}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
export default SamuraiList
