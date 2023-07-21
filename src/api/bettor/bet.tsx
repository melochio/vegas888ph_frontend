import axios from "axios"
import config from "../config/headers"
import { fetchUser } from "./auth"

interface betResponseModel {
    responseMessage: string,
}
const bet_api = async (gameCode: string, side: string, amount: string):Promise<string | any> => {
    const userResponse = await fetchUser()
    let userDetails = null
    if (userResponse !== undefined) {
        userDetails = userResponse;
    } else {
        return "Invalid account details";
    }
    
    const betResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/sabong/bet', {
        gameCode: gameCode,
        side: side,
        amount: amount,
    }, config)
    if (betResponse !== undefined) {
        
    } else {
        return "success"
    }
}

export {
    bet_api
}