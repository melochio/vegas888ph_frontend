interface Wallet_Model {
    id: string,
    userId: string,
    amount: string,
    type: string,
    sentTo: string,
    receivedFrom: string,
    gameCode: string,
    gameId: string,
}
const initialWalletValue: Wallet_Model = {
    id: '',
    userId: '',
    amount: '',
    type: '',
    sentTo: '',
    receivedFrom: '',
    gameCode: '',
    gameId: '',
}
interface Model_Withdrawal {
    id: string | any,
    status: string | any,
    userId: string | any,
    firstName: string | any,
    middleName: string | any,
    lastName: string | any,
    email: string | any,
    phoneNo: string | any,
    request_amount: string | any,
    approvedById: string | any,
}
const initialWithdrawalValue: Model_Withdrawal = {
    id: '',
    status: '',
    userId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    request_amount: '',
    approvedById: '',
}

export default Wallet_Model;

export type {
    Model_Withdrawal
}

export {
    initialWalletValue,
    initialWithdrawalValue
}