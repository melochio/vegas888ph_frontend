import axios from "axios"
import config from "../config/headers"

interface betResponseModel {
  responseMessage: string,
}
const fetchEvent = async () => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/adminEvent/fetchEvent', {
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
const createEvent = async (data: any): Promise<string | any> => {
  const transferResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/adminEvent/register', {
    eventName: data.eventName,
    eventDetails: data.eventDetails,
    plasadaPercent: data.plasadaPercent,
    status: data.status,
    openDate: data.openDate,
    closeDate: data.closeDate
  }, config)
  return transferResponse
}

// export default fetchUser
export {
  fetchEvent,
  createEvent
}