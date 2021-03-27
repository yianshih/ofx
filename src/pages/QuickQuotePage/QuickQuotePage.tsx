import React from "react"
import Layout from "../../components/Layout"
import Section from "../../components/Section"
import View from "../../components/View"
import QuickQuoteForm from "./QuickQuoteForm"

const QuickQuotePage = () => {
  return (
    <Layout>
      <View style={{ width: "80%", alignSelf: "center", marginTop: "10%" }}>
        <Section title="Quick Quote">
          <QuickQuoteForm />
        </Section>
      </View>
    </Layout>
  )
}

export default QuickQuotePage
