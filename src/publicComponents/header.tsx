'use client'
import {Grid, Button, Avatar, IconButton, ButtonGroup, Typography} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Image from 'next/image'
import {colors} from '@pComp/customStyles'
import { useRouter } from 'next/navigation'
import MailIcon from '@mui/icons-material/Mail';
import Logo from './vegas888logo.png'

const LoggedHeader = () => {
    return (
        <Grid container flexDirection={'row'} alignItems={'center'} columns={12} pr={10} pl={10} pt={3} pb={3} mb={6} sx={{
                backgroundColor: 'rgb(40, 42, 48)', borderBottom: 'solid 2px ' + colors.gold
            }}>
            <Grid item sm md lg xl xs textAlign={'left'}>
                <Image alt={'Logo'} src={Logo} quality={100} width={120} height={60}/>
            </Grid>
            <Grid item sm md lg xl xs>
                <Grid container flexDirection={'row'} justifyContent={'flex-end'}>
                    <ButtonGroup size="small" aria-label="small button group">
                        <Typography variant='caption'>text</Typography>
                        <Button size='small' variant='contained'><AccountBalanceWalletIcon /></Button>
                    </ButtonGroup>
                    <Button href='/' variant={'text'}><Avatar/></Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default function Header() {
    const router = useRouter()
    return (
        <Grid container flexDirection={'row'} alignItems={'center'} columns={12} pr={10} pl={10} pt={3} pb={3} mb={6} sx={{
                backgroundColor: 'rgb(40, 42, 48)', borderBottom: 'solid 2px ' + colors.gold
            }}>
            <Grid item sm md lg xl xs>
                <Button href='/' variant={'text'} sx={{
                    paddingLeft: 6, paddingRight: 6,border: 0, color: colors.silver, fontWeight: 700,fontSize: 18
                    }}>Sabong</Button>
                <Button href='/' variant={'text'} sx={{
                    paddingLeft: 6, paddingRight: 6,border: 0, color: colors.silver, fontWeight: 700,fontSize: 18
                    }}>Other Games</Button>
            </Grid>
            <Grid item sm md lg xl xs textAlign={'center'}>
                <Image alt={'Logo'} src={Logo} quality={100} width={180} height={100}/>
                {/* <Button href='/' variant={'text'} sx={{paddingLeft: 6, paddingRight: 6, border: 0, fontSize: 27, color: colors.gold}}>VEGAS 888</Button> */}
            </Grid>
            <Grid item sm md lg xl xs>
                <Grid container flexDirection={'row'} justifyContent={'flex-end'}>
                    <Button href='/register' variant='contained' sx={{padding: '1em 2em', fontWeight: 700, color: colors.lightBlack, backgroundColor: colors.gold, border: '2px solid' + colors.silver}}>SIGN UP <ArrowForwardIcon /> </Button>
                    <Button href='/login' variant={'text'} sx={{paddingLeft: 6, paddingRight: 6,border: 0, color: colors.silver, fontWeight: 700}}>LOGIN</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export {
    LoggedHeader
}