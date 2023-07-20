import axios from "axios"
import config from "../config/headers"
import { fetchUser } from "../bettor/auth"

interface betResponseModel {
    responseMessage: string,
}
const transferWalletApi = async (data:any):Promise<string | any> => { 
    console.log('data',data)
    const tokenResponse = await fetchUser()
    let userDetails = null
    if (tokenResponse !== undefined) {
        userDetails = tokenResponse;
    } else {
        return "Invalid account details";
    }
    
    const transferResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/agent/transfer', {
        receiverId: data.receiverId,
        amount: data.amount, 
    }, config)
    if (transferResponse !== undefined) {
        
    } else {
        return "success"
    }
}

export {
    transferWalletApi
}