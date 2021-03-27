import Divider from "./Divider"
import React from "react"
import { lightBlue } from "../constant/colors"
import Text from "./Text"
import View from "./View"

interface SectionProps {
  children: any
  title: string | null
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View>
      <Text style={{ fontSize: "3vw", color: "#5e5d5f" }}>{title}</Text>
      <Divider
        style={{
          marginTop: "15px",
          backgroundColor: lightBlue,
          height: "1.5px",
          marginBottom: "10px"
        }}
      />
      {children}
    </View>
  )
}

export default Section
