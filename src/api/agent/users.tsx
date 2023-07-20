import axios from "axios"
import config from "../config/headers" 

interface betResponseModel {
    responseMessage: string,
}
const fetchUser = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/agent/users', {
          withCredentials: true,
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
        })
        // console.log('return',response.data)
        return response.data
    } catch(err) {
      console.log(err)
    }
}

export default fetchUser
// export {
//     fetchUser
// }