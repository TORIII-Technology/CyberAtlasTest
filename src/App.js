import DesktopContainer from "components/containers/DesktopContainer"
import MainContainer from "components/containers/MainContainer"
import Header from "components/header/Header"
import TabBar from "components/tabBar/TabBar"
import ErrorBoundary from "components/ErrorBoundary"
import Router from "routes"

import { AuthProvider } from "components/context/AuthContext"
import { AnimateProvider } from "components/context/AnimateContext"

function App() {
  return (
    <AuthProvider>
      <DesktopContainer>
        <AnimateProvider>
          <Header />
          <MainContainer>
            <ErrorBoundary>
              <span id="toppest" />

              <Router />
            </ErrorBoundary>
          </MainContainer>
          <TabBar />
        </AnimateProvider>
      </DesktopContainer>
    </AuthProvider>
  )
}

export default App
