'use client'
import { colors } from "@/publicComponents/customStyles"
import Footer from "@/publicComponents/footer"
import Header from "@/publicComponents/header"
import { CurrencyBitcoin, Visibility, VisibilityOff } from "@mui/icons-material"
import { Autocomplete, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, OutlinedInput } from "@mui/material"
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material"
import { Grid } from "@mui/material"
import React, { Dispatch } from "react"
import { transferWalletApi } from '@agentApi/wallet'
import Model_transferMoney, { initialUser } from "@/models/tranferMoney"
import Swal from "sweetalert2"

const Form = () => {
    const [receiver, setReceiver] = React.useState('')
    const [formInput, setFormInput] = React.useState<Model_transferMoney>(initialUser)
    const [confirmpwd, setConfirmpwd] = React.useState('')
    const [passwordValidation, setPasswordValidation] = React.useState(false)
    const [termsCheck, setTermsCheck] = React.useState(false)
    const formSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let inputsValid = false
        console.log(formInput)
        if (formInput.receiverId != "" &&
            formInput.amount != 0
        ) {
            inputsValid = true
        }
        if (inputsValid) {
            Swal.fire({
                title: 'Do you want to send Credits ?',
                // showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                // denyButtonText: `Decline`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const response = await transferWalletApi(formInput)
                    console.log(response)
                    if (response == 'success') {
                        Swal.fire(
                            'Success',
                            'Your Credit has successfully sent!.',
                            'success'
                        )
                        window.location.href = '/AgentDashboard';
                    } else {
                        Swal.fire(
                            'Failed',
                            response.data,
                            'error'
                        )
                    } 
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
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
        setFormInput({ ...formInput, [event.currentTarget.name]: event.currentTarget.value })
    }
    const handleAutocompleteChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        setFormInput({ ...formInput, 'receiverId': newValue.id })
        setReceiver(newValue)
    };
    // const validatePassword = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //     if (formInput.password !== confirmpwd) {
    //         setPasswordValidation(true)
    //     } else {
    //         setPasswordValidation(false)
    //     }
    // }
    // const handleTermsCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setTermsCheck(event.target.checked);
    // };\
    const top100Films = [
        { label: 'The Shawshank Redemption', id: 1994 },
        { label: 'The Godfather', id: 1972 },
        { label: 'The Godfather: Part II', id: 1973 }]
    return (
        <Grid container columns={12} justifyContent={'center'}>
            <Grid item md={5}>
                <Card sx={{ padding: '4rem', backgroundColor: colors.silver, borderRadius: '1em' }}>
                    <Typography variant="h4" fontWeight={700} textAlign={'center'}>Transfer Credits</Typography>
                    <br /> <br />
                    <Grid container columns={12} flexDirection={'row'} justifyContent={'center'} rowSpacing={5}>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    disablePortal
                                    id="receiverIdInput"
                                    onChange={handleAutocompleteChange}
                                    options={top100Films}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Transfer to" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                            <FormControl fullWidth>
                                <TextField id="amountInput"
                                    onChange={handleInput}
                                    type="text"
                                    value={formInput.amount}
                                    required
                                    name="amount"
                                    aria-describedby="emailInput-helper-text"
                                    label="Transfer Amount"
                                /> 
                            </FormControl>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6} xl={6} xs={6}>
                            <Button onClick={(event) => formSubmit(event)} fullWidth variant={'contained'} sx={{
                                padding: '1rem 5rem',
                                fontWeight: 700,
                                backgroundColor: colors.gold,
                                color: 'black'
                            }}>Send</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default function Register() {
    return (
        <Form />
    )
}