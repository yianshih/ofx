import { Select } from "antd"
import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { StyleSheet } from "../../../types"
import FormInput, { FormInputProps } from "../../components/Form/FormInput"
import QuoteButton from "../../components/QuickQuote/QuoteButton"
import Sheet from "../../components/Sheet"
import Text from "../../components/Text"
import View from "../../components/View"
import { red } from "../../constant/colors"
import { errorMessages } from "../../constant/errorMessages"
import { CURRENCIES } from "../../data/currency"
import { showWarning } from "../../HOC/WarningProvider/WarningProvider"
import { useQuote } from "../../hooks/useQuote"
import {
  QuickQuoteFormFieldType,
  QuickQuoteFormType
} from "../../redux/QuickQuote/reducer"
import { quickQuoteConfig } from "./QuickFormConfig"
import QuickQuoteResult from "./QuickQuoteResult"
import { setQuickQuoteForm } from "../../redux/QuickQuote/actions"
import { useQuickQuoteRedux } from "../../hooks/useRedux"

const { Option } = Select

const DEFAULT_AMOUNT: number = 1000

const QuickQuoteForm: React.FC = () => {
  const dispatch = useDispatch()
  const { formData: reduxForm } = useQuickQuoteRedux()
  const {
    control,
    errors,
    setError,
    handleSubmit
  } = useForm<QuickQuoteFormType>({
    mode: "onChange"
  })

  const { quickQuote, data, reset } = useQuote()

  const getQuote = (data: QuickQuoteFormType) => {
    if (data?.fromCurrency === data?.toCurrency) {
      setError("toCurrency", {
        shouldFocus: true,
        message: errorMessages?.sameCurrencyError
      })
      return showWarning({
        title: "Error",
        content: (
          <Text style={{ fontSize: "14px", color: red }}>
            {errorMessages?.sameCurrencyError}
          </Text>
        )
      })
    }
    quickQuote(data?.fromCurrency, data?.toCurrency, data?.amount)
    dispatch(setQuickQuoteForm({ ...data }))
  }

  const getCommonProps = (key: keyof QuickQuoteFormType): FormInputProps => ({
    control: control,
    error: errors[key],
    ...quickQuoteConfig[key]
  })

  if (data) {
    return (
      <QuickQuoteResult
        data={{
          rate: data?.CustomerRate || null,
          fromCurrency: {
            type: data?.fromCurrency,
            amount: data?.amount
          },
          toCurrency: {
            type: data?.toCurrency,
            amount: data?.CustomerAmount || null
          }
        }}
        onRestart={() => reset()}
      />
    )
  }

  return (
    <Sheet style={styles.sheet}>
      <View style={styles.container}>
        {(["firstName", "lastName"] as QuickQuoteFormFieldType[]).map(
          (item, index) => (
            <View
              style={{ flex: 1, marginRight: index ? "0px" : "20px" }}
              key={item}
            >
              <FormInput
                {...getCommonProps(item)}
                defaultValue={reduxForm[item]}
              />
            </View>
          )
        )}
        <View style={{ width: "100%" }}>
          <FormInput
            {...getCommonProps("email")}
            defaultValue={reduxForm?.email}
          />
        </View>
        <View style={{ width: "100%" }}>
          <FormInput
            {...getCommonProps("phone")}
            defaultValue={reduxForm?.phone}
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
              <FormInput
                {...getCommonProps(item)}
                defaultValue={reduxForm[item]}
                selectProps={{ defaultValue: reduxForm[item] }}
              >
                {CURRENCIES.map((currency) => (
                  <Option
                    key={currency?.key}
                    value={currency?.key}
                  >{`${currency?.key} - ${currency?.desc}`}</Option>
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
              defaultValue={reduxForm?.amount || DEFAULT_AMOUNT}
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
