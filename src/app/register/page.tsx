'use client'
import { colors } from "@/publicComponents/customStyles"
import Footer from "@/publicComponents/footer"
import Header from "@/publicComponents/header"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material"
import { Grid } from "@mui/material"
import React, { Dispatch } from "react"
import {register as RegisterAPI} from '@bettorApi/auth'
import Model_User, { initialUser } from "@/models/users"
import { cp } from "fs"

const Form = () => {
    const [formInput, setFormInput] = React.useState<Model_User>(initialUser)
    const [confirmpwd, setConfirmpwd] = React.useState('')
    const formSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        console.log(formInput)
        RegisterAPI(formInput)
    }
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInput({...formInput, [event.currentTarget.name] : event.currentTarget.value})
    }
    return (
        <Grid container columns={12} justifyContent={'center'}>
            <Grid item md={5}>
                <Card sx={{padding: '4rem', backgroundColor: colors.silver, borderRadius: '1em'}}>
                    <Typography variant="h4" fontWeight={700} textAlign={'center'}>Play With Us</Typography>
                    <br /> <br />
                    <Grid container columns={12} flexDirection={'row'} justifyContent={'center'} rowSpacing={5}>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField id="nameInput"
                                onChange={handleInput}
                                value={formInput.name}
                                name="name"
                                aria-describedby="nameInput-helper-text" 
                                helperText="Your identity will be kept hidden from public" 
                                label="Your Name"/>
                            </FormControl> 
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField id="playernameInput"
                                onChange={handleInput}
                                value={formInput.player_name}
                                name="player_name"
                                aria-describedby="playernameInput-helper-text" 
                                helperText="This will be shown on as your ingame name" 
                                label="Player Name"/>
                            </FormControl> 
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField id="emailInput"
                                onChange={handleInput}
                                value={formInput.email}
                                name="email"
                                aria-describedby="emailInput-helper-text" 
                                helperText="We'll never share your email" 
                                label="Email address"
                                />
                            </FormControl> 
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField id="password"
                                onChange={handleInput}
                                value={formInput.password}
                                type="password"
                                name="password"
                                aria-describedby="password-helper-text" 
                                label="Password"/>
                            </FormControl> 
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField id="cpassword"
                                onChange={(event) => setConfirmpwd(event.currentTarget.value)}
                                value={confirmpwd}
                                type="password"
                                name="cpassword"
                                aria-describedby="password-helper-text" 
                                label="Confirm Password"/>
                            </FormControl>
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8} textAlign={'center'}>
                            <FormControlLabel control={<Checkbox />} label="I agree to VEGAS 888 Terms & Conditions*" />
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xl={6} xs={6}>
                            <Button onClick={(event) => formSubmit(event)} fullWidth variant={'contained'} sx={{
                                padding: '1rem 5rem',
                                fontWeight: 700,
                                backgroundColor: colors.gold,
                                color: 'black'
                                }}>Register</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default function Register() {
    return (
        <div>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}