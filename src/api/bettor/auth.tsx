import axios from "axios"
import config from "../config/headers"
import Model_User from "@/models/users"

const register = async (formData: Model_User):Promise<any> => {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/users', formData, config)
    .catch((err) => {
        return err.response
    })
    return response
}
const login = async (formData: Model_User):Promise<any> => {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/users', formData, config)
    .catch((err) => {
        return err.response
    })
    return response
}

export {
    register
}