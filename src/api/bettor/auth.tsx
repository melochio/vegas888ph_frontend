import axios from "axios"
import config from "../config/headers"
import Model_User, {UserModel_Hidden} from "@/models/users"

const register = async (formData: Model_User):Promise<any> => {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/users', formData, config)
    .catch((err) => {
        return err.response
    })
    return response
}
const login = async (formData: Model_User) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/login', formData, config);
        if(response !== undefined) {
            const tokenResponse = response.data
            return tokenResponse
        }
    } catch {
    }
}
const logout = async () => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/logout', null, config);
        return response
    } catch {
    }
}

const fetchUser = async () => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/tokenValue',null, config)
        const userResponse : UserModel_Hidden = response.data
        return userResponse
    } catch(err) {
    }
}
export {
    register,
    fetchUser,
    login,
    logout
}