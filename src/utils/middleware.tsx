import { fetchUser } from "@/api/bettor/auth";

const userMiddleware = async () => {
    // const response = await fetchUser()
    // switch (response?.user_level) {
    //   case "bettor":
    //       document.location.href = "/dashboard"
    //       break;
    //   case "declarator":
    //       document.location.href = "/declarator"
    //       break;
    //   case "admin":
    //       document.location.href = "/admin/Dashboard"
    //       break;
    //   case "super admin":
    //       document.location.href = "/super_admin/Dashboard"
    //       break;
    //   case "agent":
    //       document.location.href = "/agent/Dashboard"
    //       break;
    //   case "master agent":
    //       document.location.href = "/agent/Dashboard"
    //       break;
    //     case "declarator":
    //         document.location.href = "/declarator"
    //         break;
    //   default:
    //       document.location.href = "/login"
    //       break;
    // }
}
export default userMiddleware;