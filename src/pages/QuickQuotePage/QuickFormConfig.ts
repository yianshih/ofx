import { RegisterOptions } from "react-hook-form"
import { FormInputProps, FormInputType } from "../../components/Form/FormInput"
import { errorMessages } from "../../constant/errorMessages"
import {
  EMAIL_REGEX,
  FLOAT_NUMBER_REGEX,
  INTEGER_REGEX
} from "../../constant/regex"
import { QuickQuoteFormType } from "../../redux/QuickQuote/reducer"

interface ConfigFieldType extends Omit<FormInputProps, "control"> {
  name: keyof QuickQuoteFormType
  label?: string | undefined
  rules?: RegisterOptions
  inputType?: FormInputType
}

interface ConfigType {
  firstName: ConfigFieldType
  lastName: ConfigFieldType
  email: ConfigFieldType
  phone: ConfigFieldType
  fromCurrency: ConfigFieldType
  toCurrency: ConfigFieldType
  amount: ConfigFieldType
}

export const quickQuoteConfig: ConfigType = {
  firstName: {
    isRequired: true,
    name: "firstName",
    label: "First Name",
    rules: {
      required: errorMessages.thisFieldIsRequired
    },
    placeholder: "First Name"
  },
  lastName: {
    isRequired: true,
    name: "lastName",
    label: "Last Name",
    rules: {
      required: errorMessages.thisFieldIsRequired
    },
    placeholder: "Last Name"
  },
  email: {
    name: "email",
    label: "Email",
    rules: {
      pattern: {
        value: EMAIL_REGEX,
        message: errorMessages.invalidEmail
      }
    },
    placeholder: "Email"
  },
  phone: {
    name: "phone",
    label: "Telephone / Mobile",
    rules: {
      pattern: {
        value: INTEGER_REGEX,
        message: errorMessages.pleaseEnterNumber
      }
    },
    placeholder: "Telephone / Mobile"
  },
  fromCurrency: {
    isRequired: true,
    name: "fromCurrency",
    label: "From Currency",
    rules: {
      required: errorMessages.thisFieldIsRequired
    },
    placeholder: "From Currency",
    inputType: "select"
  },
  toCurrency: {
    isRequired: true,
    name: "toCurrency",
    label: "To Currency",
    rules: {
      required: errorMessages.thisFieldIsRequired
    },
    placeholder: "To Currency",
    inputType: "select"
  },
  amount: {
    isRequired: true,
    name: "amount",
    label: "Amount",
    rules: {
      required: errorMessages.thisFieldIsRequired,
      pattern: {
        value: FLOAT_NUMBER_REGEX,
        message: errorMessages.pleaseEnterNumber
      }
    },
    placeholder: "Amount"
  }
}
