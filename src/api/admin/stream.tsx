import axios from "axios"
import config from "../config/headers"

const getStreamList = async () => {
    const streamResponse = axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/admin/streamList', null, config)
    return streamResponse
}

export {
    getStreamList
}