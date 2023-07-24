import axios from "axios";
import config from "../config/headers";

const currentGame = async () => {
    const gameResponse = axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/sabong/current', null, config)
    return gameResponse
}
const getStream = async () => {
    const streamResponse = axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/sabong/stream', null, config)
    return streamResponse
}
const getExpFights = async () => {
    const fightsResponse = axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/sabong/expFights', config)
    return fightsResponse
}
const getGameTrends = async () => {
    const trendsResponse = axios.get(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/sabong/trends', config)
    return trendsResponse
}

export {
    currentGame,
    getStream,
    getExpFights,
    getGameTrends
}