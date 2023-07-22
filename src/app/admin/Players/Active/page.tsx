'use client'
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Card } from '@mui/joy';
import { Typography } from '@mui/material';

import Swal from "sweetalert2"
import fetchUser from '@agentApi/users'



const columns: GridColDef[] = [
    { field: 'name', headerName: 'Player name', width: 200 },  
]; 
const handleApprovalBtn = () => {  
    Swal.fire({
        title: 'Do you want to approve this request ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Decline`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
};
export default function DataTable() {
    const [userlist, setUserlist] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUser();
                setUserlist(users); // Assuming `users` is an array of objects with the 'PlayerName' property
            } catch (error) {
                console.error('Error fetching data:', error);
                // setUserList([]); // Set an empty array if there's an error or no data
            }
        };

        fetchData();
    }, []);
    return (
        <Card>
            <Typography>
                Active Players
            </Typography>
            <DataGrid
                rows={userlist}
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
    );
}


