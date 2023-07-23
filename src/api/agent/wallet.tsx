import axios from "axios"
import config from "../config/headers"
import { fetchUser } from "../bettor/auth"

interface ResponseModel {
    responseMessage: string,
}
const transferWalletApi = async (data: any): Promise<string | any> => { 
    const tokenResponse = await fetchUser() 
    let userDetails = null
    if (tokenResponse !== undefined) {
        userDetails = tokenResponse;
    } 
    // else {
        
    //     alert('Invalid account details')
    //     return "Invalid account details";
    // }
    const transferResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agent/transfer', {
        transactionDetails: data.transactionDetails,
        amount:  data.amount,
        password: data.password,
        requestee: data.requestee,
        type: data.type
    }, config) 
    return transferResponse 
}

const getWalletSummary = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agent/getWalletSummary', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      // console.log('return',response.data)
      return response.data
    } catch (err) {
      console.log(err)
    }
}
const getEarnings = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agent/earnings', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      // console.log('return',response.data)
      return response.data
    } catch (err) {
      console.log(err)
    }
}



export {
    transferWalletApi,
    getWalletSummary,
    getEarnings
}