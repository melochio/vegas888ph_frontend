interface Model_User {
    referral_code: string | any,
    id: number | any,
    name: string | any,
    user_level: string | any,
    player_name: string | any,
    email: string | any,
    email_verified_at: Date | any,
    password: string | any,
    pp_filepath: string | any,
    wallet_id: number | any,
    remember_token: string | any,
    created_at: Date | any,
    updated_at: Date | any,
    bday: Date | any,
    commission: Date | any,
    total_wallet_balance: string | any,
    isActive: string | any,
    mobileNo : string | any,
    user_origin: string | any,
    
}

type UserModel_Hidden = {
    referral_code:any,
    created_at:any,
    email: any,
    email_verified_at: any,
    id: any,
    name: any,
    player_name: any,
    pp_filepath: any,
    updated_at: any,
    user_level: any,
    bday: any,
    commission: any, 
    total_wallet_balance: any,
    isActive: any,
    mobileNo: any,
    user_origin: string | any,
    
}

const initialUser: Model_User = {
    id: '',
    name: '',
    user_level: '',
    player_name: '',
    email: '',
    email_verified_at: '',
    bday: '',
    password: '',
    pp_filepath: '',
    wallet_id: '',
    remember_token: '',
    created_at: '',
    updated_at: '',
    commission: '',  
    referral_code: '', 
    total_wallet_balance: '0.00', 
    isActive: '', 
    mobileNo: '', 
    user_origin: '',
}
export default Model_User

export type {
    UserModel_Hidden
}

export {
    initialUser
}