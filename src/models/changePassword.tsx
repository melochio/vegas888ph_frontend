interface Changepass_Model {
    id: number | any,
    currentPassword: string | any,
    newPassword: string | any,
    verifyPassword: string | any,
}
const initial: Changepass_Model = {
    id: 0,
    currentPassword: '',
    newPassword:'',
    verifyPassword:'',
    
}
export default Changepass_Model
export {
    initial
}