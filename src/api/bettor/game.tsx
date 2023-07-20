import axios from "axios";
import config from "../config/headers";
import Game_Model from "@/models/game";

const currentGame = async () => {
    const gameResponse = axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/sabong/current', null, config)
    return gameResponse
}
const getStream = async () => {
    const streamResponse = axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/bettor/sabong/stream', null, config)
    return streamResponse
}

export {
    currentGame,
    getStream
}