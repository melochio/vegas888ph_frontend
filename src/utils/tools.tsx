import supabase from "./supabase";

const checkReferralValidity = async (code: string) => {    
    let { data: users, error } = await supabase
    .from('users')
    .select('referral_code')
    if(users !== null) {
        return true
    } else {
        return false
    }
}
const generateReferralCode = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;
    let referralCode = '';
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }
    const isValid = await checkReferralValidity(referralCode)
    if(!isValid) {
        generateReferralCode()
    }
    return referralCode;
};
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export {
    generateReferralCode,
    formatDate
}