'use client' 
import Typography from '@mui/joy/Typography'; 
import Model_User, { initialUser } from '../../../models/users'
import { updateUser , fetchUser } from '@/api/agent/users'

import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; 
import Container from '@mui/material/Container';
import React from "react";
import Swal from "sweetalert2"; 
import axios from "axios";
import userMiddleware from '@/utils/middleware';

const columns: GridColDef[] = [
    { field: 'created_at', headerName: 'DATE', width: 200 },
    { field: 'user_level', headerName: 'TRANSACTION TYPE', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'commission', headerName: 'Commission %', width: 200 },


];
export default function Accounts() {

    const [formInput, setFormInput] = React.useState<Model_User>(initialUser)
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
        if ('fullName' == event.currentTarget.name) {
            setFormInput({ ...formInput, 'name': event.currentTarget.value })
        } else {
            setFormInput({ ...formInput, [event.currentTarget.name]: event.currentTarget.value })
        }
    }
    const [money, setMoney] = React.useState('');
    const moneyStyle = {

        padding: '8px',
    }
    const handleMoneyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numericValue = value.replace(/[^0-9.]/g, '');

        // Format the numeric value as money (e.g., 1234.56 -> $1,234.56)
        const formattedValue = new Intl.NumberFormat('en-US').format(parseFloat(numericValue));
        setFormInput({ ...formInput, [event.currentTarget.name]: event.currentTarget.value })
        setMoney(formattedValue)
    }
 
    const fetchData = async () => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/tokenValue', null, {
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const userResponse: Model_User = response.data
            if (response === undefined) {
                document.location.href = '/login'
            } else {
                setFormInput(userResponse)
            }
        } catch (err) {
            document.location.href = '/login'
        }
    };
    React.useEffect(() => {
        userMiddleware()
        fetchData();
    }, []);
    const formSubmit = async (event: React.ChangeEventHandler<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let inputsValid = false
        if (formInput.name != "" &&
            formInput.player_name != "" &&
            formInput.mobileNo != "" && 
            formInput.email != ""

        ) {
            if (formInput.user_level == "bettor") {
                inputsValid = true
            } else {
                if (formInput.commission != "") {
                    inputsValid = true
                }
            }
        }
        if (inputsValid) {
            const response = await updateUser(formInput)
            console.log('response', response)
            if (response.status == 200) {
                Swal.fire(
                    'Success',
                )

                location.href = '/agent/Dashboard'
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
                                    <label htmlFor="textInput" className="form-label">Name</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.name}
                                        style={{

                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="name"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Player Name</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.player_name}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="player_name"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Mobile No</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.mobileNo}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="mobileNo"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Email Address</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.email}
                                        style={{

                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="email"

                                    />
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