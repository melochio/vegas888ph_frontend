// 'requesteeId' => 'required',
// 'amount' => 'required',
// 'type' => 'required'  
interface Model_tranferMoney { 
    requestee: number | any,
    amount: number, 
    transactionDetails: string | any, 
    type: string | any,
    password: string | any
} 
const initialUser: Model_tranferMoney = {
    requestee: '',
    amount: 0,
    transactionDetails: '',
    type: '',
    password: ''
}
export default Model_tranferMoney

export type {
    Model_tranferMoney
}

export {
    initialUser
}