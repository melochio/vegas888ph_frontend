'use client'
import { colors } from "@/publicComponents/customStyles"
import AgentNav from "@/publicComponents/agentNav"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {getWalletSummary} from '@/api/agent/wallet'
import Container from '@mui/material/Container';
import React from "react";
import MoneyFormat from '@/publicComponents/MoneyFormat'
import wallet from "@/models/wallet";
export default function Home() { 
    const [walletAmount,setwalletAmount] = React.useState(0)
    const fetchWallet = async () => {
        try {
            const walletSummary= await getWalletSummary(); 
            // console.log('walletSummary',walletSummary)
            setwalletAmount(walletSummary.walletAmount)
             
        } catch (error) {
            console.error('Error fetching data:', error);
            // setUserList([]); // Set an empty array if there's an error or no data
        }
    };
    React.useEffect(() => {
        fetchWallet();
    }, []);
    const containerStyle = {
        marginLeft: '240px',
        margin: 'auto',
        // backgroundColor: 'white', 
        height: '20vh',

    };

    return (
        <div> 
            <Grid item spacing={2}>
                <Grid item xs={12} sm={12} md={12}>

                    <Grid style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography component="p" sx={{ color: 'black', fontSize: '14px', marginTop: '10px',textAlign:'center' }}>PLEASE TAKE NOTE OF YOUR REFFERAL LINK BELOW, ALL PLAYERS THAT WILL REGISTER UNDER THIS LINK WILL ATOMATICALLY BE UNDER YOUR ACCOUNT.

                        </Typography>
                        <Typography component="h6" sx={{ color: 'black', fontSize: '14px' }}>https://sww-5.live/register?refid=C2A7756

                        </Typography>
                     
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Container style={containerStyle} sx={{ backgroundColor: '#141444', display: 'flex', padding: '10px', justifyContent: 'space-between', alignItems: 'left', flexDirection: 'column' }}>
                        <Typography component="h1" sx={{ color: 'white', fontSize: '20px', marginTop: '10px' }}>TOTAL WALLET


                        </Typography>

                        <Box>
                            <Typography sx={{ color: 'white', fontSize: '20px' }}>Your points:

                            </Typography>
                            <Typography component="h1" sx={{ color: 'white', fontSize: '30px' }}>{MoneyFormat(walletAmount)}

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