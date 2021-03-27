import { useSelector } from "react-redux"
import { QuickQuoteState } from "../redux/QuickQuote/reducer"

export const useQuickQuote = () => {
  const state: QuickQuoteState = useSelector((state: any) => state?.QuickQuote)
  return state
}
