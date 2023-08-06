'use client'
import Typography from '@mui/joy/Typography';
import { CreateEvents, fetchEvent } from '@/api/admin/event'
import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Container from '@mui/material/Container';
import React from "react";
import Swal from "sweetalert2";
import { currentGame } from "@/api/bettor/game";
import Game_Model from "@/models/game";
import LoadingButton from '@mui/lab/LoadingButton';
import supabase from '@/utils/supabase';

export default function Accounts() {
    const [currentGameState, setCurrentGameState] = React.useState<Game_Model>()
    const [buttonState, setButtonState] = React.useState(false)
    const fetchCurrentGame = async () => {
        // const gameResponse = await currentGame()
        // if (gameResponse !== undefined){
        //     setCurrentGameState(gameResponse.data)
        // }
        const { data, error } = await supabase
        .from('sabong_histories')
        .select('*')
        .or('result.eq.CLOSED,result.eq.OPEN,result.is.null')
        .order('id', { ascending: true })
        if(data !== null) {
            setCurrentGameState(data[0])
        }
    }
    React.useEffect(() => {
        fetchCurrentGame()
    }, [])
    const [formInput, setFormInput] = React.useState({
        numberOfFights: 1,
        plasada: '0.05'
    })
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: 'black' }}>
            Events
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

    const formSubmit = async (event: React.ChangeEventHandler<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setButtonState(true)
        fetchCurrentGame()
        if (currentGameState?.id === undefined) {
            const response = await CreateEvents(formInput).then((val) => {
                if(val !== undefined) {
                    Swal.fire(
                        'Success',
                        'Event Was Initialized Successfully',
                        'success'
                    );
                    setButtonState(false)
                }
            }).catch((err)=>{
                Swal.fire(
                    'Failed',
                    err,
                    'error'
                )
                setButtonState(false)
            })
        } else {
            Swal.fire('Ongoing Event', 'Looks like there are still ongoing event at the moment. Try again later', 'error')
            setButtonState(false)
        }
    }
    const plasadaOptions = [
        {code: '5%', value: '0.05'},
        {code: '6%', value: '0.06'},
        {code: '7%', value: '0.07'},
        {code: '8%', value: '0.08'},
        {code: '9%', value: '0.09'},
        {code: '10%', value: '0.10'},
        {code: '11%', value: '0.11'},
        {code: '12%', value: '0.12'},
        {code: '13%', value: '0.13'},
        {code: '14%', value: '0.14'},
        {code: '15%', value: '0.15'},
    ]
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
                        <Typography component="h1" sx={{ color: 'black', fontSize: '15px', marginTop: '10px' }}>Events Management</Typography>
                        <hr />
                        <Grid item xs={12} sm={12} md={12} container>
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="selectInput" className="form-label">Plasada %</label>
                                    <select
                                        className="form-control"
                                        id="selectInput"
                                        defaultValue=""
                                        style={{ padding: '8px', }}
                                        onChange={(event) => handleInput(event)}
                                        name="plasada"
                                    >
                                        {plasadaOptions.map((option) => (
                                            <option key={option.code} value={option.value}>
                                                {option.code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <label htmlFor="textInput" className="form-label">Number of Fights</label>
                                    <input
                                        onChange={(event) => handleInput(event)}
                                        type={'number'}
                                        value={formInput.numberOfFights}
                                        style={{
                                            padding: '8px',
                                        }}
                                        min={1}
                                        className="form-control"
                                        id="textInput"
                                        name="numberOfFights"

                                    />
                                </div>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'flex-end'}>
                                <LoadingButton loading={buttonState} variant="contained" sx={{ margin: '10px' }} size="small" color="info" onClick={(event) => formSubmit(event)} >Initiate Games</LoadingButton>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}