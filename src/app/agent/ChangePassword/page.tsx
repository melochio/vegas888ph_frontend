'use client' 
import Typography from '@mui/joy/Typography';
 
import { updateUser , fetchUser } from '@/api/agent/users'

import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Container from '@mui/material/Container';
import React from "react";
import Swal from "sweetalert2"; 

import { changePassword  } from '@/api/agent/users'
import Changepass_Model, { initial } from '../../../models/changePassword'
 
export default function Accounts() {

    const [formInput, setFormInput] = React.useState<Changepass_Model>(initial)
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" sx={{ color: 'black' }}>
            My Profile
        </Link>,
    ];
    const containerStyle = {
        marginLeft: '240px',
        margin: 'auto',
    };

    // const getUser()
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => { 
        setFormInput({ ...formInput, [event.currentTarget.name]: event.currentTarget.value })
    }
    const [money, setMoney] = React.useState('');
    const moneyStyle = { 
        padding: '8px',
    } 
    React.useEffect(() => {
        
    }, []);
    const formSubmit = async (event: React.ChangeEventHandler<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let inputsValid = false
        if (formInput.currentPassword != "" &&
            formInput.newPassword != "" &&
            formInput.newPassword == formInput.verifyPassword 
        ) {
            inputsValid = true
        }
        if (inputsValid) {
            const response = await changePassword(formInput)
            console.log('response', response)
            if (response.status == 200) {
                Swal.fire(
                    'Success',
                ) 
                // location.href = '/agent/Dashboard'
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
    return (
        <div>
            <Stack spacing={2}>

                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    color='white'
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'start', padding: '20px', backgroundColor: "black" }}>
                        <Typography component="h1" sx={{ color: 'white', fontSize: '20px', marginTop: '10px' }}></Typography>
                    </Box>
                    <Container style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white' }}>
                        <Typography component="h1" sx={{ color: 'black', fontSize: '15px', marginTop: '10px' }}>My Profile</Typography>
                        <hr />
                        <Grid item xs={12} sm={12} md={12} container>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Current Password</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'password'}
                                        value={formInput.currentPassword}
                                        style={{

                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="currentPassword"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">New Password</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'password'}
                                        value={formInput.newPassword}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="newPassword"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Verify Password</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'password'}
                                        value={formInput.verifyPassword}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="verifyPassword" 
                                    />
                                    <p style={{color:'red'}}>{formInput.newPassword != formInput.verifyPassword ? 'Not match password':''}</p>
                                    
                                </div>
                            </Grid> 
                        </Grid>
                        <Button variant="contained" sx={{ margin: '10px' }} size="small" color="info" onClick={(event) => formSubmit(event)} >Save changes</Button>
                        <Button variant="contained" sx={{ margin: '10px' }} size="small" color="error">Cancel</Button>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}