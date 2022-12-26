import { useContext } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "components/context/AuthContext"
import { AnimatedContainer } from "components/context/AnimateContext"

import MapPage from "pages/MapPage"
import RamensPage from "pages/RamensPage"
import MePage from "pages/MePage"
import LoginPage from "pages/LoginPage"
import StorePage from "pages/StorePage"
import StorePostsPage from "pages/StorePostsPage"
import AddPostPage from "pages/AddPostPage"
import AddCommentPage from "pages/AddCommentPage"
import StoreNavBar from "components/store/StoreNavBar"
import MePostsPage from "pages/MePostsPage"

const PrivateRoute = ({ children }) => {
  const {
    state: { isAuth },
  } = useContext(AuthContext)
  let location = useLocation()

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

const Router = () => {
  return (
    <AnimatedContainer>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="me">
          <Route
            index
            element={
              <PrivateRoute>
                <MePage />
              </PrivateRoute>
            }
          />
          <Route
            path="posts"
            element={
              <PrivateRoute>
                <MePostsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="ramens" element={<RamensPage />} />
        <Route path=":storeId" element={<StoreNavBar />}>
          <Route index element={<StorePage />} />
          <Route path="posts" element={<StorePostsPage />} />
          <Route path=":postId/addComment" element={<AddCommentPage />} />
          <Route
            path="addPost"
            element={
              <PrivateRoute>
                <AddPostPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/" element={<MapPage />} />
      </Routes>
    </AnimatedContainer>
  )
}

export default Router
