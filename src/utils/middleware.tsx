import { fetchUser } from "@/api/bettor/auth";

const userMiddleware = async () => {
    // const response = await fetchUser()
    // console.log(response?.user_level)
    // switch (response?.user_level) {
    //     case "bettor":
    //         document.location.href = "/dashboard"
    //         break;
    //     case "declarator":
    //         console.log(document.location.pathname)
    //         document.location.href = "/declarator"
    //         break;
    //     case "admin":
    //         document.location.href = "/admin/Dashboard"
    //         break;
    //     case "super admin":
    //         document.location.href = "/super_admin/Dashboard"
    //         break;
    //     case "agent":
    //         document.location.href = "/agent/Dashboard"
    //         break;
    //     case "master agent":
    //         document.location.href = "/agent/Dashboard"
    //         break;
    //   default:
    //       document.location.href = "/login"
    //       break;
    // }
}
export default userMiddleware;