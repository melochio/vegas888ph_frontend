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
import { Height } from "@mui/icons-material";
import { useEffect } from "react";
import { fetchUser } from "@/api/bettor/auth";
import { UserModel_Hidden } from "@/models/users";
import React from "react";
import { GetMyBalance } from "@/api/bettor/wallet";
import { getEarnings } from "@/api/agent/wallet";
export default function Dashboard() {
    const [user, setUser] = React.useState<UserModel_Hidden>()
    const [walletAmount, setwalletAmount] = React.useState(0)
    const [totalEarnings, setTotalEarnings] = React.useState(0)
    const [claimedEarnings, setClaimedEarnings] = React.useState(0)
    const [unclaimedEarnings, setUnclaimedEarnings] = React.useState(0)
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetchUser()
            if(response !== undefined) {
            const userResponse: UserModel_Hidden = response
            setUser(userResponse)
            } else {
            // document.location.href = "/login"
            }
        }
        const fetchEarnings = async () => {
            const response = await getEarnings()
            if(response !== undefined) {
            const totalEarningsResponse = response
            setTotalEarnings(totalEarningsResponse.total_earnings)
            setClaimedEarnings(totalEarningsResponse.claimed)
            setUnclaimedEarnings(totalEarningsResponse.unclaimed)
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
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: 'black' }}>
            Home
        </Link>,


    ];

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
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('My Commission %', parseFloat(user?.commission).toFixed(2) +' %', 'black')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}} >
                    {Cards('Current Wallet', '₱ '+ walletAmount.toFixed(2), '#FFA800')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Total Earnings', '₱ '+ totalEarnings.toFixed(2), '#3699ff')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Current Earnings', '₱ '+ unclaimedEarnings.toFixed(2), '#3699ff')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Claimed Earnings', '₱ '+ Math.abs(claimedEarnings).toFixed(2), '#f64e60')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Avg Earnings (106 days)', '₱ '+ '0.00', '#1bc5bd')}
                </Grid>  
            </Grid>
        </Container>
    )
}