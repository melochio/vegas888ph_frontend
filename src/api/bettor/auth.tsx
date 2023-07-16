import axios from "axios"
import config from "../config/headers"
import Model_User from "@/models/users"
import Swal from "sweetalert2"

const register = (formData: Model_User) => {
     const response = axios.post(process.env.API_URL+'/api/bettor/users', formData, config)
     if(response === undefined){
        Swal.fire(
            'Failed',
            'Something went wrong while processing your registration. Please try again.',
            'error'
        )
     } else{
        Swal.fire(
            'Success',
            'Your account has successfully been registered.',
            'success'
        )
     }
}

export {
    register
}