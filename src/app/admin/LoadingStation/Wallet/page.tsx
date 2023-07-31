'use client'
import { colors } from "@/publicComponents/customStyles"
import AgentNav from "@/publicComponents/agentNav"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import TextInput from '@/publicComponents/TextInput'
import Model_tranferMoney, { initialUser } from '../../../../models/tranferMoney'
import Model_user, { initialUser as initUser } from '../../../../models/users'
import { transferWalletApi, getWalletHistory } from '@/api/agent/wallet'
import { fetchUser, fetchUserWallet } from '@/api/agent/users'
import MoneyFormat from "@/publicComponents/MoneyFormat";
import userMiddleware from '@/utils/middleware';
import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Container from '@mui/material/Container';
import React from "react";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Model_User from "../../../../models/users";
import supabase from "@/utils/supabase";


const columns: GridColDef[] = [
    { field: 'created_at', headerName: 'DATE', width: 200 },
    { field: 'type', headerName: 'TRANSACTION TYPE	', width: 200 },
    { field: 'amount', headerName: 'AMOUNT', width: 200 },
    { field: 'name', headerName: 'USER WALLET', width: 200 },
    { field: 'remarks', headerName: 'DETAILS', width: 200 },
    // { field: 'name5', headerName: 'TRANSACTED BY', width: 200 },


];

