import axios from "axios"
import config from "../config/headers"

interface betResponseModel {
  responseMessage: string,
}
const fetchUser = async (userType: string[]) => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agentUser/fetchUser', {
      withCredentials: true,
      params:{
        userType:userType
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
  const tokenResponse = await fetchUser(['bettor']) 
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
  }, config) 
  return transferResponse 
}

// export default fetchUser
export {
  fetchUser,
  createUser
}