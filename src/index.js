import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import "index.css"
import App from "App"
import HOCs from "hocs"
import reportWebVitals from "reportWebVitals"
import PFive from "components/containers/sketch"


ReactDOM.render(
  <React.StrictMode>
    <HOCs>
      <BrowserRouter>
        <App />
        <PFive/>
      </BrowserRouter>
    </HOCs>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
