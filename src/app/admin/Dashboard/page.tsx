'use client'
import { colors } from "@/publicComponents/customStyles"
import AgentNav from "@/publicComponents/agentNav"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box, Breadcrumbs, Button, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import userMiddleware from '@/utils/middleware';
import Container from '@mui/material/Container';
import { Height } from "@mui/icons-material";
import React, { useEffect } from "react";
import supabase from "@/utils/supabase";
import { formatDate } from "@/utils/tools";
export default function Dashboard() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" sx={{ color: 'black' }}>
            Home
        </Link>,


    ]; 
    useEffect(() => {
        userMiddleware() 
    }, []);


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
    
    const [totalEarnings, setTotalEarnings] = React.useState('0.00')
    const [monthlyEarningsAdmin, setMonthlyEarningsAdmin] = React.useState('0.00')
    const [prevmonthEarningsAdmin, setprevMonthEarningsAdmin] = React.useState('0.00')
    const [totalTeamEarnings, setTeamTotalEarnings] = React.useState('0.00')
    const [teammonthlyEarnings, setteamMonthlyEarnings] = React.useState('0.00')
    const [teamprevmonthEarnings, setteamprevMonthEarnings] = React.useState('0.00')
    const [totalWithdrawals, setTotalWithdrawals] = React.useState('0.00')
    const [monthWithdrawalsAdmin, setmonthWithdrawalsAdmin] = React.useState('0.00')
    const [prevmonthWithdrawalsAdmin, setprevMonthWithdrawalsAdmin] = React.useState('0.00')
    const today = new Date();
    const thismonth = today.toLocaleString('default', { month: 'long' })
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const previousMonth = monthArray.indexOf(thismonth) === 0 ? monthArray[11] : monthArray[monthArray.indexOf(thismonth) - 1];
    const fetch_totalearnings = async () => {
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        let { data, error } = await supabase
          .rpc('admin_earnings', {
            end_date: formatDate(today), 
            start_date: formatDate(firstDay), 
          })
        
        if (error) setTotalEarnings('0.00')
        else setTotalEarnings(data)

        // let { data, error } = await supabase
        // .rpc('admin_earnings')      
        // // console.log(data)
        // if (error) return '0.00'
        // else {
        //     setTotalEarnings(data)
        // }
    }
    const fetch_monthlyEarningsAdmin = async () => {
        // const oneMonthBefore = new Date(today);
        // oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        let { data, error } = await supabase
          .rpc('admin_earnings', {
            end_date: formatDate(today), 
            start_date: formatDate(firstDay), 
          })
        
        if (error) setMonthlyEarningsAdmin('0.00')
        else setMonthlyEarningsAdmin(data)
        
        // let { data, error } = await supabase
        // .rpc('getbalancebetween', {
        //     end_date: formatDate(today), 
        //     start_date: formatDate(firstDay), 
        //     user_id: 9
        // })

        // if (error) setMonthlyEarningsAdmin('0.00')
        // else setMonthlyEarningsAdmin(data)

    }
    const fetch_lastmonthPlasada = async () => {
        const firstDay = new Date(today.getFullYear(), today.getMonth()-1, 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        let { data, error } = await supabase
        .rpc('getbalancebetween', {
        end_date: lastDayOfMonth, 
        start_date: firstDay, 
        user_id: 9
        })

        if (error) setprevMonthEarningsAdmin('0.00')
        else setprevMonthEarningsAdmin(data)

    }
    const fetch_totalWithdrawals = async () => {
        let { data, error } = await supabase
        .rpc('admin_withdrawals')      
        // console.log(data)
        if (error) setTotalWithdrawals('0.00')
        else setTotalWithdrawals(data)
    }
    const fetch_monthlyWithdrawalsAdmin = async () => {
        // const oneMonthBefore = new Date(today);
        // oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        let { data, error } = await supabase
        .rpc('getwithdrawalsbetweendates', {
            end_date: formatDate(today), 
            start_date: formatDate(firstDay), 
            user_id: 9
        })

        if (error) setmonthWithdrawalsAdmin('0.00')
        else setmonthWithdrawalsAdmin(data)
    }
    const fetch_lastmonthWithdrawals = async () => {
        const firstDay = new Date(today.getFullYear(), today.getMonth()-1, 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        let { data, error } = await supabase
        .rpc('getwithdrawalsbetweendates', {
        end_date: lastDayOfMonth, 
        start_date: firstDay, 
        user_id: 9
        })

        if (error) setprevMonthWithdrawalsAdmin('0.00')
        else setprevMonthWithdrawalsAdmin(data)

    }
    const fetch_teamearnings = async () => {
        let { data, error } = await supabase
        .rpc('team_earnings') 
        if (error) return '0.00'
        else {
            setTeamTotalEarnings(data)
        }
    }
    const fetch_teammonthlyEarnings = async () => {
        // const oneMonthBefore = new Date(today);
        // oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        let { data, error } = await supabase
        .rpc('getbalancebetween', {
            end_date: formatDate(today), 
            start_date: formatDate(firstDay), 
            user_id: 0
        })

        if (error) setteamMonthlyEarnings('0.00')
        else setteamMonthlyEarnings(data)

    }
    const fetch_teamlastmonthPlasada = async () => {
        const firstDay = new Date(today.getFullYear(), today.getMonth()-1, 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        let { data, error } = await supabase
            .rpc('getbalancebetween', {
            end_date: lastDayOfMonth, 
            start_date: firstDay, 
            user_id: 0
        })

        if (error) setteamprevMonthEarnings('0.00')
        else setteamprevMonthEarnings(data)

    }
    React.useEffect(() => {
        fetch_totalearnings()
        fetch_monthlyEarningsAdmin()
        fetch_lastmonthPlasada()
        fetch_teamearnings()
        fetch_teammonthlyEarnings()
        fetch_teamlastmonthPlasada()
        fetch_totalWithdrawals()
        fetch_monthlyWithdrawalsAdmin()
        fetch_lastmonthWithdrawals()
    })

    return (
        <Container>
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={<NavigateNextIcon   />}
                    aria-label="breadcrumb"
                    color='white'
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Grid container>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('System Total Earnings', totalEarnings, '#3699ff')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('System Earnings Month('+previousMonth+')', prevmonthEarningsAdmin, '#f64e60')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('System Earnings Month('+thismonth+')', monthlyEarningsAdmin, '#1bc5bd')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Team Total Earnings', totalTeamEarnings, '#3699ff')}
                </Grid> 
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Team Earnings Month('+previousMonth+')', teamprevmonthEarnings, '#f64e60')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Team Earnings Month('+thismonth+')', teammonthlyEarnings, '#1bc5bd')}
                </Grid> 
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Total Withdrawals', totalWithdrawals, '#3699ff')}
                </Grid> 
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Withdrawals Month('+previousMonth+')', prevmonthWithdrawalsAdmin, '#f64e60')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Withdrawals Month('+thismonth+')', monthWithdrawalsAdmin, '#1bc5bd')}
                </Grid> 
            </Grid>
        </Container>
    )
}