import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import QuickQuotePage from "./QuickQuotePage/QuickQuotePage"
import WelcomePage from "./Welcome/WelcomePage"

export default function Pages() {
  let match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.url}/`}>
        <WelcomePage />
      </Route>
      <Route path={`${match.url}quickQuote`}>
        <QuickQuotePage />
      </Route>
    </Switch>
  )
}
