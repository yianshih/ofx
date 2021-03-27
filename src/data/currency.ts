/**
 * @param key: Value for searching
 * @param desc: Currency description
 */
export interface CurrencyType {
  key: string
  desc: string
}
export const CURRENCIES: CurrencyType[] = [
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
