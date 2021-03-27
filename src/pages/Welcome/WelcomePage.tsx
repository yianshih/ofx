import { Button } from "antd"
import React from "react"
import { useHistory } from "react-router-dom"
import View from "../../components/View"
import { orange } from "../../constant/colors"
import { commonStyles } from "../../shared/styles"

const WelcomePage = () => {
  const history = useHistory()

  return (
    <View style={{ ...commonStyles.centerView, height: "100vh" }}>
      <View>Welcome to OFX</View>
      <View style={{ marginTop: 10 }}>
        <Button
          onClick={() => history.push("/QuickQuote")}
          style={{
            width: 200,
            height: 200,
            backgroundColor: orange,
            color: "white",
            fontSize: 20,
            fontWeight: "bolder"
          }}
          shape="circle"
        >
          Start Quoting
        </Button>
      </View>
    </View>
  )
}

export default WelcomePage
