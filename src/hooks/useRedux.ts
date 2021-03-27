import { useSelector } from "react-redux"
import { QuickQuoteState } from "../redux/QuickQuote/reducer"

/**
 * Return Quick Quote Redux data
 */
export const useQuickQuoteRedux = () => {
  const state: QuickQuoteState = useSelector((state: any) => state?.QuickQuote)
  return state
}
