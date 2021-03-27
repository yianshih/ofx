import React from "react"
import { useHistory } from "react-router-dom"
import { StyleSheet } from "../../../types"
import Image from "../../components/Image"
import Text from "../../components/Text"
import View from "../../components/View"
import { orange } from "../../constant/colors"
import { commonStyles } from "../../shared/styles"
import "./welcomPage.css"
import LogoNameImage from "../../assets/images/LogoName.png"
import Layout from "../../components/Layout"

const WelcomePage = () => {
  const history = useHistory()

  return (
    <Layout>
      <View style={{ ...commonStyles.centerView, flex: 1, marginTop: "10%" }}>
        <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Image
            src={LogoNameImage}
            style={{ width: "100px", height: "37px", marginLeft: "10px" }}
          />
        </View>
        <View style={{ marginTop: "20px" }}>
          <View
            onClick={() => history.push("quickQuote")}
            className="startButton"
            style={{ ...commonStyles.centerView, ...styles.startButton }}
          >
            <Text style={styles.startButtonText}>START QUOTING</Text>
          </View>
        </View>
      </View>
    </Layout>
  )
}

const styles: StyleSheet = {
  welcomeText: {
    color: "GrayText"
  },
  startButtonText: {
    textAlign: "center",
    fontSize: "20px",
    color: "white"
  },
  startButton: {
    minWidth: "150px",
    minHeight: "150px",
    width: "15vw",
    height: "15vw",
    backgroundColor: orange,
    borderRadius: "50%"
  }
}

export default WelcomePage
