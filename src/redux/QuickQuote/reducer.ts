import actionTypes from "./actions"
import { Action } from "../../../types"
import { CurrencyType } from "../../data/currency"

export type QuickQuoteFormFieldType = keyof QuickQuoteFormType
export interface QuickQuoteFormType {
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  fromCurrency: CurrencyType | null
  toCurrency: CurrencyType | null
  amount: number | null
}

export interface QuickQuoteState {
  formData: QuickQuoteFormType
}

const initialState: QuickQuoteState = {
  formData: {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    fromCurrency: null,
    toCurrency: null,
    amount: null
  }
}

export default function QuickQuote(
  state = initialState,
  { type, ...action }: Action
): QuickQuoteState {
  switch (type) {
    case actionTypes.SET_QUICK_QUOTE_FORM:
      return {
        ...state,
        formData: {
          ...state?.formData,
          ...action?.payload?.data
        }
      }
    default:
      return state
  }
}
