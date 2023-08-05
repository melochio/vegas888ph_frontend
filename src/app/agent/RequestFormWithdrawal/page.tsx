'use client'
import { colors } from "@/publicComponents/customStyles"
import AgentNav from "@/publicComponents/agentNav"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import TextInput from '@/publicComponents/TextInput'
import { Model_Withdrawal, initialWithdrawalValue } from '@/models/wallet';
import { RequestWithdrawal } from '@/api/agent/wallet';
import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import userMiddleware from '@/utils/middleware';
import Container from '@mui/material/Container';
import React from "react";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import Loader from '@/publicComponents/Loading';

const columns: GridColDef[] = [
    { field: 'created_at', headerName: 'DATE', width: 200 },
    { field: 'user_level', headerName: 'TRANSACTION TYPE', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'commission', headerName: 'Commission %', width: 200 },


];
export default function Request() {

    const [loading, setLoading] = React.useState(true);
    const withdrawalOption = [
        { value: 'GCASH', text: 'GCASH' },
        { value: 'BANK', text: 'BANK' },
        { value: 'PERA_PADALA', text: 'PERA PADALA' }
    ]
    const [formInput, setFormInput] = React.useState<Model_Withdrawal>(initialWithdrawalValue)
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" sx={{ color: 'black' }}>
            Request Form
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
    const handleMoneyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numericValue = value.replace(/[^0-9.]/g, '');

        // Format the numeric value as money (e.g., 1234.56 -> $1,234.56)
        const formattedValue = new Intl.NumberFormat('en-US').format(parseFloat(numericValue));
        setFormInput({ ...formInput, [event.currentTarget.name]: event.currentTarget.value })
        setMoney(formattedValue)
    }

    React.useEffect(() => {
        setLoading(true);
        // fetchData();
        userMiddleware()
        setLoading(false);
    }, []);
    const formSubmit = async (event: React.ChangeEventHandler<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
        let inputsValid = false
        if (formInput.firstName != "" &&
            formInput.middleName != "" &&
            formInput.lastName != "" &&
            formInput.email != "" &&
            formInput.phoneNo != "" &&
            formInput.request_amount != "" &&
            formInput.transaction_type != "" &&
            formInput.address != ""
        ) {
            inputsValid = true
        }
        if (inputsValid) {
            console.log(formInput)
            const response: any = await RequestWithdrawal(formInput)
            console.log('response', response)
            if (response == undefined) {
                setLoading(false);
                Swal.fire(
                    'Failed',
                    'Invalid Details Entered',
                    'error'
                )
            }
            if (response.status == 200) {
                setLoading(false);
                Swal.fire(
                    'Success',
                )
                location.href = '/agent/Dashboard'
            } else {
                setLoading(false);
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
        const columns: GridColDef[] = [
            { field: 'PlayerName', headerName: 'Player name', width: 130 },
        ];
       
    }
    return (
        <div>
            <Grid item>
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'start', padding: '20px', }}>
                        <Typography component="h1" sx={{ color: 'white', fontSize: '20px', marginTop: '10px' }}></Typography>
                    </Box>
                    <Container style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white' }}>
                        <Typography component="h1" sx={{ color: 'black', fontSize: '15px', marginTop: '10px' }}>Request Form for Withdrawal</Typography>
                        <hr />
                        <Grid item xs={12} sm={12} md={12} container>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">First Name</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.firstName}
                                        style={{

                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="firstName"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Middle Name</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.middleName}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="middleName"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Last Name</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.lastName}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="lastName"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Amount</label>
                                    <input
                                        onChange={(event) => handleMoneyInput(event)}
                                        type={'text'}
                                        value={formInput.request_amount}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="request_amount"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Email</label>
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
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Phone Number</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.phoneNo}
                                        style={{

                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="phoneNo"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="selectInput" className="form-label">Address</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.address}
                                        style={{

                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="address"

                                    />
                                </div>
                                {/* <FormInput label="Transaction Type" placeholder="Enter text here" options={['deposit','withdraw']} type={"select"} /> */}
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="selectInput" className="form-label">Option</label>
                                    <select
                                        className="form-control"
                                        id="selectInput"
                                        defaultValue=""
                                        style={{ padding: '8px', }}
                                        onChange={(event) => handleInput(event)}
                                        name="transaction_type"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        {withdrawalOption.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <FormInput label="Transaction Type" placeholder="Enter text here" options={['deposit','withdraw']} type={"select"} /> */}
                            </Grid>

                        </Grid>
                        <Button variant="contained" sx={{ margin: '10px' }} size="small" color="info" onClick={(event) => formSubmit(event)} >Save changes</Button>
                        <Button variant="contained" sx={{ margin: '10px' }} size="small" color="error">Cancel</Button>
                    </Container>
                </Grid>
            </Grid>
            <Loader isOpen={loading} />
        </div>
    )
}