import React from "react"
import ReactDOM from "react-dom"

import reportWebVitals from "./reportWebVitals"
import WanringProvider from "./HOC/WarningProvider/WarningProvider"
import LoadingProvider from "./HOC/LoadingProvider/LoadingProvider"
import { Provider } from "react-redux"
import { HashRouter as Router } from "react-router-dom"
import store from "./redux/store"
import Pages from "./pages"
import "antd/dist/antd.css"
import "./index.css"

ReactDOM.render(
  <Provider store={store}>
    <WanringProvider />
    <LoadingProvider />
    <Router>
      <Pages />
    </Router>
  </Provider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
