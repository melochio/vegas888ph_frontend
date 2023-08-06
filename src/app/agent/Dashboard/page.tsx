'use client'

import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Container from '@mui/material/Container';
import { useEffect } from "react";
import { fetchUser } from "@/api/bettor/auth";
import { UserModel_Hidden } from "@/models/users";
import React from "react";
import { GetMyBalance } from "@/api/bettor/wallet";
import { getEarnings } from "@/api/agent/wallet";  
import userMiddleware from '@/utils/middleware';
import supabase from '@/utils/supabase';

export default function Dashboard() {
    const [user, setUser] = React.useState<UserModel_Hidden>()
    const [walletAmount, setwalletAmount] = React.useState(0)
    const [totalEarnings, setTotalEarnings] = React.useState(0)
    const [claimedEarnings, setClaimedEarnings] = React.useState(0)
    const [unclaimedEarnings, setUnclaimedEarnings] = React.useState(0)
    const [avgEarnings, setAvgEarnings] = React.useState(0)
    useEffect(() => {
        userMiddleware()
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            let { data: users, error } = await supabase
              .from('users')
              .select('*')
              .eq('email', user?.email)
            
            if(users !== null) {
                setUser(users[0])
            }
            // const response = await fetchUser()
            // if (response !== undefined) {
            //     const userResponse: UserModel_Hidden = response
            //     setUser(userResponse)
            // } else {
            //     // document.location.href = "/login"
            // }
        }
        const fetchEarnings = async () => {
            const response = await getEarnings()
            if (response !== undefined) {
                const totalEarningsResponse = response
                setTotalEarnings(parseFloat(totalEarningsResponse.total_earnings))
                setClaimedEarnings(totalEarningsResponse.claimed)
                setUnclaimedEarnings(totalEarningsResponse.unclaimed)
                setAvgEarnings(totalEarningsResponse.avg)

            } else {
                // document.location.href = "/login"
            }
        }
        const fetchBalance = async () => {
            const response = await GetMyBalance();
            setwalletAmount(response?.data);
        }
        fetchBalance()
        fetchEarnings()
        fetchUserData()
    }, [])

    const [isCopied, setIsCopied] = React.useState(false); 
    const handleCopyClick = async () => {
        try {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = process.env.NEXT_PUBLIC_URL+'/register?refCode='+user?.referral_code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
          
                setIsCopied(true);
              } catch (error) {
                console.error('Failed to copy text:', error);
              }
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: 'black' }}>
            Home
        </Link>,


    ];
    const containerStyle = {
        marginLeft: '240px',
        margin: 'auto',
        // backgroundColor: 'white', 
        height: '20vh',

    };

    const Cards = (title: string, value: string, color: string) => {
        return (
            <Container >
                <Typography component="p" sx={{ padding: '10px 0px 10px 30px', color: 'white', fontSize: '20px', margin: '0px', backgroundColor: color }}>
                    {title}
                </Typography>
                <Typography component="h6" sx={{ padding: '30px', color: 'black', fontSize: '25px', backgroundColor: 'white' }}>{value}
                </Typography>
            </Container>
        )
    }
    return (
        <Container>
            <Stack spacing={2}>

                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    color='white'
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>

                    <Grid style={containerStyle} sx={{ borderTop: '6px solid red', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography component="p" sx={{ color: 'black', fontSize: '14px', marginTop: '10px',textAlign:'center' }}>PLEASE TAKE NOTE OF YOUR REFFERAL LINK BELOW, ALL PLAYERS THAT WILL REGISTER UNDER THIS LINK WILL ATOMATICALLY BE UNDER YOUR ACCOUNT.

                        </Typography>
                        <Typography component="h6" sx={{ color: 'black', fontSize: '14px' }}>{process.env.NEXT_PUBLIC_URL+'/register?refCode='+user?.referral_code}

                        </Typography>
                        <Box>
                            <Button variant='contained' sx={{ backgroundColor: 'red', color: 'white', }} onClick={handleCopyClick}>
                                {isCopied ? 'Copied!' : 'COPY YOUR LINK'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{ paddingTop: '30px' }}>
                    {Cards('My Commission %', parseFloat(user?.commission).toFixed(2) + ' %', 'black')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{ paddingTop: '30px' }} >
                    {Cards('Current Wallet', '₱ ' + walletAmount.toFixed(2), '#FFA800')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{ paddingTop: '30px' }}>
                    {Cards('Total Earnings', '₱ ' + totalEarnings.toFixed(2), '#3699ff')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{ paddingTop: '30px' }}>
                    {Cards('Current Earnings', '₱ ' + unclaimedEarnings.toFixed(2), '#3699ff')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{ paddingTop: '30px' }}>
                    {Cards('Claimed Earnings', '₱ ' + Math.abs(claimedEarnings).toFixed(2), '#f64e60')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{ paddingTop: '30px' }}> 
                    {Cards('Avg Earnings (111 days)', '₱ ' + Math.abs(avgEarnings).toFixed(2), '#f64e60')} 
                </Grid>
            </Grid>
        </Container>
    )
}

 
