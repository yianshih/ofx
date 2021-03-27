import React from "react"
import AntLayout, { LayoutProps } from "antd/lib/layout"

const Layout: React.FC<LayoutProps> = ({ ...props }) => {
  return (
    <AntLayout {...props} style={{ backgroundColor: "white", ...props?.style }}>
      {props?.children}
    </AntLayout>
  )
}
export default Layout
