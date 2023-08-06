'use client'
import * as React from 'react';
import './style.module.css'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import userMiddleware from '@/utils/middleware';
import axios from 'axios';
import supabase from '@/utils/supabase';
import './style.module.css'
import { logout } from '@/api/bettor/auth';
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
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  React.useEffect(() => {
    userMiddleware()
  }, [])
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleRoutes = (target: string) => {
    if (target == 'Dashboard') {
      router.push('/admin/Dashboard');
    }
    else if (target == 'Accounts') { 
      router.push('/admin/Setup/Account'); 
    } 
    else if (target == 'Game Settings') { 
      router.push('/admin/Setup/GameSettings');
    } 
    
    else if (target == 'Events') { 
      router.push('/admin/Setup/Events'); 
    } 
    else if (target == 'Wallet') { 
      router.push('/admin/LoadingStation/Wallet');  
    }
    else if (target == 'Commission') {
      router.push('/admin/LoadingStation/Commision');   
    }
    else if (target == 'Withdrawal Requests') {
      router.push('/admin/LoadingStation/WithdrawalRequests');    
    }
    else if (target == 'Messages') {
      router.push('/admin/Support/Messages');    
    }
  } 
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{
        backgroundColor: 'rgb(40, 42, 48)',
        borderBottom: 'solid 2px ' + colors.gold,
        display: 'flex',
        justifyContent: 'space-between'
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
              <Avatar onClick={handleAvatarClick} sx={{ cursor: 'pointer', margin: '0em 1em 0em 1em' }} />
              <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleAvatarClose}
                  >
                    <MenuItem onClick={()=>router.push('/agent/Profile')} >View Profile</MenuItem>
                    <MenuItem onClick={()=>router.push('/agent/ChangePassword')} >Change password</MenuItem> 
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Paper>
              </Popper> 
              <Typography variant='body1' style={{ color: 'white', display: 'flex', alignItems: 'center' }}></Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#242939',

          },

        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <span></span> 
          
          <Image alt={'Logo'} src={Logo} quality={100} width={120} height={100} style={{ margin: '5px' }} />
          <IconButton onClick={handleDrawerClose} sx={{ alignItems: 'right' }}>
            <ArrowBackIcon  style={{ color: 'white' }} />
          </IconButton>
        </DrawerHeader>
        <Typography sx={{
          textAlign:'center',
          fontSize: '.9rem',
          color: 'white',

          // borderBottom: 'solid 1px ' + colors.gold
        }} >
          ADMIN USER
        </Typography>
        <Typography sx={{
          marginLeft: '10px',
          fontSize: '.9rem',
          color: '#989EB3',

          // borderBottom: 'solid 1px ' + colors.gold
        }} >
          SETUP
        </Typography>
        <List
        >
          {['Events','Accounts','Game Settings'].map((text, index) => (
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
                  <AssessmentSharpIcon style={{ color: 'white' }} />
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
          LOADING STATION
        </Typography>
        <List>
          {['Wallet', 'Commission', 'Withdrawal Requests'].map((text, index) => (
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
        </List>
        <Divider />
        <Typography sx={{
          marginLeft: '10px',
          fontSize: '.9rem',
          color: '#989EB3',

        }} >
          SUPPORT
        </Typography>
        <List>
          {['Messages'].map((text, index) => (
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
                  <MailIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <Typography sx={{ fontSize: '.8rem' }} onClick={() => handleRoutes(text)} >
                  {text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))} 
        </List>
      </Drawer>

      <Main open={open} sx={{ backgroundColor: '#eaf1f7', minHeight: '100vh',marginTop:'10px' }} >
        <DrawerHeader sx={{ backgroundColor: '#31343d' }} />
        <Container maxWidth='xl' sx={{marginTop: '50px' }} >
          {children}
        </Container>
      </Main>
    </Box>
  );
}