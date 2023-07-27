'use client'
import { fetchUser, login } from "@/api/bettor/auth"
import Model_User, { UserModel_Hidden, initialUser } from "@/models/users"
import { colors } from "@/publicComponents/customStyles"
import Footer from "@/publicComponents/footer"
import Header from "@/publicComponents/header"
import { LoadingButton } from "@mui/lab"
import { Button, Checkbox, FormControlLabel } from "@mui/material"
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material"
import { Grid } from "@mui/material"
import axios from "axios"
import Error from "next/error"
import React from "react"
import Swal from "sweetalert2"
import SBAPI from '@utils/supabase'

const userValidator = (level: string | any) => {
switch (level) {
    case "bettor":
        document.location.href = "/dashboard"
        break;
    case "declarator":
        document.location.href = "/declarator"
        break;
    case "admin":
        document.location.href = "/admin/Dashboard"
        break;
    case "super admin":
        document.location.href = "/super_admin/Dashboard"
        break;
    case "agent":
        document.location.href = "/agent/Dashboard"
        break;
    case "master agent":
        document.location.href = "/agent/Dashboard"
        break;
    case "declarator":
        document.location.href = "/declarator"
        break;
    default:
        document.location.href = "/login"
        break;
    }
}
const Form = () => {
    const [formInput, setFormInput] = React.useState<Model_User>(initialUser)
    const [loginState, setLoginState] = React.useState(false)
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInput({...formInput, [event.currentTarget.name] : event.currentTarget.value})
    }
    const handleLogin = async () => {
    setLoginState(true)
      try {
        const loginresponse = await login(formInput);
        const token = loginresponse.token;
        localStorage.setItem('token', token);
        const fetchUserResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/tokenValue',null, {
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://175.41.183.232/',
            'Authorization': 'Bearer '+ token
            },
        })
        const userResponse : UserModel_Hidden = fetchUserResponse.data
        userValidator(userResponse?.user_level)
      } catch {
        Swal.fire(
            'Failed',
            'Account does not exist',
            'error'
        )
        setLoginState(false)
      }
    };
    return (
        <Grid container columns={12} justifyContent={'center'} minHeight={'70vh'}>
            <Grid item xs={10} sm={8} md={8} lg={6}>
                <Card sx={{backgroundColor: colors.silver, borderRadius: '1em', padding: '3em 0em'}}>
                    <form action="" method="post">
                        <Typography variant="h4" fontWeight={700} textAlign={'center'}>Login</Typography>
                        <br /> <br />
                        <Grid container columns={12} flexDirection={'row'} justifyContent={'center'} rowSpacing={2}>
                            <Grid item sm={10} md={8} lg={8} xl={8} xs={10}>
                                <FormControl fullWidth>
                                    <TextField id="emailInput"
                                    name="email"
                                    value={formInput.email}
                                    onChange={(event)=>handleInput(event)}
                                    aria-describedby="emailInput-helper-text" 
                                    helperText=" " 
                                    label="Email address"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={10} md={8} lg={8} xl={8} xs={10}>
                                <FormControl fullWidth>
                                    <TextField id="passwordInput"
                                    name="password"
                                    value={formInput.password}
                                    onChange={(event)=>handleInput(event)}
                                    aria-describedby="passwordInput-helper-text"
                                    helperText=" " 
                                    type="password"
                                    label="Password"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={10} md={8} lg={8} xl={8} xs={10} textAlign={'center'}>
                                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                            </Grid>
                            <Grid item sm={10} md={6} lg={6} xl={6} xs={10}>
                                <LoadingButton loading={loginState} fullWidth
                                    onClick={handleLogin}
                                    sx={{
                                        padding: '1rem 3rem', fontWeight: 700, backgroundColor: colors.gold, color: 'black',
                                        '&:hover':{
                                            backgroundColor: colors.gold+"99"
                                        }
                                    }}>
                                    Login
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}

export default function Login() {
    return (
        <div>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}