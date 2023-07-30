'use client'
import { colors } from "@/publicComponents/customStyles"
import Footer from "@/publicComponents/footer"
import Header from "@/publicComponents/header"
import { CurrencyBitcoin, Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Checkbox, Container, FormControlLabel, IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material"
import { Grid } from "@mui/material"
import React, { Dispatch } from "react"
import {register as RegisterAPI} from '@bettorApi/auth'
import Model_User, { initialUser } from "@/models/users"
import Swal from "sweetalert2"
import supabase from '@utils/supabase'
import { useSearchParams } from "next/navigation"

const Form = () => {
    const [formInput, setFormInput] = React.useState<Model_User>(initialUser)
    const [confirmpwd, setConfirmpwd] = React.useState('')
    const [passwordValidation, setPasswordValidation] = React.useState(false)
    const [termsCheck, setTermsCheck] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const formSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let inputsValid = false
        if(formInput.name != "" &&
        formInput.email != "" &&
        formInput.player_name != "" &&
        formInput.password != "" &&
        formInput.password == confirmpwd &&
        validateEmail(formInput.email) &&
        termsCheck
        ) {
            inputsValid = true
        }
        if (inputsValid) {
            registerPOST()
            const response = await RegisterAPI(formInput)
            if(response.status == 200) {
                Swal.fire(
                    'Success',
                    'Your account has successfully been registered.',
                    'success'
                )
            } else {
                Swal.fire(
                    'Failed',
                    response.data,
                    'error'
                )
            }
        } else {
            Swal.fire(
                'Failed',
                'Invalid Details Entered',
                'error'
            )
        }
    }
    const [emailValidation, setEmailValidation] = React.useState(false)
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInput({...formInput, [event.currentTarget.name] : event.currentTarget.value})
    }
    const validatePassword = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if(formInput.password !== confirmpwd) {
            setPasswordValidation(true)
        } else {
            setPasswordValidation(false)
        }
    }
    const handleTermsCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTermsCheck(event.target.checked);
    };
    
    const registerPOST = async () => {
        let { data, error } = await supabase.auth.signUp({
            email: formInput.email,
            password: formInput.password,
        })
    }
    const handleDateChange = (date:string) => {
        setFormInput({ ...formInput, bday: date });
    };

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const refCodeParam = urlParams.get('refCode');
        if (refCodeParam) {
            setFormInput({...formInput, referral_code: refCodeParam});
        }
    })
    return (
        <Grid container columns={12} justifyContent={'center'}>
            <Grid item xs={10} sm={10} md={8} lg={6}>
                <Card sx={{backgroundColor: colors.silver, borderRadius: '1em', padding: '3em 0em'}}>
                    <Container maxWidth={'lg'}>
                        <Typography variant="h4" fontWeight={700} textAlign={'center'}>Register</Typography>
                        <br /> <br />
                        <Grid container columns={12} flexDirection={'row'} justifyContent={'center'} rowSpacing={3}>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="nameInput"
                                    value={formInput.referral_code}
                                    size={'small'}
                                    name="referral_code"
                                    aria-describedby="nameInput-helper-text" 
                                    helperText="Your Referal Code" 
                                    aria-readonly
                                    inputProps={{style:{backgroundColor: 'lightgray', cursor: 'not-allowed'}}}
                                    label="Referral Code"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="nameInput"
                                    onChange={handleInput}
                                    value={formInput.name}
                                    required
                                    size={'small'}
                                    name="name"
                                    aria-describedby="nameInput-helper-text" 
                                    helperText="Your identity will be kept hidden from public" 
                                    inputProps={{style:{backgroundColor: 'white'}}}
                                    label="Your Name"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="playernameInput"
                                    onChange={handleInput}
                                    value={formInput.player_name}
                                    required
                                    size={'small'}
                                    name="player_name"
                                    aria-describedby="playernameInput-helper-text" 
                                    helperText="This will be shown on as your ingame name" 
                                    inputProps={{style:{backgroundColor: 'white'}}}
                                    label="Player Name"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField
                                    id="bday"
                                    label="Birthday"
                                    size={'small'}
                                    type="date"
                                    value={formInput.bday}
                                    onChange={(event) => handleDateChange(event.currentTarget.value)}
                                    inputProps={{style:{backgroundColor: 'white'}}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="emailInput"
                                    onChange={handleInput}
                                    onKeyUp={() => setEmailValidation(validateEmail(formInput.email))}
                                    type="email"
                                    value={formInput.email}
                                    size={'small'}
                                    required
                                    name="email"
                                    aria-describedby="emailInput-helper-text" 
                                    FormHelperTextProps={{style:{color: emailValidation ? 'rgba(0, 0, 0, 0.6)':'#ff1f1f'}}}
                                    inputProps={{style:{backgroundColor: 'white'}}}
                                    helperText={emailValidation ? "We'll never share your email": "Please enter a valid email"} 
                                    label="Email address"
                                    />
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="password"
                                    onChange={handleInput}
                                    onKeyUp={(event) => validatePassword(event)}
                                    value={formInput.password}
                                    size={'small'}
                                    required
                                    type="password"
                                    name="password"
                                    aria-describedby="password-helper-text" 
                                    inputProps={{style:{backgroundColor: 'white'}}}
                                    FormHelperTextProps={{style:{color: '#ff1f1f'}}}
                                    helperText={passwordValidation ? 'Password & Confirm Password did not match': ''} 
                                    label="Password"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="cpassword"
                                    onKeyUp={(event) => validatePassword(event)}
                                    onChange={(event) => {
                                        setConfirmpwd(event.currentTarget.value)
                                    }}
                                    value={confirmpwd}
                                    size={'small'}
                                    required
                                    type="password"
                                    name="cpassword"
                                    aria-describedby="password-helper-text" 
                                    inputProps={{style:{backgroundColor: 'white'}}}
                                    FormHelperTextProps={{style:{color: '#ff1f1f'}}}
                                    helperText={passwordValidation ? 'Password & Confirm Password did not match': ''} 
                                    label="Confirm Password"/>
                                </FormControl>
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8} textAlign={'center'}>
                                <FormControlLabel sx={{color: termsCheck? 'black': '#ff1f1f'}} control={<Checkbox checked={termsCheck} onChange={handleTermsCheck}  />} label="I agree to VEGAS 888 Terms & Conditions*" />
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
                    </Container>
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