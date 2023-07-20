'use client'
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Card } from '@mui/joy';
import { Typography } from '@mui/material';

const columns: GridColDef[] = [ 
    { field: 'PlayerName', headerName: 'Player name', width: 130 }, 
     
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 }, 
]; 

export default function DataTable() {
    return ( 
        <Card> 
            <Typography>
                In-Active Players
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </Card>
    );
}