import React from "react"
import { Button, ButtonProps } from "antd"
import { blue } from "../../constant/colors"

const QuoteButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      shape="round"
      {...props}
      style={{
        height: "50px",
        color: "white",
        backgroundColor: blue,
        ...props?.style
      }}
    >
      {props?.children}
    </Button>
  )
}

export default QuoteButton
