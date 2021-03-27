import React from "react"
import { Divider as AntDivider, DividerProps } from "antd"

const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <AntDivider {...props} style={{ margin: "0px", ...props?.style }} />
}

export default Divider
