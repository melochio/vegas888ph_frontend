'use client'
import { colors } from "@/publicComponents/customStyles"
import AgentNav from "@/publicComponents/agentNav"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Container from '@mui/material/Container';
export default function Dashboard() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{color:'black'}}>
            Home
        </Link>,


    ];

    const containerStyle = {
        marginLeft: '240px',
        margin: 'auto',
        // backgroundColor: 'white', 
        height: '20vh',

    };

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
                <Grid item xs={12} sm={12} md={12}>

                    <Container style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography component="p" sx={{ color: 'black', fontSize: '14px', marginTop: '10px' }}>PLEASE TAKE NOTE OF YOUR REFFERAL LINK BELOW, ALL PLAYERS THAT WILL REGISTER UNDER THIS LINK WILL ATOMATICALLY BE UNDER YOUR ACCOUNT.

                        </Typography>
                        <Typography component="h6" sx={{ color: 'black', fontSize: '14px' }}>https://sww-5.live/register?refid=C2A7756

                        </Typography>
                        <Box>
                            <Button sx={{ backgroundColor: 'red', color: 'white', }}>
                                COPY YOUR LINK
                            </Button>
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Container style={containerStyle} sx={{ backgroundColor: '#141444', display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'left', flexDirection: 'column' }}>
                        <Typography component="h1" sx={{ color: 'white', fontSize: '20px', marginTop: '10px' }}>TOTAL WALLET


                        </Typography>

                        <Box>
                            <Typography sx={{ color: 'white', fontSize: '20px' }}>Your points:

                            </Typography>
                            <Typography component="h1" sx={{ color: 'white', fontSize: '30px' }}>0.00

                            </Typography>
                        </Box>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Container style={containerStyle} sx={{ backgroundColor: '#0c6a0c', display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'left', flexDirection: 'column' }}>
                        <Typography component="h1" sx={{ color: 'white', fontSize: '20px', marginTop: '10px' }}>TOTAL COMMISSION (3%)</Typography> 
                        <Box>
                            <Typography sx={{ color: 'white', fontSize: '20px' }}>Your points: 
                            </Typography>
                            <Typography component="h1" sx={{ color: 'white', fontSize: '30px' }}>0.00 
                            </Typography>
                        </Box>
                    </Container>
                </Grid>

            </Grid>
        </div>
    )
}