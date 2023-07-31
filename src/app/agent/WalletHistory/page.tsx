'use client'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { getWalletHistory } from '@agentApi/wallet'
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
        getWalletHistory()
            .then((res) => {
                setRequest(res)
                console.log(res)
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);  
    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 }, 
        { field: 'amount', headerName: 'Amount', flex: 1 }, 
        { field: 'created_at', headerName: 'Datetime', flex: 1 }, 
        
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