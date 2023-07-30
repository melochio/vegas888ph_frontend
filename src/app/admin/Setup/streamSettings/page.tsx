'use client'
import Stream_Model, { initialStreamValue } from "@/models/stream"
import { Box, Breadcrumbs, Button, Container, Grid, Link, Stack, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React from "react"
import { getStreamList } from "@/api/admin/stream";
import { SBselectedStream, SBstreamList } from "@/api/supabaseAPI";

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: 'black' }}>
        Streaming
    </Link>,
];
const containerStyle = {
    marginLeft: '240px',
    margin: 'auto',
};
export default function StreamSettings() {
    const [formInput, setFormInput] = React.useState<Stream_Model>(initialStreamValue)
    const [streamList, setStreamList] = React.useState<Stream_Model[]>([])


    const fetchStreamList = async () => {
        const gameResponse = await SBstreamList()
        if (gameResponse !== null){
            setStreamList(gameResponse)
        }
    }
    const fetchSelectedStream = async (title: string) => {
        if(title !== ""){
            const response = await SBselectedStream(title)
            if(response !== null) {
                setFormInput(response[0])
            }
        } else {
            setFormInput(initialStreamValue)
        }
    }
    React.useEffect(() => {
        fetchStreamList()
    }, [])
    
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormInput({ ...formInput, [event.currentTarget.name]: event.currentTarget.value })
    }
    
    const formSubmit = async (event: React.ChangeEventHandler<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                <Grid item xs={12} sm={12} md={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'start', padding: '20px', backgroundColor: "black" }}>
                        <Typography component="h1" sx={{ color: 'white', fontSize: '20px', marginTop: '10px' }}></Typography>
                    </Box>
                    <Container style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white' }}>
                        <Typography component="h1" sx={{ color: 'black', fontSize: '15px', marginTop: '10px' }}>Stream Settings</Typography>
                        <hr />
                        <Grid item xs={12} sm={12} md={12} container>
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="selectInput" className="form-label">Select Game Stream %</label>
                                    <select
                                        className="form-control"
                                        id="selectInput"
                                        defaultValue=""
                                        style={{ padding: '8px', }}
                                        onChange={(event) => fetchSelectedStream(event.target.value)}
                                    >
                                        <option value={''}>
                                            Select A Game
                                        </option>
                                        {streamList.map((val, i) => (
                                            <option key={i} value={val.title}>
                                                {val.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Stream ID</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.streamID}
                                        style={{
                                            padding: '8px',
                                        }}
                                        min={1}
                                        className="form-control"
                                        id="textInput"
                                        name="streamID"
                                    />
                                </div>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Title</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'text'}
                                        value={formInput.title}
                                        style={{
                                            padding: '8px',
                                        }}
                                        min={1}
                                        className="form-control"
                                        id="textInput"
                                        name="title"
                                    />
                                </div>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'flex-end'}>
                                <Button variant="contained" sx={{ margin: '10px' }} size="small" color="info" onClick={(event) => formSubmit(event)} >Initiate Games</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}