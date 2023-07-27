'use client'
import { fetchUser } from "@/api/bettor/auth";

const userMiddleware = async () => {
    const response = await fetchUser()
    const currentUrl = window.location.href;
    switch (response?.user_level) {
        case "bettor":
            if(!currentUrl.includes('/bettor')){
                document.location.href = "/dashboard"
            }
            break;
        case "declarator":
            document.location.href = "/declarator"
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
export default userMiddleware;