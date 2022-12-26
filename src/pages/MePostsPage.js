import { useCallback, useState, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "components/context/AuthContext"
import { useUserPostList, deletePost } from "services/apis/post"
import APost from "components/APost"
import { styled } from "@mui/system"
import { Grid, Button, ClickAwayListener } from "@mui/material"

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

const StyledDeleteBtn = styled(Button)(({ theme, isDelete }) => ({
  alignSelf: "flex-start",
  marginLeft: 32,
  marginTop: -42,
  marginBottom: 64,
  height: 30,
  padding: "5px 25px 7px",
  borderRadius: 6,
  borderColor: isDelete ? theme.palette.error.main : "white",
  color: isDelete ? theme.palette.error.main : "white",
  "&:hover": {
    color: theme.palette.error.main,
  },
}))

const DeleteButton = ({ postId, token, mutate }) => {
  const [isDelete, setIsDelete] = useState(false)
  const navigate = useNavigate()

  const handleToDelete = () => {
    setIsDelete(true)
  }

  const handleCancelDelete = () => {
    setIsDelete(false)
  }

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postId, token)
      navigate(-1)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ClickAwayListener onClickAway={handleCancelDelete}>
      <StyledDeleteBtn
        variant="outlined"
        color="error"
        onClick={isDelete ? handleConfirmDelete : handleToDelete}
      >
        {isDelete ? "確認刪除" : "刪除貼文"}
      </StyledDeleteBtn>
    </ClickAwayListener>
  )
}

const MePostsPage = () => {
  const location = useLocation()
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const { data: postData, mutate } = useUserPostList()

  const handleClickBack = useCallback(() => {
    navigate(-1)

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (postData && location.hash) {
      document.getElementById(location.hash.slice(1)).scrollIntoView()
    }

    // eslint-disable-next-line
  }, [postData])

  return (
    <>
      <NavBar container>
        <NavBarItem item onClick={handleClickBack}>
          返回 個人頁面
        </NavBarItem>
      </NavBar>

      {postData &&
        postData.posts.map((post) => (
          <div
            key={`${post.id} + ${post.createdAt}`}
            style={{ marginTop: -36 }}
          >
            <APost post={post} mePage />
            <DeleteButton postId={post.id} token={token} mutate={mutate} />
          </div>
        ))}
    </>
  )
}
export default MePostsPage
