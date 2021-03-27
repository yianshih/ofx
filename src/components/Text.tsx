import React from "react"
import { black } from "../constant/colors"

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: any
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <p
      {...props}
      style={{
        color: black,
        fontSize: "20px",
        marginBottom: "0px",
        ...props?.style
      }}
    >
      {children}
    </p>
  )
}

export default Text
