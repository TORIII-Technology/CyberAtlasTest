import { useParams } from 'react-router-dom'
import { useStoreById } from 'services/apis/store'
import { usePostList } from 'services/apis/post'
import { styled } from '@mui/system'
import { Stack, Avatar, Typography } from '@mui/material'

import {
  TimeIcon,
  WebIcon,
  PhoneIcon,
  RamenIcon,
  MarkerIcon,
  BlossomIcon,
  FacebookIcon,
  InstagramIcon,
} from 'components/icons'
import PostList from 'components/postList/PostList'
import BusinessHourList from 'components/store/BusinessHourList'
import Container from 'components/containers/Container'
import DiscountInfo from 'components/store/DiscountInfo'

const generateExternalLinkToGoogleMap = (lat, lng, placeId) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`

const StoreInfoSection = styled(Stack)({
  minHeight: '412px',
  alignItems: 'center',
  paddingTop: '45px',
})

const TitleSection = styled(Stack)({})

const Title = styled(Stack)({
  maxWidth: '185px',
  flexDirection: 'row',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  // "& > .MuiSvgIcon-root": {
  //   width: 15,
  //   height: 15,
  //   position: "absolute",
  //   left: -20,
  //   top: 2,
  // },
  '& > p': {
    fontSize: '16px',
    margin: 0,
    textAlign: 'center',
    lineHeight: '24px',
  },
})

const Review = styled('span')({
  display: 'flex',
  fontSize: '8px',
  fontWeight: 'bolder',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  '& > .MuiSvgIcon-root': {
    width: 12,
    height: 12,
  },
  '& > p': {
    color: '#747474',
  },
})

const InfoSection = styled(Stack)({
  gap: 14,
  paddingBottom: 20,
})

const Info = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
  '& > .MuiSvgIcon-root': { color: '#747474', width: '15px', height: '15px' },
})

const InfoText = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '12px',
  '& a': { color: 'white', textDecoration: 'none', cursor: 'pointer' },
})

const PostSection = styled(Stack)({
  width: '100%',
  paddingTop: 20,
})

const StorePage = () => {
  const { storeId } = useParams()
  const { data: storeData } = useStoreById(storeId)
  const { data: storePostData } = usePostList(
    { store_id: storeId },
    null,
    Boolean(storeId)
  )
  const externalLinkToGoogleMap =
    storeData &&
    storePostData &&
    generateExternalLinkToGoogleMap(
      storeData.store.location.lat,
      storeData.store.location.lng,
      storeData.store.placeId
    )

  return (
    <Container>
      {storeData && storePostData && (
        <StoreInfoSection spacing={1.5}>
          <Avatar
            src={storeData.store?.image?.url}
            sx={{ width: '125px', height: '125px' }}
          />
          <TitleSection>
            <Title>
              <BlossomIcon sx={{ width: '15px', height: '15px', mr: 0.5 }} />
              <p>{storeData.store?.name}</p>
            </Title>

            <Review>
              {storeData.store?.rating || '無評分'}
              <BlossomIcon />
              <p>({storeData.store?.reviewCount || 0}則 Google 評論)</p>
            </Review>
          </TitleSection>
          <InfoSection>
            <Info>
              <TimeIcon />
              <BusinessHourList
                data={storeData.store.businessHours}
                RenderText={({ children, ...props }) => (
                  <InfoText {...props}>{children}</InfoText>
                )}
              />
            </Info>
            <Info>
              <PhoneIcon />
              <InfoText>{storeData.store?.phone || '無電話資料'}</InfoText>
            </Info>
            <Info>
              <MarkerIcon />
              <InfoText>
                {(
                  <a href={externalLinkToGoogleMap} target="_blank">
                    {storeData.store?.address}
                  </a>
                ) || '無地址資料'}
              </InfoText>
            </Info>
            {storeData.store?.socialMedia?.website && (
              <Info>
                <WebIcon />
                <InfoText>
                  <a href={storeData.store?.socialMedia?.website}>
                    {storeData.store?.name}
                  </a>
                </InfoText>
              </Info>
            )}
            {storeData.store?.socialMedia?.facebook && (
              <Info>
                <FacebookIcon />
                <InfoText>
                  <a
                    href={storeData.store?.socialMedia?.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {storeData.store?.name}
                  </a>
                </InfoText>
              </Info>
            )}
            {storeData.store?.socialMedia?.instagram && (
              <Info>
                <InstagramIcon />
                <InfoText>
                  <a href={storeData.store?.socialMedia?.instagram}>
                    {storeData.store?.name}
                  </a>
                </InfoText>
              </Info>
            )}
            {/* <Info>
            
              <WebIcon />
              <InfoText>{storeData.store?.description || "暫無說明"}</InfoText>
            </Info> */}
          </InfoSection>
          {storeData.store.descriptions.map((item) => (
            <DiscountInfo key={item.title} data={item} />
          ))}
          {storeData.store.descriptions.length !== 0 && (
            <Typography variant="body2">
              * 詳細兌換規則以店家公告為準
            </Typography>
          )}
          <PostSection>
            <PostList posts={storePostData.posts} />
          </PostSection>
        </StoreInfoSection>
      )}
    </Container>
  )
}

export default StorePage
