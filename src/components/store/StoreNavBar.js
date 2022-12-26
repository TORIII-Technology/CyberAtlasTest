import { useCallback } from "react"
import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom"
import { useStoreById } from "services/apis/store"
import { styled } from "@mui/system"
import { Grid } from "@mui/material"

const NavBar = styled(Grid)(({ theme }) => ({
  backgroundColor: "#707070",
  borderRadius: 0,
  height: "36px",
  alignItems: "center",
  width: "100%",
  padding: "0px 16px",
  position: "sticky",
  top: 0,
  zIndex: 1,
}))

const NavBarItem = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  "&:nth-of-type(1)": { textAlign: "left", cursor: "pointer" },
  "&:nth-of-type(3)": { textAlign: "right", cursor: "pointer" },
}))

const StoreNavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { storeId } = useParams()
  const { data: storeData } = useStoreById(storeId)
  const isAddPostPage = location.pathname.includes("addPost")

  const handleClickBack = useCallback(() => {
    navigate(-1)

    //eslint-disable-next-line
  }, [])

  const handleClickToPost = useCallback(() => {
    navigate(`/${storeId}/addPost`)

    //eslint-disable-next-line
  }, [storeId])

  return (
    <>
      <NavBar container>
        <NavBarItem item xs={2.5} onClick={handleClickBack}>
          返回
        </NavBarItem>
        <NavBarItem item xs>
          {storeData && storeData.store.name}
        </NavBarItem>
        <NavBarItem
          item
          xs={2.5}
          onClick={isAddPostPage ? null : handleClickToPost}
        >
          {!isAddPostPage && "貼文"}
        </NavBarItem>
      </NavBar>

      <Outlet />
    </>
  )
}

export default StoreNavBar
