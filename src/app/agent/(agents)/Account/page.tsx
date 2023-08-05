'use client'
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import TextInput from '@/publicComponents/TextInput'
import Model_User, { initialUser } from '../../../../models/users'
import { createUser, fetchUser, updateCommissionUser } from '@/api/agent/users'

import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Container from '@mui/material/Container';
import React from "react";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { SBregisterPOST, accountRegisterType, initial_Register } from '@/api/supabaseAPI';

export default function Accounts() {

    const [formInput, setFormInput] = React.useState<accountRegisterType>(initial_Register)
    const [editUser, setEditUser] = React.useState(false)
    const commissionList = [
        {value: '0.6', text: '6%'},
        {value: '0.065', text: '6.5%'},
        {value: '0.07', text: '7%'},
        {value: '0.075', text: '7.5%'},
        {value: '0.08', text: '8%'},
        {value: '0.085', text: '8.5%'},
        {value: '0.09', text: '9%'},
        {value: '0.095', text: '9.5%'},
        {value: '0.1', text: '10%'},
    ]

    const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);
    const [selectedRow, setSelectedRow] = React.useState<Model_User | null>(null);

    const handleEditUser = (id: any) => {
        setSelectedRowIndex(id)
        if (selectedRowIndex !== null && selectedRow !== null) {
            // Create a new data array with the updated row

        }
        setEditUser(!editUser)
        // setFormInput(form)
    }
    const handleCanceEditUser = () => {
        setEditUser(!editUser)
    }
    const [commissionRate, setCommissionRate] = React.useState('')
    const handleSaveChangesUser = (userId: any) => {
        updateCommissionUser(userId, commissionRate)
            .then((res) => {
                if (res?.status == 200) {
                    Swal.fire(
                        'Success',
                    )
                    fetchData();

                    setEditUser(!editUser)
                } else {
                    Swal.fire(
                        'Failed',  
                    )
                }

            })
    }
    const handleTableInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setCommissionRate(event.currentTarget.value)
    }

    const columns: GridColDef[] = [
        { field: 'created_at', headerName: 'DATE', width: 200 },
        { field: 'user_level', headerName: 'TRANSACTION TYPE', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'commission',
            headerName: 'Current Commission %',
            flex: 1,
            renderCell: (params: { row: { form: any; commission: any; }; }) => {
                // const userId = params.row.id;
                const form = params.row;
                const commission = params.row.commission * 100 + '%';

                return (
                    <>
                        <Container>
                            <Typography>
                                {commission}
                            </Typography>
                        </Container>
                    </>

                );
            },
        },

        {
            field: 'Newcommission',
            headerName: 'New Commission %',
            flex: 1,
            renderCell: (params: { row: { id: any; form: any; commission: any; }; }) => {
                // const userId = params.row.id;
                const form = params.row;
                const commission = params.row.commission;
                const index = params.row.id;

                return (
                    <>
                        {selectedRowIndex == index ?
                            <Container>
                                <select
                                    className="form-control"
                                    id="selectInput"
                                    defaultValue=""
                                    style={{ padding: '8px', }}
                                    onChange={(event) => handleTableInput(event)}
                                    name="commission"
                                >
                                    <option value="" disabled>Select an option</option>
                                    {['8%', '9%'].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </Container>
                            : ''
                        }
                    </>

                );
            },
        },
        {
            field: 'isActive',
            headerName: 'Action',
            flex: 1,
            renderCell: (params: { row: {user_level:any, id: any; form: any; firstName: any; request_amount: any; userId: string }; }) => {
                // const userId = params.row.id;
                const form = params.row;
                const userId = params.row.userId;
                const index = params.row.id;
                return (
                    <>
                    {
                        form.user_level != 'bettor' ?  
                        <Container>
                            {
                                editUser && selectedRowIndex == index ?
                                    <>
                                        <Button size="small" variant="contained" color='success' style={{ color: 'white' }} onClick={() => handleSaveChangesUser(form.id)}>
                                            Save
                                        </Button>
                                        <Button size="small" variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleCanceEditUser()}>
                                            Cancel
                                        </Button>
                                    </>
                                    :
                                    !editUser ? 
                                        <Button size="small" variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleEditUser(index)}>
                                            Edit
                                        </Button>
                                        : ''
                            }

                        </Container>
                        :
                        ''
                    }
                        
                    </>

                );
            },
        },


    ];

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: 'black' }}>
            Accounts
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
            console.log(formInput)
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

    const [userlist, setUserlist] = React.useState([])
    const fetchData = async () => {
        setFormInput({ ...formInput, 'isActive': 1 })
        try {
            if (user?.user_level == 'agent') {
                const users: [] = await fetchUser(['bettor'], 'active');
                setUserlist(users);
            } else {
                const users: [] = await fetchUser(['bettor', 'agent'], 'active');
                setUserlist(users);
            }

            // Assuming `users` is an array of objects with the 'PlayerName' property
        } catch (error) {
            console.error('Error fetching data:', error);
            // setUserList([]); // Set an empty array if there's an error or no data
        }
    };
    type UserModel = {
        created_at: any,
        email: any,
        email_verified_at: any,
        id: any,
        name: any,
        player_name: any,
        pp_filepath: any,
        updated_at: any,
        user_level: string | any,
    }
    const [user, setUser] = React.useState<UserModel>() 
    const filteredColumns = editUser ? columns : columns.filter((column) => column.field !== 'Newcommission');
    React.useEffect(() => {
        const fetch = async () => {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/tokenValue', null, {
                withCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            if (response === undefined) {
                document.location.href = '/login'
            } else {
                const userResponse: UserModel =  response.data
                setUser(userResponse)
            }
        }
        fetch()
        fetchData();
    }, []);
    const formSubmit = async (event: React.ChangeEventHandler<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let inputsValid = false
        if (formInput.name != "" &&
            formInput.player_name != "" &&
            formInput.bday != "" &&
            formInput.user_level != "" &&
            formInput.password != ""

        ) {
            if (formInput.user_level == "declarator" || formInput.user_level == "admin" || formInput.user_level == "bettor" ) {
                inputsValid = true
            } else {
                if (formInput.commission != "") {
                    inputsValid = true
                }
            }
        }
        if (inputsValid) {
            const err = await SBregisterPOST(formInput, user?.id)
            if (err === null) {
                fetchData();
                Swal.fire(
                    'Success',
                )
                // location.href = '/admin/Setup/Account'
            } else {
                Swal.fire(
                    'Failed',
                    err,
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
                <Grid item xs={10} sm={10} md={12}>
 
                    <Container style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white' }}>
                        <Typography component="h1" sx={{ color: 'black', fontSize: '15px', marginTop: '10px' }}>Account Management</Typography>
                        <hr />
                        <Grid item xs={12} sm={12} md={12} container>
                            <Grid item xs={12} sm={12} md={6}>
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
                                        name="fullName"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="selectInput" className="form-label">User Type</label>
                                    <select
                                        className="form-control"
                                        id="selectInput"
                                        defaultValue=""
                                        style={{ padding: '8px', }}
                                        onChange={(event) => handleInput(event)}
                                        name="user_level"
                                        value={formInput.user_level}
                                    >
                                        <option value="" disabled>Select an option</option>
                                        {
                                            user?.user_level == 'master agent' ?
                                                ['agent', 'bettor'].map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))
                                                :
                                                ['bettor'].map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))
                                        }
                                    </select>
                                </div>
                                {/* <FormInput label="Transaction Type" placeholder="Enter text here" options={['deposit','withdraw']} type={"select"} /> */}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
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
                            <Grid item xs={12} sm={12} md={6}>
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
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Birthday</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'date'}
                                        value={formInput.bday}
                                        style={{

                                            padding: '8px',
                                        }}
                                        className="form-control"
                                        id="textInput"
                                        name="bday"

                                    />
                                </div>
                            </Grid>
                            {
                                (formInput.user_level != 'declarator' && formInput.user_level != 'admin' && formInput.user_level != 'bettor') ?
                                    <Grid item xs={12} sm={6} md={6}>
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                            <label htmlFor="selectInput" className="form-label">Commission %</label>
                                            <select
                                                className="form-control"
                                                id="selectInput"
                                                defaultValue=""
                                                style={{ padding: '8px', }}
                                                onChange={(event) => handleInput(event)}
                                                name="commission"
                                            >
                                                <option value="" disabled>Select an option</option>
                                                {commissionList.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.text}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* <FormInput label="Transaction Type" placeholder="Enter text here" options={['deposit','withdraw']} type={"select"} /> */}
                                    </Grid>
                                    : ''

                            }

                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Password</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'password'}
                                        value={formInput.password}
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
                <Grid item xs={10} sm={10} md={8}  >
                    <Container style={containerStyle} sx={{ backgroundColor: 'white', marginTop:'10px' }}>
                        <Typography>
                            List of Users
                        </Typography>
                        <DataGrid
                            rows={userlist}
                            columns={filteredColumns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection={false}
                        />
                    </Container>
                </Grid>

            </Grid>
        </div>
    )
}