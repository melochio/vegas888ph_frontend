'use client'
import {Grid, Button, Avatar, IconButton, ButtonGroup, Typography, Card} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Image from 'next/image'
import {colors} from '@pComp/customStyles'
import { useRouter } from 'next/navigation'
import MailIcon from '@mui/icons-material/Mail';
import Logo from './vegas888logo.png'
import React, { MouseEventHandler, useState } from 'react'
import {
    Menu,
    MenuItem,
    Popper,
    Paper,
  } from '@mui/material';
import axios from 'axios';
import Model_User, { UserModel_Hidden } from '@/models/users';
import { fetchUser, logout } from '@/api/bettor/auth';

interface LoggedHeaderProps {}
const LoggedHeader: React.FC<LoggedHeaderProps> = () => {
  const [user, setUser] = React.useState<UserModel_Hidden>()
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await fetchUser()
          if(response !== undefined) {
            const userResponse: UserModel_Hidden = response
            setUser(userResponse)
          } else {
            document.location.href = "/login"
          }
      } catch(err) {
        document.location.href = "/login"
      }
    }
    fetchUserData()
  }, [])
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      const response = await logout()
      if (response) {
        document.location.href = '/login'
      }
    } catch (err) {
    }
  }
  
    return (
      <Grid
        container
        flexDirection={'row'}
        alignItems={'center'}
        columns={12}
        pr={'6%'}
        pl={'6%'}
        pt={'1%'}
        pb={'1%'}
        mb={'3%'}
        sx={{
          backgroundColor: 'rgb(40, 42, 48)',
          borderBottom: 'solid 2px ' + colors.gold,
        }}
      >
        <Grid item xs={12} sm={4} md lg xl>
          <Image alt={'Logo'} src={Logo} quality={100} width={120} height={60} onClick={()=> 
              document.location.href = '/dashboard'} style={{
            maxHeight: 60,
            maxWidth: 120,
            width: 'auto',
            height:'auto',
            minWidth:100,
            minHeight:40,
            cursor: 'pointer'
          }} />
        </Grid>
        <Grid item xs={12} sm={8} md lg xl>
          <Grid container flexDirection={'row'} justifyContent={'flex-end'}>
            <ButtonGroup
              size="small"
              aria-label="small button group"
              sx={{ alignItems: 'center' }}
            >
              <Card sx={{ maxHeight: '30px', padding: '0rem 1rem' }}>
                <Typography variant="caption" fontWeight={800}>
                  &#8369;0.00
                </Typography>
              </Card>
              <Button size={'medium'} variant="contained">
                <AccountBalanceWalletIcon />
              </Button>
            </ButtonGroup>
            <Avatar onClick={handleAvatarClick} sx={{cursor:'pointer', margin: '0em 1em 0em 1em'}} />
            <Typography variant='body1' style={{color: 'white', display:'flex', alignItems:'center'}}>{user?.player_name}</Typography>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
              <Paper>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleAvatarClose}
                >
                  <MenuItem onClick={handleAvatarClose}>View Profile</MenuItem>
                  <MenuItem onClick={handleAvatarClose}>Transaction History</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Paper>
            </Popper>
          </Grid>
        </Grid>
      </Grid>
    );
};
const DeclaratorHeader = () => {
  const [user, setUser] = React.useState<UserModel_Hidden>()
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await fetchUser()
          if(response === undefined) {
            document.location.href = '/login'
          } else {
            const userResponse: UserModel_Hidden = response
            setUser(userResponse)
          }
      } catch(err) {
        document.location.href = '/login'
      }
    }
    fetchUserData()
  }, [])
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      const response = await logout()
      if (response) {
        document.location.href = '/login'
      }
    } catch (err) {
    }
  }
  return(
      <Grid
        container
        flexDirection={'row'}
        alignItems={'center'}
        columns={12}
        pr={'6%'}
        pl={'6%'}
        pt={'1%'}
        pb={'1%'}
        sx={{
          backgroundColor: 'rgb(40, 42, 48)',
          borderBottom: 'solid 2px ' + colors.gold,
        }}
      >
        <Grid item xs={12} sm={4} md lg xl>
          <Image alt={'Logo'} src={Logo} quality={100} width={120} height={60} onClick={()=> 
              document.location.href = '/dashboard'} style={{
            maxHeight: 60,
            maxWidth: 120,
            width: 'auto',
            height:'auto',
            minWidth:100,
            minHeight:40,
            cursor: 'pointer'
          }} />
        </Grid>
        <Grid item xs={12} sm={8} md lg xl>
          <Grid container flexDirection={'row'} justifyContent={'flex-end'}>
            <Avatar onClick={handleAvatarClick} sx={{cursor:'pointer', margin: '0em 1em 0em 1em'}} />
            <Typography variant='body1' style={{color: 'white', display:'flex', alignItems:'center'}}>{user?.player_name}</Typography>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
              <Paper>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleAvatarClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Paper>
            </Popper>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default function Header() {
    const router = useRouter()
    return (
        <Grid container flexDirection={'row'} alignItems={'center'} columns={12} pr={10} pl={10} pt={3} pb={3} mb={6} sx={{
                backgroundColor: 'rgb(40, 42, 48)', borderBottom: 'solid 2px ' + colors.gold
            }}>
            <Grid item sm md lg xl xs={12}>&nbsp;</Grid>
            <Grid item sm md lg xl xs={12} textAlign={'center'}>
                <Image alt={'Logo'} src={Logo} quality={100} width={180} height={100}/>
                {/* <Button href='/' variant={'text'} sx={{paddingLeft: 6, paddingRight: 6, border: 0, fontSize: 27, color: colors.gold}}>VEGAS 888</Button> */}
            </Grid>
            <Grid item sm md lg xl xs={12}>
                <Grid container flexDirection={'row'} justifyContent={'flex-end'}>
                    <Button href='/register' sx={{padding: '1em 2em', fontWeight: 700, 
                        color: colors.lightBlack, backgroundColor: colors.gold, 
                        border: '2px solid' + colors.silver,'&:hover':{
                            backgroundColor: colors.gold+"99"
                        }}}>SIGN UP <ArrowForwardIcon /> </Button>
                    <Button href='/login' variant={'text'} sx={{paddingLeft: 6, paddingRight: 6,
                        border: 0, color: colors.silver, fontWeight: 700}}>LOGIN</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export {
    LoggedHeader,
    DeclaratorHeader
}