import { Select } from "antd"
import React from "react"
import { useForm } from "react-hook-form"
import { StyleSheet } from "../../../types"
import FormInput, { FormInputProps } from "../../components/Form/FormInput"
import QuoteButton from "../../components/QuickQuote/QuoteButton"
import Sheet from "../../components/Sheet"
import View from "../../components/View"
import { CURRENCIES } from "../../data/currency"
import {
  QuickQuoteFormFieldType,
  QuickQuoteFormType
} from "../../redux/QuickQuote/reducer"
import { quickQuoteConfig } from "./QuickFormConfig"

const { Option } = Select

const DEFAULT_AMOUNT: number = 1000

const QuickQuoteForm = () => {
  const {
    control,
    errors,
    setValue,
    handleSubmit
  } = useForm<QuickQuoteFormType>({
    mode: "onChange"
  })

  const getQuote = (data: QuickQuoteFormType) => {
    console.log("data : ", data)
  }

  const getCommonProps = (key: keyof QuickQuoteFormType): FormInputProps => ({
    control: control,
    error: errors[key],
    ...quickQuoteConfig[key]
  })

  return (
    <Sheet style={styles.sheet}>
      <View style={styles.container}>
        {(["firstName", "lastName"] as QuickQuoteFormFieldType[]).map(
          (item, index) => (
            <View
              style={{ flex: 1, marginRight: index ? "0px" : "20px" }}
              key={item}
            >
              <FormInput {...getCommonProps(item)} />
            </View>
          )
        )}
        <View style={{ width: "100%" }}>
          <FormInput {...getCommonProps("email")} />
        </View>
        <View style={{ width: "100%" }}>
          <FormInput
            {...getCommonProps("phone")}
            inputProps={{
              addonBefore: (
                <Select defaultValue="+61" className="select-before">
                  <Option value="+61">+61</Option>
                  <Option value="+886">+886</Option>
                </Select>
              )
            }}
          />
        </View>

        {(["fromCurrency", "toCurrency"] as QuickQuoteFormFieldType[]).map(
          (item, index) => (
            <View
              style={{ flex: 1, marginRight: index ? "0px" : "20px" }}
              key={item}
            >
              <FormInput {...getCommonProps(item)}>
                {CURRENCIES.map((currency) => (
                  <Option
                    key={currency?.key}
                    value={currency?.key}
                  >{`${currency?.key} ${currency?.desc}`}</Option>
                ))}
              </FormInput>
            </View>
          )
        )}
        <View style={{ width: "100%" }}>
          <View style={{ flex: 1 }}>
            <FormInput
              {...getCommonProps("amount")}
              inputType="inputNumber"
              defaultValue={DEFAULT_AMOUNT}
            />
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <QuoteButton
          style={{ width: "150px" }}
          onClick={handleSubmit(getQuote)}
        >
          GET QUOTE
        </QuoteButton>
      </View>
    </Sheet>
  )
}

const styles: StyleSheet = {
  sheet: {
    minWidth: "200px",
    flexWrap: "wrap",
    display: "flex"
    //paddingRight: "20px"
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
}
export default QuickQuoteForm
