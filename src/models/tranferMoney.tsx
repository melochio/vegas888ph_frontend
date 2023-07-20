interface Model_tranferMoney { 
    receiverId: number | any,
    amount: number | any, 
} 
const initialUser: Model_tranferMoney = { 
    receiverId: '',
    amount: 0, 
}
export default Model_tranferMoney

export type {
    Model_tranferMoney
}

export {
    initialUser
}