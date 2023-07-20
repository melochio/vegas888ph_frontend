import axios from "axios"
import config from "../config/headers"

const updateGameResult = async (id: string, status: string) => {
    const streamResponse = axios.put(process.env.NEXT_PUBLIC_API_URL+'/api/declarator/sabong/updateGameResult', {id: id, result: status}, config)
    return streamResponse
}

export {
    updateGameResult
}