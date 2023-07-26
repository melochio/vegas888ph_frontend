import axios from "axios"
import config from "../config/headers"

interface betResponseModel {
  responseMessage: string,
}
const fetchUser = async (userType: string[],status:string) => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/fetchUser', {
      withCredentials: true,
      params:{
        userType:userType,
        status:status
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
const createUser = async (data: any): Promise<string | any> => { 
  const tokenResponse = await fetchUser(['bettor'],'active') 
  let userDetails = null
  if (tokenResponse !== undefined) {
      userDetails = tokenResponse;
  } 
  // else {
      
  //     alert('Invalid account details')
  //     return "Invalid account details";
  // }
  const transferResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/register', { 
      name:  data.name,
      player_name: data.player_name,
      email: data.email,
      user_level: data.user_level,
      password: data.password, 
      commission: data.commission,
      bday: data.bday, 
      isActive: data.isActive, 
  }, config) 
  return transferResponse 
}
const updateUser = async (data: any): Promise<string | any> => { 
  const tokenResponse = await fetchUser(['bettor'],'active') 
  let userDetails = null
  if (tokenResponse !== undefined) {
      userDetails = tokenResponse;
  } 
  // else {
      
  //     alert('Invalid account details')
  //     return "Invalid account details";
  // }
  const transferResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/updateUser', { 
      name:  data.name,
      player_name: data.player_name,
      email: data.email,
      mobileNo: data.mobileNo, 
  }, config) 
  return transferResponse 
}
const changePassword = async (data: any): Promise<string | any> => { 
  const tokenResponse = await fetchUser(['bettor'],'active') 
  let userDetails = null
  if (tokenResponse !== undefined) {
      userDetails = tokenResponse;
  } 
  else { 
      return "Invalid account details";
  }
  const changePassword = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/changePassword', { 
      currentPassword:  data.currentPassword,
      newPassword: data.newPassword
  }, config) 
  return changePassword 
}
const deactivateUser = async (id: number | string) => {
  try {
    const responseData = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/deactivateUserById', { 
      userId:id 
    }, config)
    console.log('return',responseData.data) 
  } catch (err) {
    console.log(err)
  } 
}
const activateUser = async (id: number | string) => {
  try {
    const responseData = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/approvedUserById', { 
      userId:id 
    }, config)
    console.log('return',responseData.data) 
  } catch (err) {
    console.log(err)
  } 
}
const updateCommissionUser = async (id: string  | any ,commission:any) => {
  try { 
    const responseData = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/updateCommission', { 
      userId:id,
      commission:commission 
    }, config)  
    return responseData
  } catch (err) {
    console.log(err)
  } 
}
// export default fetchUser
export {
  fetchUser,
  createUser,
  deactivateUser,
  activateUser,
  updateUser,
  changePassword,
  updateCommissionUser
}