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

const Form = () => {
    const [formInput, setFormInput] = React.useState<Model_User>(initialUser)
    const [loginState, setLoginState] = React.useState(false)
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInput({...formInput, [event.currentTarget.name] : event.currentTarget.value})
    }
    const handleLogin = async () => {
        setLoginState(true)
        const loginresponse = await login(formInput);
        const token = loginresponse.token;
        localStorage.setItem('token', token);
        let { data, error } = await SBAPI.auth.signInWithPassword({
            email: formInput.email,
            password: formInput.password
        })
        if(error !== null) {
            Swal.fire(
                'Failed',
                error?.message,
                'error'
            )
        } 
        console.log(data.user)
        console.log(token)
        // if(data.user !== null) {
        //     document.location.reload()
        // }
        setLoginState(false)
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