import Axios from "axios"

const JWT_TOKEN_NAME = "jwtToken"


/** 
 * Setting User Token
 * @param token 
 */
export const setToken = async (token: any) => {
  try {
    // await AsyncStorage.setItem(JWT_TOKEN_NAME, token)
  } catch (error) {
    console.log("setToken error : ", error)
  }
}

/**
 * Retrieve token from localStorage in the future
 */
export const getToken = async () => {
  // const token = await AsyncStorage.getItem(JWT_TOKEN_NAME)
  const token = ""
  return `Bearer ${token}`
}

export const post = async (url: string, data: any) => {
  const token = await getToken()
  return Axios({
    method: "POST",
    url: url,
    headers: { authorization: token },
    data: data
  })
}

export const axiosDelete = async (url: string) => {
  const token = await getToken()
  return Axios({
    method: "DELETE",
    url: url,
    headers: { authorization: token }
  })
}

export const get = async (url: string) => {
  const token = await getToken()
  return Axios({
    method: "GET",
    url: url,
    headers: { authorization: token }
  })
}