export default function Wallet() {
    interface members {
        player_name: string,
        name: String | any,
        total_wallet_balance: number
    }
    const [memberDetails, setMemberDetails] = React.useState<members | any>({
        player_name: '',
        name: '',
        total_wallet_balance: 0
    })
    const [formInput, setFormInput] = React.useState<Model_tranferMoney>(initialUser)
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: 'black' }}>
            Wallet
        </Link>,
    ];
    const containerStyle = {
        marginLeft: '240px',
        margin: 'auto',
    };

    // const getUser()
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        
        if (event.currentTarget.name == 'requestee') {
            const data = userlist.find((user) => user.name === event.currentTarget.value);
            const _player_name = data?.player_name
            const _name = data?.name
            const _total_wallet_balance = data?.total_wallet_balance
            const memberData = { player_name: _player_name, name: _name, total_wallet_balance: _total_wallet_balance };
            setMemberDetails(memberData);
        }
        setFormInput({ ...formInput, [event.currentTarget.name]: event.currentTarget.value })
    }
    const [money, setMoney] = React.useState('');
    const moneyStyle = {
        textAlign: 'right',
        padding: '8px',
    }
    const handleMoneyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numericValue = value.replace(/[^0-9.]/g, '');

        // Format the numeric value as money (e.g., 1234.56 -> $1,234.56)
        const formattedValue = new Intl.NumberFormat('en-US').format(parseFloat(numericValue));
        setFormInput({ ...formInput, [event.currentTarget.name]: value.replace(/[^0-9.]/g, '')})
        setMoney(formattedValue)
    }

    const [userlist, setUserlist] = React.useState<Model_user[]>([]);
    const fetchData = async () => {
        try {
            let { data, error } = await supabase
              .rpc('get_users_with_wallet_balance')
            
            if (error) console.error(error)
            else setUserlist(data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            // setUserList([]); // Set an empty array if there's an error or no data
        }
    };

    const [walletHistory, setWalletHistory] = React.useState<any[]>([])
    const fetchWalletHistory = async () => {
        let { data: wallets, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('userId', 9)
        if (wallets && wallets.length > 0) {
            setWalletHistory(wallets);
        }
        // try { 
        //     // const data = await getWalletHistory(); 
        //     // setWalletHistory(wallets); // Assuming `users` is an array of objects with the 'PlayerName' property
        // } catch (error) {
        //     // console.error('Error fetching data:', error);
        //     // setUserList([]); // Set an empty array if there's an error or no data
        // }
    }
    React.useEffect(() => {
        fetchData();
    },[])
    const [wallet_amount, setWallet_amount] = React.useState<Number | any>(0)
    React.useEffect(() => { 
        userMiddleware()
        fetchWalletHistory()
        setWallet_amount(Number(localStorage.getItem('wallet_amount')));
    }, []);
    const formSubmit = async (event: React.ChangeEventHandler<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(formInput)
        alert(formInput.amount.replace(",", ""))
        let inputsValid = false
        if (formInput.type != "" &&
           Number(formInput.amount.replace(" ", "")) > 0 &&
            formInput.requestee != "" &&
            formInput.password != ""
        ) {
            inputsValid = true
        }
        if (inputsValid) {
            const response = await transferWalletApi(formInput)
            console.log('response', response)
            if (response.status == 200) {
                Swal.fire(
                    'Success',
                ) 
                location.href = '/admin/LoadingStation/Wallet'
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
            <Grid container spacing={2} columns={12}>
                <Grid item xs={12} sm={12} md={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'start', padding: '20px', backgroundColor: "black" }}>
                        {/* <Typography component="h1" sx={{ color: 'white', fontSize: '20px', marginTop: '10px' }}>Current Wallet : {'₱ ' + wallet_amount.toFixed(2)} </Typography> */}
                    </Box>
                    <Container style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white' }}>
                        <Typography component="h1" sx={{ color: 'black', fontSize: '15px', marginTop: '10px' }}>Wallet Management</Typography>
                        <hr />
                        <Grid item xs={12} sm={12} md={12} container>
                            <Grid item xs={12} sm={6} md={6}>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="selectInput" className="form-label">Transaction Type</label>
                                    <select
                                        className="form-control"
                                        id="selectInput"
                                        defaultValue=""
                                        style={{ padding: '8px', }}
                                        onChange={(event) => handleInput(event)}
                                        name="type"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        {['deposit', 'withdraw'].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <FormInput label="Transaction Type" placeholder="Enter text here" options={['deposit','withdraw']} type={"select"} /> */}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="selectInput" className="form-label">Member</label>
                                    <select
                                        className="form-control"
                                        id="selectInput"
                                        defaultValue=""
                                        style={{ padding: '8px', }}
                                        onChange={(event) => handleInput(event)}
                                        name="requestee"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        {userlist.map((option: any) => (
                                            <option key={option.id} value={option.name}>
                                                {option.name} ({option.user_level})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Amount</label>
                                    <input
                                        onChange={(event) => handleMoneyInput(event)}
                                        type={'text'}
                                        className="form-control"
                                        id="textInput"
                                        value={money}
                                        style={{
                                            textAlign: 'right',
                                            padding: '8px',
                                        }}
                                        name="amount"
                                    />
                                </div>
                            </Grid>
                            {/* transactionDetails */}
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Transaction Details</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.transactionDetails}
                                        style={{ 
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="transactionDetails"

                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Password</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        value={formInput.password}
                                        type={'password'}
                                        style={{
                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="password"


                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Button variant="contained" sx={{ margin: '10px' }} size="small" color="info" onClick={(event) => formSubmit(event)} >Submit</Button>
                        <Button variant="contained" sx={{ margin: '10px' }} size="small" color="error">Cancel</Button>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Container style={containerStyle} sx={{ backgroundColor: 'white', display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'left', flexDirection: 'column' }}>
                        <Typography component="h1" sx={{ fontSize: '15px', marginTop: '10px' }}>Member Details </Typography>
                        <hr />
                        <Box>
                            <Typography sx={{ fontSize: '15px' }}>Name : {memberDetails.name}
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }}>Username: {memberDetails.player_name}
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }}>Current Wallet: {'₱ ' + memberDetails.total_wallet_balance.toFixed(2)}
                            </Typography>
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <Card>
                        <Typography>
                            List of Transactions
                        </Typography>
                        <DataGrid
                            rows={walletHistory}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection={false}
                        />
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}