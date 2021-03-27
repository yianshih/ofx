import React from "react"
import { lightGrey } from "../constant/colors"
import View from "./View"

interface SheetProps {
  style?: React.CSSProperties
  children: any
}

const Sheet: React.FC<SheetProps> = ({ style, children }) => {
  return (
    <View
      style={{
        border: `0.5px solid ${lightGrey}`,
        paddingTop: "25px",
        paddingLeft: "25px",
        paddingRight: "25px",
        paddingBottom:"25px",
        ...style
      }}
    >
      {children}
    </View>
  )
}

export default Sheet
