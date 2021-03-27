import { CurrencyType } from "./src/data/currency"

export interface Action {
  type: string
  payload?: any
  error?: Error | null
}

export interface StyleSheet {
  [fieldName: string]: React.CSSProperties
}

export interface QuoteResponseType {
  fromCurrency: CurrencyType | null
  toCurrency: CurrencyType | null
  amount: number | null
  ComparisonAmount: number | null | undefined
  ComparisonRate: number | null | undefined
  CustomerAmount: number | null | undefined
  CustomerRate: number | null | undefined
  CustomerRateInverse: number | null | undefined
  DefaultFee: number | null | undefined
  DeliveryCountry: string | null | undefined
  DeliveryTime: number | null | undefined
  Fee: number | null | undefined
  FeeFreeThreshold: number | null | undefined
  InterbankAmount: number | null | undefined
  InterbankRate: number | null | undefined
  InverseInterbankRate: number | null | undefined
  Message: string | null | undefined
}
