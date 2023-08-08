'use client'
import React from 'react'
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Model_User, { initialUser } from '../../../../models/users'
import { Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import supabase from '@/utils/supabase';
import Container from '@mui/material/Container';
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Stream_Model from '@/models/stream';
import { updateCommissionUser } from '@/api/agent/users';
import Modal from '@/publicComponents/modal'

export default function GameSettings() {

    const [editUser, setEditUser] = React.useState(false)

    const [stream, setStream] = React.useState<Stream_Model[] | []>([]);

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
                        res?.data,
                        'error'
                    )
                }

            })
    }
    const handleTableInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setCommissionRate(event.currentTarget.value)
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'gameTitle', headerName: 'Game Title', width: 200, flex:1 },
        { field: 'streamId', headerName: 'Stream ID', flex: 1 },
        // { field: 'title', headerName: 'Title', width: 200 },
        // { field: 'src', headerName: 'Source', width: 200 },
        // { field: 'passphrase', headerName: 'Passphrase', width: 200 },
        { field: 'viewState', headerName: 'View State', width: 200 },
        {
            field: 'isActive',
            headerName: 'Action',
            flex: 1,
            renderCell: (params: { row: { id: any; form: any; firstName: any; request_amount: any; userId: string }; }) => {
                // const userId = params.row.id;
                const form = params.row;
                const userId = params.row.userId;
                const index = params.row.id;
                return (
                    <>
                        <Container>
                            <Button size="small" variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleOpenModal(index)}>
                                Edit
                            </Button>
                        </Container>
                    </>

                );
            },
        },


    ];

    const getRowId = (row: { id: string }) => row.id;
    const fetchData = async () => {
        const { data: stream_configuration, error } = await supabase
            .from("stream_configuration")
            .select('*');

        if (error) {
            console.error('Error fetching data:', error.message);
        } else {
            setStream(stream_configuration);
        }
    }

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = (index: any) => {
        setSelectedId(index)
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const [streamId, setStreamId] = React.useState('');
    const [selectedId, setSelectedId] =React.useState<number>(0);
    const handleUpdate = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to Update this Setting? ',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                const { data, error } = await supabase
                    .from('stream_configuration')
                    .update({ streamId: streamId })
                    .eq('id', selectedId)
                    .select()

                if (error) { 
                    Swal.fire('Changes are not saved', '', 'info')
                    setIsModalOpen(false);
                } else {
                    Swal.fire('Changes are saved', '', 'success')
                    setIsModalOpen(false);
                    fetchData()
                }

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    React.useEffect(() => {
        fetchData()
    }, []);
    
    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                <h2>Game Settings</h2>
                <Grid item xs={12} sm={12} md={12} style={{ marginLeft: '10px' }}>
                    <Grid item xs={6} sm={6} md={12}>
                        <h3>
                            
                            Game Title : {selectedId > 0 ? stream.filter(e => e.id == selectedId).map(e => e.gameTitle) : ''}
                        </h3>
                        <h3>
                            Stream ID : {selectedId > 0 ? stream.filter(e => e.id == selectedId).map(e => e.streamId) : ''} 
                        </h3>
                        {/* <h3>
                            Title : {selectedId > 0 ? stream.filter(e => e.id == selectedId).map(e => e.title) : ''}  

                        </h3> */}
                        {/* <h3>
                            Passphrase : {selectedId > 0 ? stream.filter(e => e.id == selectedId).map(e => e.passphrase) : ''}   
                        </h3> */}
                        <h3>
                            View State :{selectedId > 0 ? stream.filter(e => e.id == selectedId).map(e => e.viewState) : ''}   
                        </h3>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <label htmlFor="textInput" className="form-label">Stream Id</label>
                        <input
                            type={'text'}
                            style={{
                                padding: '8px',
                            }}
                            onChange={(e) => {
                                setStreamId(e.currentTarget.value)
                            }}
                            className="form-control"
                            id="textInput"
                            name="fullName"
                        />
                    </div>
                </Grid>
                <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant='contained' color='primary' onClick={() => handleUpdate()}>Update</Button>
                    <Button variant='contained' color='error' onClick={() => handleCloseModal()}>Close</Button>
                </Grid>
            </Modal>
            {stream.length > 0 ? (
                <Card>
                    <Typography>
                        GAME CONFIGURATION
                    </Typography>
                    <DataGrid
                        rows={stream}
                        columns={columns}
                        getRowId={getRowId}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection={false}
                    />
                </Card>
            ) : <h1>loading</h1>
            }
        </>
    )
}


