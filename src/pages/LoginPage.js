import { isAndroid, isIOS } from "react-device-detect"
import { useCallback, useState, useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useConnect } from "wagmi"
import { SiweMessage } from "siwe"
import { AuthContext } from "components/context/AuthContext"
import { getNonce, postLogin } from "services/apis/auth"

import { styled } from "@mui/system"
import { ButtonBase, CircularProgress, Stack, Typography } from "@mui/material"

import Image from "components/Image"
import metaMask from "assets/images/metaMask.png"

function openMetaMaskUrl(url) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_self";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const FullpageContainer = styled(Stack)(() => ({
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 15%",
  gap: 40,
  background: "black",
  color: "white",
}))

const LoginButton = styled(ButtonBase)(() => ({
  fontFamily: "QuinqueFive",
  width: "100%",
  maxHeight: "44px",
  padding: "10px 4px",
  border: "1px solid white",
  borderRadius: "4px",
  fontSize: "1rem",
}))

const LoginPage = () => {
  const location = useLocation()
  const { state, dispatch } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [{ data }, connect] = useConnect()

  const from = location.state?.from?.pathname || "/me"

  const handleSignIn = useCallback(async () => {
    if (isAndroid || isIOS) {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        // window.location = process.env.REACT_APP_REDIRECT_URL
        openMetaMaskUrl(process.env.REACT_APP_REDIRECT_URL)
        return
      }
    }

    //ways to connect, [0] as MetaMask, [1]/[2] as other with QRcode
    const connector = data.connectors[0]

    setIsLoading(true)
    try {
      const res = await connect(connector) // connect from useConnect
      if (!res.data) throw res.error ?? new Error("Something went wrong")

      // Fetch random nonce, create SIWE message, and sign with wallet
      const { nonce } = await getNonce()
      const message = new SiweMessage({
        domain: window.location.host,
        address: res.data.account,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: res.data.chain?.id,
        nonce,
      })

      const signer = await connector.getSigner()
      const preparedMessage = message.prepareMessage()
      const signature = await signer.signMessage(preparedMessage)
      console.log(signature)

      const loginMsg = JSON.stringify({
        user: {
          message: `{"domain":"${message.domain}","address":"${message.address}","statement":"${message.statement}","uri":"${message.uri}","version":"${message.version}","chain_id":${message.chainId},"nonce":"${message.nonce}","issued_at":"${message.issuedAt}"}`,
          signature: signature,
          walletAddress: res.data.account,
        },
      })

      // Verify signature
      const loginRes = await postLogin(loginMsg)
      setIsLoading(false)
      dispatch({ type: "LOGIN", payload: loginRes })
    } catch (error) {
      alert("請先安裝 MetaMask，或再重新操作一次" + error)
      setIsLoading(false)
    }

    // eslint-disable-next-line
  }, [])

  return (
    <FullpageContainer>
      {!state.isAuth && (
        <>
          <Image width="80px" src={metaMask} />
          <Typography textAlign="center" fontSize="0.9rem">
            {"Please Connect to Metamask first."}
          </Typography>
          <LoginButton onClick={handleSignIn}>
            {isLoading ? <CircularProgress size={30} /> : "CONNECT WALLET"}
          </LoginButton>
        </>
      )}
      {state.isAuth && <Navigate to={from} replace={true} />}
    </FullpageContainer>
  )
}

export default LoginPage
