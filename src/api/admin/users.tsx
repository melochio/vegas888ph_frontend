import axios from "axios"
import config from "../config/headers"

const createUser = async (inputEmail: string, inputPassword: string) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/admin/createuser', {email: inputEmail, password: inputPassword}, config)
      // console.log('return',response.data)
      return response.data
    } catch (err) {
        return undefined
    }
}
const hashString = async (inputString: string) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/hashString', {input: inputString}, config)
      // console.log('return',response.data)
      return response.data
    } catch (err) {
        return undefined
    }
}

export {
    createUser,
    hashString
}