import { QuickQuoteFormType } from "./reducer"

const actionTypes = {
  SET_QUICK_QUOTE_FORM: "SET_QUICK_QUOTE_FORM"
}

export const addUserRole = (data: QuickQuoteFormType) => ({
  type: actionTypes.SET_QUICK_QUOTE_FORM,
  payload: {
    data
  }
})

export default actionTypes
