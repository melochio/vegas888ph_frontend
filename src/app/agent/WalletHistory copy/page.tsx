'use client'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { getRequestWithdrawal, approvedRequestWithdrawal, declineWithdrawRequest } from '@agentApi/wallet'
import { fetchUser,deactivateUser } from '@/api/agent/users'
import { Box, Button, Container, Grid, Menu, MenuItem, Paper, Popper, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';
import Card from '@mui/joy/Card';
import router from 'next/router';
import userMiddleware from '@/utils/middleware';
interface User {
    // id: number;
    name: string;
    isActive: boolean;
}

const UserTable: React.FC = () => {
    const [request, setRequest] = React.useState<User[]>([]);

    useEffect(() => {
        userMiddleware() 
        fetchUser(['bettor'], 'active')
            .then((res) => {
                setRequest(res)
                console.log(res)
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []); 
    const handleDeactivateUser = (userId:any) => {

        Swal.fire({ 
            icon: 'warning',
            title: 'Do you want to deactivate this account ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deactivateUser(userId)
                    .then((res) => { 
                        Swal.fire('Saved!', '', 'success')
                        fetchUser(['bettor'], 'active')
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
        // { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 }, 
        { field: 'request_amount', headerName: 'Request Amount', flex: 1 }, 
        { field: 'status', headerName: 'Status', flex: 1 }, 
        // {
        //     field: 'isActive',
        //     headerName: 'Action',
        //     flex: 1,
        //     renderCell: (params: { row: { firstName: any; request_amount: any; id: number; userId: string }; }) => {
        //         // const userId = params.row.id;
        //         const id = params.row.id;
        //         const userId = params.row.userId;
        //         const firstName = params.row.firstName;
        //         const request_amount = params.row.request_amount;
        //         return (
        //             <>
        //                 <Container>  
        //                     <Button size="small" variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeactivateUser(id)}>
        //                         Deactivate
        //                     </Button>
        //                 </Container> 
        //             </>

        //         );
        //     },
        // },
    ];

    return (
        <Card>

            <Grid container>
                <Typography>
                    Withdrawal History
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
