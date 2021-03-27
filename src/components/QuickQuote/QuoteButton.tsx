import React from "react"
import { Button, ButtonProps } from "antd"
import { blue } from "../../constant/colors"
import Text from "../Text"

const QuoteButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      shape="round"
      {...props}
      style={{
        height: "40px",
        backgroundColor: blue,
        ...props?.style
      }}
    >
      <Text style={{ fontSize: "12px", color: "white" }}>
        {props?.children}
      </Text>
    </Button>
  )
}

export default QuoteButton
