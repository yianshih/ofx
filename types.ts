export interface Action {
  type: string
  payload?: any
  error?: Error | null
}

export interface StyleSheet {
  [fieldName: string]: React.CSSProperties
}
