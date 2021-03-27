import React from "react"
import View, { ViewProps } from "./View"

const RowView: React.FC<ViewProps> = ({ ...props }) => (
  <View {...props} style={{ flexDirection: "row" }}>
    {props?.children}
  </View>
)

export default RowView
