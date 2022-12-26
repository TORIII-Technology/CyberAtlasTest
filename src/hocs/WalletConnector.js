import { Provider, chain, defaultChains } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { WalletLinkConnector } from "wagmi/connectors/walletLink"
import { Buffer } from "buffer"
// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer
}

const infuraId = process.env.REACT_APP_INFURA_ID

const chains = defaultChains

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "My wagmi app",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

const WalletConnector = ({ children }) => {
  return <Provider connectors={connectors}>{children}</Provider>
}

export default WalletConnector
