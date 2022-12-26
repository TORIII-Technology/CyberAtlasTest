import Theme from "hocs/Theme"
import WalletConnector from "hocs/WalletConnector"
const HOCs = ({ children }) => {
  return (
    <Theme>
      <WalletConnector>{children}</WalletConnector>
    </Theme>
  )
}

export default HOCs
