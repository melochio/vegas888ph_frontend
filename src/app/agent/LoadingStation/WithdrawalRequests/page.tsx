'use client'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { getRequestWithdrawal, approvedRequestWithdrawal, declineWithdrawRequest } from '@agentApi/wallet'

import { Box, Button, Container, Grid, Menu, MenuItem, Paper, Popper, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';
import Card from '@mui/joy/Card';
import router from 'next/router';

interface User {
    // id: number;
    name: string;
    isActive: boolean;
}

const UserTable: React.FC = () => {
    const [request, setRequest] = React.useState<User[]>([]);

    useEffect(() => {
        // Fetch data from the user API endpoint here
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
        // fetch('YOUR_API_ENDPOINT')
        //   .then((response) => response.json())
        //   .then((data) => setUsers(data))
        //   .catch((error) => console.error('Error fetching users:', error)); 
        getRequestWithdrawal(['bettor','agent'])
            .then((res) => {
                setRequest(res)
                console.log(res)
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);
    const handleApproveRequest = (requestId: any, requesteeId: any, amount: any, name: any) => {
        Swal.fire({
            text: "You won't be able to revert this!",
            icon: 'warning',
            title: 'Do you want to send ' + amount + ' load  to ' + name + '? ',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                approvedRequestWithdrawal({ requestId: requestId, requesteeId: requesteeId, amount: amount })
                    .then((res) => {
                        res.data
                        Swal.fire('Saved!', '', 'success')
                        location.href = '/agent/LoadingStation/WithdrawalRequests'
                        getRequestWithdrawal(['bettor'])
                            .then((res) => {
                                setRequest(res)
                                console.log(res)
                            })
                            .catch((error) => console.error('Error fetching users:', error));
                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    const handleDeclinetRequest = (requestId: any, requesteeId: any, amount: any, name: any) => {

        Swal.fire({
            text: "You won't be able to revert this!",
            icon: 'warning',
            title: 'Do you want to decline this request from ' + name + '? ',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                declineWithdrawRequest({ requestId: requestId, requesteeId: requesteeId, amount: amount })
                    .then((res) => {
                        res.data
                        Swal.fire('Saved!', '', 'success')
                        getRequestWithdrawal(['bettor'])
                            .then((res) => {
                                setRequest(res)
                                console.log(res)
                            })
                            .catch((error) => console.error('Error fetching users:', error));

                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'firstName', headerName: 'Name', flex: 1 },
        { field: 'request_amount', headerName: 'Request Amount', flex: 1 },
        {
            field: 'isActive',
            headerName: 'Action',
            flex: 1,
            renderCell: (params: { row: { firstName: any; request_amount: any; id: number; userId: string }; }) => {
                // const userId = params.row.id;
                const id = params.row.id;
                const userId = params.row.userId;
                const firstName = params.row.firstName;
                const request_amount = params.row.request_amount;
                return (
                    <>
                        <Container>
                            <Button size="small" variant="contained" onClick={() => handleApproveRequest(id, userId, request_amount, firstName)}>
                                Approve
                            </Button>
                            <Button size="small" variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeclinetRequest(id, userId, request_amount, firstName)}>
                                Decline
                            </Button>
                        </Container>

                        {/* <MoreVertIcon onClick={() => handleAvatarClick} sx={{ cursor: 'pointer', margin: '0em 1em 0em 1em' }} />
                        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
                            <Paper>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleAvatarClose}
                                >
                                    <MenuItem onClick={handleAvatarClose}>load</MenuItem>
                                    <MenuItem onClick={handleAvatarClose}>Withdraw Load</MenuItem>
                                    <MenuItem onClick={() => handleDeactivateAccount(params.row.id)}>Deactivate</MenuItem>
                                    <MenuItem onClick={handleAvatarClose}>View</MenuItem>
                                </Menu>
                            </Paper>
                        </Popper> */}
                    </>

                );
            },
        },
    ];

    return (
        <Card>

            <Grid container>
                <Typography>
                    Withdral Request
                </Typography>

                <Grid item xs={0} md={12}>
                    <DataGrid rows={request} columns={columns} />
                </Grid>
            </Grid>
        </Card>
        // <Container sx={{backgroundColor:'white',padding:'10px'}}> 
        // </Container>
    );
};

export default UserTable;
