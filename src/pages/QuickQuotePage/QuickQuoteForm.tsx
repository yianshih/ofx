import { Select } from "antd"
import React, { useEffect } from "react"
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

  const { quickQuote, data, reset, error } = useQuote()

  useEffect(() => {
    if (error) {
      showWarning({
        title: "Error",
        content: (
          <Text style={{ color: red }}>{errorMessages?.requestFailed}</Text>
        )
      })
    }
  }, [error])

  const getQuote = (data: QuickQuoteFormType) => {
    /**
     * Avoiding selcted two same Currencies
     */
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
    /**
     * Fetching Quote data
     */
    quickQuote(data?.fromCurrency, data?.toCurrency, data?.amount)
    /**
     * Store form data to redux
     */
    dispatch(setQuickQuoteForm({ ...data }))
  }

  /**
   * Return Common Props for FormInput
   * @param key Input field
   */
  const getCommonProps = (key: keyof QuickQuoteFormType): FormInputProps => ({
    
    control: control,
    error: errors[key],
    ...quickQuoteConfig[key]
  })

  /**
   * Render Quick Quote result after data is fetched
   */
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
              >
                {CURRENCIES.map((currency) => (
                  <Option
                    id={`${item}_${currency?.key}`}
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
              style={{ width: "50%" }}
              defaultValue={reduxForm?.amount || DEFAULT_AMOUNT}
            />
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <QuoteButton
          id="submitButton"
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
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
}
export default QuickQuoteForm
