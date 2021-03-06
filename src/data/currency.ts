export type CurrencyType = "AUD" | "EUR" | "GBP" | "JPY" | "USD"

/**
 * @key Value for searching
 * @desc Currency description
 */
export interface CurrencyDataType {
  key: CurrencyType
  desc: string
}
export const CURRENCIES: CurrencyDataType[] = [
  {
    key: "AUD",
    desc: "Australian Dollar"
  },
  {
    key: "EUR",
    desc: "Euro"
  },
  {
    key: "GBP",
    desc: "British Pound"
  },
  {
    key: "JPY",
    desc: "Japanese Yen"
  },
  {
    key: "USD",
    desc: "US Dollar"
  }
]
