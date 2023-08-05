'use client'
import * as React from 'react';
import './style.module.css'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MoneyFormat from '@/publicComponents/MoneyFormat'
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { colors } from '@pComp/customStyles'
import { Avatar, Button, ButtonGroup, Card, Container, Grid, Menu, MenuItem, Paper, Popper } from '@mui/material';
import Logo from '@/publicComponents/logo.png'
import Image from 'next/image'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import axios from 'axios';
import { getWalletSummary } from '@/api/agent/wallet'
import { GetMyBalance } from '@/api/bettor/wallet';
import userMiddleware from '@/utils/middleware';
import supabase from '@/utils/supabase';
import Footer from '@/publicComponents/footer'
import { Height } from '@mui/icons-material';
import { logout } from '@/api/bettor/auth';
import { UserModel_Hidden } from '@/models/users';
// const drawerWidth = 240;
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0, 
    position: 'fixed',
    width:'100%',
    right:`-${drawerWidth/3}px`
    
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  // height:'100%',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));
type UserModel = {
  created_at: any,
  email: any,
  email_verified_at: any,
  id: any,
  name: any,
  player_name: any,
  pp_filepath: any,
  updated_at: any,
  user_level: string | any,
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [walletAmount, setwalletAmount] = React.useState(0)
  // const fetchWallet = async () => {
  //   try {
  //     const walletSummary = await getWalletSummary();
  //     // console.log('walletSummary',walletSummary)
  //     setwalletAmount(walletSummary.walletAmount)

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // setUserList([]); // Set an empty array if there's an error or no data
  //   }
  // };
    const fetchUserData = async (): Promise <UserModel_Hidden| undefined> => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        let { data: users, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', user?.email)
          if(users !== null) {
            setUser(users[0])
            return users[0]
          }
      } catch {
      }
    }
  React.useEffect(() => {
    const fetchBalance = async () => {
      const currentuser = await fetchUserData();
      if (currentuser !== undefined) {
        let { data: getwalletbalance, error } = await supabase
        .from('getwalletbalance')
        .select('*')
        .eq('id', currentuser.id)
        // console.log(getwalletbalance)
        if(getwalletbalance !== null) {
            setwalletAmount(getwalletbalance[0].wallet_amount !== null ? getwalletbalance[0].wallet_amount : 0.00)
        }
      }
    }
    fetchBalance()
    // fetchWallet();
  }, []);

  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleRoutes = (target: string) => {
    if (target == 'Dashboard') {
      router.push('/agent/Dashboard');
      // window.location.href = '/agent/Dashboard'
    }
    else if (target == 'Wallet') {
      router.push('/agent/LoadingStation/Wallet');
    }
    else if (target == 'Commission') {
      router.push('/agent/LoadingStation/Commission');
    }
    else if (target == 'Withdrawal Requests') {
      router.push('/agent/LoadingStation/WithdrawalRequests');
    }
    else if (target == 'Deposits') {
      window.location.href = '/agent/Players/Deposit';
    }
    else if (target == 'Withdrawals') {

      window.location.href = '/agent/Players/Withdrawal';
    }
    else if (target == 'Active Agent') {
      router.push('/agent/Active');
    }
    else if (target == 'Deactivated Agent') {
      router.push('/agent/InActive');
    }
    else if (target == 'Active Players') {
      router.push('/agent/Players/Active');
    }
    else if (target == 'For Approvals') {
      router.push('/agent/Players/forApproval');
    }

    else if (target == 'Deactivated') {
      router.push('/agent/Players/InActive');
    }
  }

  const [user, setUser] = React.useState<UserModel>()
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/bettor/tokenValue', null, {
          withCredentials: true,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        const userResponse: UserModel = response.data
        if (response === undefined) {
          document.location.href = '/login'
        } else {
          setUser(userResponse)
        }
      } catch (err) {
        document.location.href = '/login'
      }
    }
    fetch()
  }, [])
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      let { error } = await supabase.auth.signOut()
        await logout()
        document.location.href = '/login'
    } catch (err) {
      document.location.href = '/login' 
    }
  }

  React.useEffect(() => {
    userMiddleware()
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          position: 'relative',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#242939',

          },

        }}
        variant="persistent"
        // anchor="left"
        open={open}
      >
        <DrawerHeader>
          <span></span>
          <Image alt={'Logo'} src={Logo} quality={100} width={120} height={100} style={{ margin: '5px' }} />
          <IconButton onClick={handleDrawerClose} sx={{ alignItems: 'right' }}>
            <ArrowBackIcon style={{ color: 'white' }} />
          </IconButton>
        </DrawerHeader>
        <Typography sx={{
          textAlign: 'center',
          fontSize: '.9rem',
          color: 'white',
          marginTop: '20px'

          // borderBottom: 'solid 1px ' + colors.gold
        }} >
          {user?.player_name}<br />
          {user?.user_level}
        </Typography>
        <Divider />
        <Typography sx={{
          marginLeft: '10px',
          fontSize: '.9rem',
          color: '#989EB3',

          // borderBottom: 'solid 1px ' + colors.gold
        }} >
          GENERAL
        </Typography>
        <List
        >
          <ListItem disablePadding sx={{
            color: '#989EB3',
            '&:hover': {
              backgroundColor: '#31343d',
              color: 'white',
              cursor: 'pointer',
            },
          }}>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentSharpIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <Typography sx={{ fontSize: '.8rem' }} onClick={() => router.push("/agent/Dashboard")} >
                Dashboard
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{
            color: '#989EB3',
            '&:hover': {
              backgroundColor: '#31343d',
              color: 'white',
              cursor: 'pointer',
            },
          }}>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentSharpIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <Typography sx={{ fontSize: '.8rem' }} onClick={() => router.push("/agent/Account")} >
                Accounts
              </Typography>
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding sx={{
              color: '#989EB3',
              '&:hover': {
                backgroundColor: '#31343d',
                color: 'white',
                cursor: 'pointer',
              },
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <AssessmentSharpIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <Typography sx={{ fontSize: '.8rem' }} onClick={() => router.push("/agent/CommissionHistory")} >
                  Commission History
                </Typography>
              </ListItemButton>
            </ListItem> */}
        </List>
        <Divider />
        <Typography sx={{
          marginLeft: '10px',
          fontSize: '.9rem',
          color: '#989EB3',

        }} >
          LOADING STATION
        </Typography>
        <List>
          <ListItem disablePadding sx={{
            color: '#989EB3',
            '&:hover': {
              backgroundColor: '#31343d',
              color: 'white',
              cursor: 'pointer',
            },
          }}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceWalletIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <Typography sx={{ fontSize: '.8rem' }} onClick={() => { router.push('/agent/LoadingStation/Wallet') }} >
                Wallet
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{
            color: '#989EB3',
            '&:hover': {
              backgroundColor: '#31343d',
              color: 'white',
              cursor: 'pointer',
            },
          }}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceWalletIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <Typography sx={{ fontSize: '.8rem' }} onClick={() => { router.push('/agent/LoadingStation/Commision') }} >
                Commission
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{
            color: '#989EB3',
            '&:hover': {
              backgroundColor: '#31343d',
              color: 'white',
              cursor: 'pointer',
            },
          }}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceWalletIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <Typography sx={{ fontSize: '.8rem' }} onClick={() => { router.push('/agent/LoadingStation/WithdrawalRequests') }} >
                Withdrawal Requests
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
        <Typography sx={{
          marginLeft: '10px',
          fontSize: '.9rem',
          color: '#989EB3',
          display: user?.user_level === 'master agent' ? 'block' : 'none',
        }} >
          AGENTS
        </Typography>
        <List style={{
          display: user?.user_level == 'master agent' ? 'block' : 'none',
          // Add other CSS properties as needed
          // For example:
          // color: 'red',
          // fontSize: '16px',
        }}>
          {['Active Agent', 'Deactivated Agent'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{
              color: '#989EB3',
              '&:hover': {
                backgroundColor: '#31343d',
                color: 'white',
                cursor: 'pointer',
              },
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxSharpIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <Typography sx={{ fontSize: '.8rem' }} onClick={() => handleRoutes(text)} >
                  {text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography sx={{
          marginLeft: '10px',
          fontSize: '.9rem',
          color: '#989EB3',

        }} >
          PLAYERS
        </Typography>
        <List>
          {['Active Players', 'For Approvals', 'Deactivated'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{
              color: '#989EB3',
              '&:hover': {
                backgroundColor: '#31343d',
                color: 'white',
                cursor: 'pointer',
              },
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxSharpIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <Typography sx={{ fontSize: '.8rem' }} onClick={() => handleRoutes(text)} >
                  {text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <Typography sx={{
          marginLeft: '10px',
          fontSize: '.9rem',
          color: '#989EB3',

        }} >
          PLAYERS CASH IN/OUT
        </Typography>
        <List>
          {['Deposits', 'Withdrawals'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{
              color: '#989EB3',
              '&:hover': {
                backgroundColor: '#31343d',
                color: 'white',
                cursor: 'pointer',
              },
            }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBalanceWalletIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <Typography sx={{ fontSize: '.8rem' }} onClick={() => handleRoutes(text)} >
                  {text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <AppBar position="fixed" open={open} sx={{
        backgroundColor: 'rgb(40, 42, 48)',
        borderBottom: 'solid 2px ' + colors.gold,
        display: 'flex',
        justifyContent: 'space-between',
        Height: '10px'
      }}>
        <Toolbar sx={{ display: 'flex' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Grid item sm md lg xl xs={12}>
            <Image alt={'Logo'} src={Logo} quality={100} width={120} height={100} style={{ margin: '5px' }} />
            {/* <Button href='/' variant={'text'} sx={{paddingLeft: 6, paddingRight: 6, border: 0, fontSize: 27, color: colors.gold}}>VEGAS 888</Button> */}
          </Grid>
          <Grid item xs={12} sm={8} md lg xl>
            <Grid container flexDirection={'row'} justifyContent={'flex-end'}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex' }}>
                  <ButtonGroup
                    size="small"
                    aria-label="small button group"
                    sx={{ alignItems: 'center' }}
                  >
                    <Card sx={{ maxHeight: '30px', padding: '0rem 1rem' }}>
                      <Typography variant="caption" fontWeight={800}>
                        &#8369;{walletAmount.toLocaleString("en-US", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Card>
                    <Button size={'medium'} variant="contained" onClick={() => router.push('/agent/RequestFormWithdrawal')} >
                      <AccountBalanceWalletIcon />
                    </Button>
                  </ButtonGroup>
                  <Avatar onClick={handleAvatarClick} sx={{ cursor: 'pointer', margin: '0em 1em 0em 1em' }} />
                </Box>
                {/* <Typography variant='body1' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>{user?.player_name}</Typography> */}
              </Box>
              <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleAvatarClose}
                  >
                    <MenuItem onClick={() => router.push('/agent/Profile')} >View Profile</MenuItem>
                    <MenuItem onClick={() => router.push('/agent/WithdrawalHistory')} >Withdrawal History</MenuItem>
                    <MenuItem onClick={() => router.push('/agent/WalletHistory')} >Wallet History</MenuItem>
                    <MenuItem onClick={() => router.push('/agent/ChangePassword')} >Change password</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Paper>
              </Popper>
              <Typography variant='body1' style={{ color: 'white', display: 'flex', alignItems: 'center' }}></Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Main open={open} sx={{ backgroundColor: '#eaf1f7', height: '100%', overflow: 'auto' }} >
        <Grid item style={{ margin: '0 auto',marginTop:'calc(10vh + 50px)', height: '100vh' }}>
          {children}
        </Grid>
      </Main>
    </Box>
  );
}