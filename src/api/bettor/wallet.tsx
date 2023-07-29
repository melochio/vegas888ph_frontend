import axios from "axios"
import config from "../config/headers"
import Swal from "sweetalert2"
import { Model_Withdrawal } from "@/models/wallet"

const RequestWithdrawal = async (FormData: Model_Withdrawal) => {
    try {
        const response = axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/wallet/withdraw', FormData, config)
        return response
    } catch {
    }
}
const GetMyBalance = async () => {
    try {
        const response = axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/wallet/balance', config)
        return response
    } catch{}
}
const TransactionList = async () => {
    try {
        const response = axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/wallet/transaction_history', config)
        return response
    } catch{}
}

export {
    RequestWithdrawal,
    GetMyBalance,
    TransactionList
}