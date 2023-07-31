'use client'
import supabase from "./supabase";

const userMiddleware = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    let { data: users, error } = await supabase
        .from('users')
        .select('user_level')
        .eq('email', user?.email)
    const currentUrl = window.location.href;
    if(user === null) {
        let { error } = await supabase.auth.signOut()
        if(currentUrl.includes('/gameView')){
            document.location.href = "/login"
        }
        if(currentUrl.includes('/agent')){
            document.location.href = "/login"
        }
        if(currentUrl.includes('/admin')){
            document.location.href = "/login"
        }
        if(currentUrl.includes('/declarator')){
            document.location.href = "/login"
        }
        if(currentUrl.includes('/dashboard')){
            document.location.href = "/login"
        }
    }
    console.log(user)
    console.log(users)
    if(user !== null && users !== null) {
        switch (users[0].user_level) {
            case "bettor":
                if(window.location.pathname !== '/gameView' && window.location.pathname !== '/dashboard'){
                    document.location.href = "/dashboard"
                }
                break;
            case "declarator":
                if(window.location.pathname !== '/declarator'){
                    document.location.href = "/declarator"
                }
                break;
            case "admin":
                if(!currentUrl.includes('/admin')){
                    document.location.href = "/admin/Dashboard"
                }
                break;
            case "super admin":
                document.location.href = "/super_admin/Dashboard"
                break;
            case "agent":
                if(!currentUrl.includes('/agent')){
                    document.location.href = "/agent/Dashboard"
                }
                break;
            case "master agent":
                if(!currentUrl.includes('/agent')){
                    document.location.href = "/agent/Dashboard"
                }
                break;
        }
    }
}
export default userMiddleware;