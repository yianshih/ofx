import React from "react"

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: any
}

const View: React.FC<ViewProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        ...props?.style
      }}
    >
      {children}
    </div>
  )
}

export default View
