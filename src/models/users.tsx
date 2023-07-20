interface Model_User {
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
}

const initialUser: Model_User = {
    id: '',
    name: '',
    user_level: '',
    player_name: '',
    email: '',
    email_verified_at: '',
    password: '',
    pp_filepath: '',
    wallet_id: '',
    remember_token: '',
    created_at: '',
    updated_at: '',
}
export default Model_User

export {
    initialUser
}