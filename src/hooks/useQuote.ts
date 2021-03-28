import { useState } from "react"
import { INDIVIDUAL_RATE_API_URL } from "../config/apis"
import { CurrencyType } from "../data/currency"
import { get } from "../utils/Axios"
import { QuoteResponseType } from "../../types"
import {
  hideLoading,
  showLoading
} from "../HOC/LoadingProvider/LoadingProvider"

/**
 * useQuote - Hook for fetching Quote data
 */
export const useQuote = () => {
  const [data, setData] = useState<QuoteResponseType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  /**
   * Reset Quote state
   */
  const reset = () => {
    setData(null)
    setLoading(false)
    setError(false)
  }

  /**
   *
   * @param from Currency to exchange from
   * @param to Currency to exchange to
   * @param amount Amount to exchange
   * @param cb Callback function after fetch quote
   * @param onError  Error function to handle fetch error
   */
  const quickQuote = async (
    from: CurrencyType | null,
    to: CurrencyType | null,
    amount: number | null,
    cb?: (data: QuoteResponseType) => void,
    onError?: () => void
  ) => {
    reset()
    setLoading(true)
    showLoading()
    try {
      const res = await get(
        `${INDIVIDUAL_RATE_API_URL}/${from}/${to}/${amount}?format=json`
      ).finally(() => {
        hideLoading()
        setLoading(false)
      })

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
    } catch (error) {
      setError("Failed")
      onError && onError()
    }
  }

  return { quickQuote, reset, data, loading, error }
}
