import axios from "axios"
import config from "../config/headers"
import { fetchUser } from "../bettor/auth"
import { Model_Withdrawal } from "@/models/wallet"

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
  console.log(data)
  const transferResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agent/transfer', data, config)
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
// const getWalletHistory = async (userType: string[]) => {
//   try {
//     const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agent/getMyWalletHistory', {
//       withCredentials: true,
//       params: {
//         userType: userType
//       },
//       headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       }
//     })
//     // console.log('return',response.data)
//     return response.data
//   } catch (err) {
//     console.log(err)
//   }
// }

const getRequestWithdrawal = async (userType: string[]) => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agent/getRequestWithdrawal', {
      withCredentials: true,
      params: {
        userType: userType
      },
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
const RequestWithdrawal = async (data: any): Promise<string | any> => {
  try {
      const responseData = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agent/withdrawUserRequest', { 
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phoneNo: data.phoneNo,
        request_amount: data.request_amount,
        transaction_type: data.transaction_type,
        address: data.address,
        status: 'REQUEST'
      }, config)
      return responseData
  } catch {
  }
}

const approvedRequestWithdrawal = async (data: any): Promise<string | any> => {
  try {
    const Response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agent/approvedRequestWithdrawal', {
      requestId: data.requestId,
      requesteeId: data.requesteeId,
      amount: data.amount
    }, config)
    return Response 
  } catch (err) {
    console.log(err)
  }
}
const declineWithdrawRequest = async (data: any): Promise<string | any> => {
  try {
    const Response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agent/declineWithdrawRequest', {
      requestId: data.requestId,
      requesteeId: data.requesteeId,
      amount: data.amount
    }, config)
    return Response 
  } catch (err) {
    console.log(err)
  }
}


const getWithdrawalHistory = async () => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agent/getWithdrawalHistory', {
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

const getWalletHistory = async () => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agent/getWalletHistory', {
      withCredentials: true, 
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }) 
    return response.data
  } catch (err) {
    console.log(err)
  }
}





export {
  transferWalletApi,
  getWalletSummary,
  getEarnings,
  getWalletHistory,
  getRequestWithdrawal,
  approvedRequestWithdrawal,
  declineWithdrawRequest,
  RequestWithdrawal,
  getWithdrawalHistory
}