import React from "react"
import { StyleSheet } from "../../../types"
import QuoteButton from "../../components/QuickQuote/QuoteButton"
import Sheet from "../../components/Sheet"
import Text from "../../components/Text"
import View from "../../components/View"
import { blue } from "../../constant/colors"
import { CurrencyType } from "../../data/currency"
import NumberFormat from "react-number-format"

export type ResultCurrencyType = {
  type: CurrencyType | null
  amount: number | null
}

export interface ResultDataType {
  rate: number | null
  fromCurrency: ResultCurrencyType
  toCurrency: ResultCurrencyType
}

export interface QuickQuoteResultProps {
  data: ResultDataType
  onRestart?: () => void
}

const QuickQuoteResult: React.FC<QuickQuoteResultProps> = ({
  data,
  onRestart
}) => {
  const renderAmount = (label: string, currency: ResultCurrencyType) => (
    <View style={{ flexWrap: "wrap" }}>
      <Text style={styles.titleText}>{label}</Text>
      <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row",alignItems:"center" }}>
        <Text style={styles.currencyText}>{currency?.type}</Text>
        <NumberFormat
          displayType="text"
          value={currency?.amount}
          thousandSeparator
          renderText={(value) => <Text style={styles.amountText}>{value}</Text>}
        />
      </View>
    </View>
  )
  return (
    <Sheet style={styles.sheet}>
      <Text style={styles.titleText}>OFX Customer Rate</Text>
      <Text style={styles.rateText}>{data?.rate}</Text>
      <View>
        {renderAmount("From", {
          type: data?.fromCurrency?.type,
          amount: data?.fromCurrency?.amount
        })}
        {renderAmount("To", {
          type: data?.toCurrency?.type,
          amount: data?.toCurrency?.amount
        })}
      </View>
      {onRestart ? (
        <QuoteButton style={{ width: "150px" }} onClick={() => onRestart()}>
          START NEW QUOTE
        </QuoteButton>
      ) : null}
    </Sheet>
  )
}

const styles: StyleSheet = {
  sheet: {
    backgroundColor: "#efefef",
    alignItems: "center",
    minWidth: "200px",
    flexWrap: "wrap",
    display: "flex"
  },
  rateText: {
    color: "#2ebd95",
    fontSize: "5vw"
  },
  titleText: {
    fontSize: "3vw",
    color: "#686868"
  },
  amountText: {
    fontSize: "4vw",
    color: blue
  },
  currencyText: {
    fontSize: "3vw",
    marginRight: "10px"
  }
}

export default QuickQuoteResult
