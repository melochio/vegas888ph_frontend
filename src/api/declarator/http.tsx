import axios from "axios"
import config from "../config/headers"

const updateGameResult = async (id: string, status: string) => {
    const streamResponse = axios.put(process.env.NEXT_PUBLIC_API_URL+'/api/declarator/sabong/updateGameResult', {id: id, result: status}, config)
    return streamResponse
}
const gameList = async () => {
    const gameListResponse = axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/declarator/sabong/gamelist', config)
    return gameListResponse
}

export {
    updateGameResult,
    gameList
}