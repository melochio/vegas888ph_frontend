import supabase from "@/utils/supabase"
import { generateReferralCode } from "@/utils/tools"
import { createUser } from "./admin/users"

type accountRegisterType ={
    referral_code: string | any,
    name: string | any,
    user_level: string | any,
    player_name: string | any,
    email: string | any,
    password: string | any,
    pp_filepath: string | any,
    wallet_id: number | any,
    remember_token: string | any,
    bday: Date | any,
    commission: Date | any,
    isActive: string | any,
    user_origin: string | any,
}
const initial_Register: accountRegisterType = {
    referral_code: null,
    name: null,
    user_level: null,
    player_name: null,
    email: null,
    password: null,
    pp_filepath: null,
    wallet_id: null,
    remember_token: null,
    bday: null,
    commission: null,
    isActive: null,
    user_origin: null,
}
const SBregisterPOST = async (formInput: accountRegisterType) => {
    const code = formInput.user_level.includes("agent") ?  await generateReferralCode():null ;
    const { data:usersTbl, error: usersTbl_err } = await supabase
    .from('users')
    .insert([
        {...formInput, referral_code: code},
    ])
    if(usersTbl_err !== null) {
        return usersTbl_err.message
    }    

    const response = await createUser(formInput.email, formInput.password)
    if (response === undefined) {
        return "failed creating user"
    }
    return null
}
const SBstreamList = async () => {    
    let { data: stream_configuration, error } = await supabase
    .from('stream_configuration')
    .select('*')
    if(error !== null) {
        return []
    }
    return stream_configuration
}
const SBselectedStream = async (title: string) => {    
    let { data: stream_configuration, error } = await supabase
    .from('stream_configuration')
    .select('*')
    .eq('title', title)
    if(error !== null) {
        return null
    }
    return stream_configuration !== null ? stream_configuration : null
}

export {
    SBregisterPOST,
    initial_Register,
    SBstreamList,
    SBselectedStream
}
export type {
    accountRegisterType,
}