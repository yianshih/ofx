import {
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Select,
  SelectProps
} from "antd"
import React from "react"
import { Controller, ControllerRenderProps, FieldError } from "react-hook-form"
import { RegisterOptions } from "react-hook-form/dist/types/index"
import { StyleSheet } from "../../../types"
import { lightGrey, red } from "../../constant/colors"
import Text from "../Text"
import View from "../View"

export type FormInputType = "input" | "select" | "inputNumber"

export type FormInputProps = {
  name: string
  control: any
  children?: any
  style?: React.CSSProperties
  containerStyle?: React.CSSProperties
  isRequired?: boolean
  inputType?: FormInputType
  label?: string
  rules?: RegisterOptions
  error?: FieldError
  onChangeText?: (value: any) => void
  defaultValue?: string | null | number
  placeholder?: string
  inputProps?: Partial<InputProps>
  selectProps?: Partial<SelectProps<any>>
  inputNumberProps?: Partial<InputNumberProps>
  renderValue?: (value: string) => any
}

const FormInput: React.FC<FormInputProps> = ({
  inputType = "input",
  error,
  label,
  style,
  containerStyle,
  isRequired,
  defaultValue,
  onChangeText,
  placeholder,
  inputProps,
  inputNumberProps,
  selectProps,
  renderValue,
  children,
  ...conrollerProps
}) => {
  const renderContent = ({
    onChange,
    value,
    ref
  }: ControllerRenderProps): JSX.Element | null => {
    switch (inputType) {
      case "input":
        return (
          <Input
            ref={ref}
            placeholder={placeholder}
            value={renderValue ? renderValue(value) : value}
            onChange={(e) => {
              onChange(e)
              onChangeText && onChangeText(e)
            }}
            style={{
              ...(error ? styles.inputError : {}),
              ...style
            }}
            {...inputProps}
          />
        )
      case "select":
        return (
          <Select
            showSearch
            style={{
              ...(error ? styles.inputError : {}),
              ...style
            }}
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={(value, option) => {
              onChange(value)
              onChangeText && onChangeText(value)
            }}
            // value={value}
            filterOption={(input, option) =>
              option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...selectProps}
          >
            {children}
          </Select>
        )
      case "inputNumber":
        return (
          <InputNumber
            ref={ref}
            defaultValue={defaultValue || ""}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            style={{
              ...(error ? styles.inputError : {}),
              ...style
            }}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "") || ""}
            onChange={(value) => {
              onChange(value)
              onChangeText && onChangeText(value)
            }}
            {...inputNumberProps}
          />
        )
      default:
        return null
    }
  }
  return (
    <Controller
      {...conrollerProps}
      defaultValue={defaultValue}
      render={({
        onChange,
        value,
        ref,
        onBlur,
        name
      }: ControllerRenderProps) => (
        <View style={{ ...styles.container, ...containerStyle }}>
          {label ? (
            <View style={styles.labelContainer}>
              {label}
              {isRequired && <Text style={styles.requiredStar}>*</Text>}
            </View>
          ) : null}
          {renderContent({ onChange, value, ref, onBlur, name })}
          {error?.message ? (
            <Text style={styles.errorMessage}>{error?.message}</Text>
          ) : null}
        </View>
      )}
    />
  )
}

const styles: StyleSheet = {
  container: {
    flex: 1,
    minWidth: "150px",
    marginTop: "10px",
    marginBottom: "10px"
    //marginRight: "20px"
  },
  labelContainer: {
    position: "relative",
    alignSelf: "flex-start",
    fontSize: "12px",
    lineHeight: "12px",
    color: lightGrey,
    marginBottom: "5px"
  },
  inputError: {
    border: `1px solid ${red}`
  },
  errorMessage: {
    color: red,
    fontSize: "12px",
    marginTop: "2px"
  },
  requiredStar: {
    position: "absolute",
    top: "-5px",
    right: "-15px",
    color: red,
    fontSize: "25px"
  }
}

export default FormInput
