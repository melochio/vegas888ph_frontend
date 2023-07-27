'use client'
import { colors } from "@/publicComponents/customStyles"
import Footer from "@/publicComponents/footer"
import Header from "@/publicComponents/header"
import { CurrencyBitcoin, Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material"
import { Grid } from "@mui/material"
import React, { Dispatch } from "react"
import {register as RegisterAPI} from '@bettorApi/auth'
import Model_User, { initialUser } from "@/models/users"
import Swal from "sweetalert2"
import userMiddleware from "@/utils/middleware"
import { format, isValid } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams, useSearchParams } from "next/navigation"

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
    
  
    const handleDateChange = (date:string) => {
        setFormInput({ ...formInput, bday: date });
    };
  
    const isValidDate = (date: Date | null): boolean => {
      // Check if the date is a valid instance of Date and not in the past
      return date !== null && isValid(date) && date >= new Date();
    };
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
                                name="refCode"
                                aria-describedby="nameInput-helper-text" 
                                helperText="Your Referal Code" 
                                required
                                label="Referral Code"/>
                            </FormControl> 
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField id="nameInput"
                                onChange={handleInput}
                                value={formInput.name}
                                required
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
                                required
                                name="player_name"
                                aria-describedby="playernameInput-helper-text" 
                                helperText="This will be shown on as your ingame name" 
                                label="Player Name"/>
                            </FormControl> 
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField
                                id="bday"
                                label="Birthday"
                                type="date"
                                value={formInput.bday}
                                onChange={(event) => handleDateChange(event.currentTarget.value)}
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
                                required
                                name="email"
                                aria-describedby="emailInput-helper-text" 
                                FormHelperTextProps={{style:{color: emailValidation ? 'rgba(0, 0, 0, 0.6)':'#ff1f1f'}}}
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
                                required
                                type="password"
                                name="password"
                                aria-describedby="password-helper-text" 
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
                                required
                                type="password"
                                name="cpassword"
                                aria-describedby="password-helper-text" 
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
                </Card>
            </Grid>
        </Grid>
    )
}

export default function Register() {
    const searchParams = useSearchParams()
    React.useEffect(() => {
      userMiddleware() 
    }, [])
    return (
        <div>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}