import { QuickQuoteFormType } from "./reducer"

const actionTypes = {
  SET_QUICK_QUOTE_FORM: "SET_QUICK_QUOTE_FORM"
}

/**
 * Function to set Quick Quote form data
 * @param data Quick Quote form data
 */
export const setQuickQuoteForm = (data: QuickQuoteFormType) => ({
  type: actionTypes.SET_QUICK_QUOTE_FORM,
  payload: {
    data
  }
})

export default actionTypes
