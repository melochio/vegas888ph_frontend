'use client'
import {Grid, Button, Avatar, IconButton, ButtonGroup, Typography, Card, Modal, Box, TextField} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Image from 'next/image'
import {colors} from '@pComp/customStyles'
import { useRouter } from 'next/navigation'
import MailIcon from '@mui/icons-material/Mail';
import Logo from './logo.png'
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
import { Model_Withdrawal, initialWithdrawalValue } from '@/models/wallet';
import { GetMyBalance, RequestWithdrawal } from '@/api/bettor/wallet';
import Swal from 'sweetalert2';

interface LoggedHeaderProps {}
const LoggedHeader: React.FC<LoggedHeaderProps> = () => {
  const [user, setUser] = React.useState<UserModel_Hidden>()
  const [walletBalance, setWalletBalance] = React.useState(0)
  React.useEffect(() => {
    const fetchUserData = async () => {
        const response = await fetchUser()
        if(response !== undefined) {
          const userResponse: UserModel_Hidden = response
          setUser(userResponse)
        } else {
          document.location.href = "/login"
        }
    }
    fetchUserData()
    const fetchBalance = async () => {
      const response = await GetMyBalance();
      setWalletBalance(response?.data);
    }
    fetchBalance()
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
  const [open, setOpen] = useState(false);
  const handleWalletModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const handleSubmitWithdrawal = async (event: React.FormEvent) => {
    event.preventDefault();
    const formElement = formRef.current;
    if (formElement) {
      const formData = new FormData(formElement);
      let formInput: Model_Withdrawal = initialWithdrawalValue
      formInput.firstName = formData.get('firstName');
      formInput.middleName = formData.get('middleName');
      formInput.lastName = formData.get('lastName');
      formInput.request_amount = formData.get('request_amount');
      formInput.email = formData.get('email');
      formInput.phoneNo = formData.get('phoneNo');
      const response = await RequestWithdrawal(formInput)
      if(response !== undefined) {
        Swal.fire('Success', 'Your withdrawal request has been successfully sent to your agent', 'success')
      } else {
        Swal.fire('Failed', 'Something went wrong while submitting your withdrawal request, Please try again after refreshing the page.', 'error')
      }
      handleClose()
    }
  }
  const CashOutModal = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: '#f4f4f4',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-title">CashOut Form</h2>
            <form onSubmit={handleSubmitWithdrawal} ref={formRef}>
              <div id="modal-description">
                  <TextField
                    label="First Name"
                    name='firstName'
                    variant="outlined"
                    sx={{margin: '0.5em 0em'}}
                    fullWidth
                    // Add necessary event handlers and state for inputs
                  />
                  <TextField
                    label="Middle Name"
                    name='middleName'
                    variant="outlined"
                    sx={{margin: '0.5em 0em'}}
                    fullWidth
                    // Add necessary event handlers and state for inputs
                  />
                  <TextField
                    label="Last Name"
                    name='lastName'
                    variant="outlined"
                    sx={{margin: '0.5em 0em'}}
                    fullWidth
                    // Add necessary event handlers and state for inputs
                  />
                  <TextField
                    label="Amount"
                    name='request_amount'
                    type='number'
                    variant="outlined"
                    sx={{margin: '0.5em 0em'}}
                    fullWidth
                    helperText={"Your remaining balance: "+ walletBalance.toLocaleString("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                    // Add necessary event handlers and state for inputs
                  />
                  <TextField
                    label="Email"
                    name='email'
                    type='email'
                    variant="outlined"
                    sx={{margin: '0.5em 0em'}}
                    fullWidth
                    // Add necessary event handlers and state for inputs
                  />
                  <TextField
                    label="Phone Number"
                    name='phoneNo'
                    variant="outlined"
                    sx={{margin: '0.5em 0em'}}
                    fullWidth
                    // Add necessary event handlers and state for inputs
                  />
                  <Button type="submit" variant="contained" sx={{
                      backgroundColor: colors.gold,
                      color: 'black',
                      float:'right',
                      fontWeight: 700,
                    }}
                    onClick={handleSubmitWithdrawal}
                    >
                    Submit
                  </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    );
  };
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
      <Grid item key={'logo'} xs={12} sm={4} md lg xl>
        <Image alt={'Logo'} src={Logo} quality={100} width={120} height={60} onClick={()=> 
            document.location.href = '/dashboard'} style={{
            maxHeight: 60,
            maxWidth: 120,
            width: 'auto',
            height:'auto',
            minWidth:100,
            minHeight:40,
            cursor: 'pointer',
            scale: 2.5,
        }} />
      </Grid>
      <Grid key={'user'} item xs={12} sm={8} md lg xl>
        <Grid container flexDirection={'row'} justifyContent={'flex-end'}>
          <ButtonGroup
            size="small"
            aria-label="small button group"
            sx={{ alignItems: 'center' }}
          >
            <Card sx={{ maxHeight: '30px', padding: '0rem 1rem' }}>
              <Typography variant="caption" fontWeight={800}>
                &#8369;{walletBalance.toLocaleString("en-US", {
                                    style: "decimal",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
              </Typography>
            </Card>
            <Button size={'medium'} variant="contained" onClick={handleWalletModal}>
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
          <CashOutModal />
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
          <Image alt={'Logo'} src={Logo} quality={100} width={120} height={60} style={{
                maxHeight: 60,
                maxWidth: 120,
                width: 'auto',
                height:'auto',
                minWidth:100,
                minHeight:40,
                cursor: 'pointer',
                scale: 2.5,
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
                <Image alt={'Logo'} src={Logo} quality={100} width={180} height={100} style={{
                  maxHeight: 60,
                  maxWidth: 120,
                  width: 'auto',
                  height:'auto',
                  minWidth:100,
                  minHeight:40,
                  scale: 2.5,
                }}/>
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