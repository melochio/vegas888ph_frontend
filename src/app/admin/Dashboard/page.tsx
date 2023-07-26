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
import { useEffect } from "react";
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
                    {Cards('My Commission %', '0.00', 'black')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}} >
                    {Cards('Current Wallet', '0.00', '#FFA800')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Total Earnings', '0.00', '#3699ff')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Current Earnings', '0.00', '#3699ff')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Claimed Earnings', '0.00', '#f64e60')}
                </Grid>
                <Grid item xs={12} sm={12} md={4} style={{paddingTop:'30px'}}>
                    {Cards('Avg Earnings (106 days)', '0.00', '#1bc5bd')}
                </Grid>  
            </Grid>
        </Container>
    )
}