import { useState } from "react"
import { INDIVIDUAL_RATE_API_URL } from "../config/apis"
import { CurrencyType } from "../data/currency"
import { get } from "../utils/Axios"
import { QuoteResponseType } from "../../types"
import {
  hideLoading,
  showLoading
} from "../HOC/LoadingProvider/LoadingProvider"

export const useQuote = () => {
  const [data, setData] = useState<QuoteResponseType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const reset = () => {
    setData(null)
    setLoading(false)
    setError(false)
  }
  const quickQuote = async (
    from: CurrencyType | null,
    to: CurrencyType | null,
    amount: number | null,
    cb?: (data: QuoteResponseType) => void,
    onError?: () => void
  ) => {
    setLoading(true)
    showLoading()
    const res = await get(
      `${INDIVIDUAL_RATE_API_URL}/${from}/${to}/${amount}?format=json`
    )
    setLoading(false)
    hideLoading()
    const resData: QuoteResponseType = res?.data
    if (resData && res?.status === 200) {
      setData({
        ...resData,
        fromCurrency: from,
        toCurrency: to,
        amount
      })
      cb && cb(resData)
    } else {
      setError("Failed")
      onError && onError()
    }
  }

  return { quickQuote, reset, data, loading, error }
}
