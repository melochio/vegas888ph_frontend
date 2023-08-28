'use client'
import {Grid, Button, Avatar, IconButton, ButtonGroup, Typography, Card, Modal, Box, TextField, Select, Fab, ListItem, ListItemText, Container, Input, List} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Image from 'next/image'
import {colors} from '@pComp/customStyles'
import { useRouter } from 'next/navigation'
import MailIcon from '@mui/icons-material/Mail';
import Logo from './logo.png'
import React, { MouseEventHandler, memo, useMemo, useState } from 'react'
import {
    Menu,
    MenuItem,
    Popper,
    Paper,
  } from '@mui/material';
import axios from 'axios';
import Model_User, { UserModel_Hidden } from '@/models/users';
import { changePassword, fetchUser, logout } from '@/api/bettor/auth';
import { Model_Withdrawal, initialWithdrawalValue } from '@/models/wallet';
import { GetMyBalance, RequestWithdrawal, TransactionList } from '@/api/bettor/wallet';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import SBAPI from '@utils/supabase'
import userMiddleware from '@/utils/middleware';
import { stringToShortDate } from '@/utils/tools';
import SendIcon from '@mui/icons-material/Send';

interface LoggedHeaderProps {}
const LoggedHeader = ({walletAmount}: {walletAmount?: number}) => {
  React.useEffect(() => {
    userMiddleware()
  })
  const [user, setUser] = React.useState<UserModel_Hidden>()
  const [isProfileViewOpen, setIsProfileViewOpen] = useState(false);
  const [walletBalance, setWalletBalance] = React.useState(0)
  const [messages, setMessages] = useState<messagesType[]>([])
  const [chatOpen, setChatOpen] = useState(false)
  
  type messagesType = {
    id: number,
    text: string,
    sender: number, //userId
    recepient: string, //userId
    created_at: Date, //userId
  }
  React.useEffect(() => {
    const fetchUserData = async (): Promise <UserModel_Hidden| undefined> => {
      try {
        const { data: { user } } = await SBAPI.auth.getUser()
        let { data: users, error } = await SBAPI
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
    const fetchMessages = async () => {
      const currentuser = await fetchUserData();
      if (currentuser !== undefined) {
        let { data, error } = await SBAPI
        .from('chats')
        .select('*')
        .or(`sender.eq.${currentuser.id},recipient.eq.${currentuser.id}`)
        .order('created_at', {ascending: true})
        if(data !== null) {
          setMessages(data)
        }
      }
    }
    const fetchBalance = async () => {
      const currentuser = await fetchUserData();
      if (currentuser !== undefined) {
        let { data: getwalletbalance, error } = await SBAPI
        .from('getwalletbalance')
        .select('*')
        .eq('id', currentuser.id)
        // console.log(getwalletbalance)
        if(getwalletbalance !== null) {
            setWalletBalance(getwalletbalance[0].wallet_amount !== null ? getwalletbalance[0].wallet_amount : 0.00)
        }
      }
    }
    fetchUserData()
    fetchBalance()
    fetchMessages()
    
    const chats = SBAPI.channel('schema-db-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: '*' },
      (payload: any) => {
        fetchMessages()
        fetchUserData()
        fetchBalance()
      }
    )
    .subscribe();
  }, [])
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    let { error } = await SBAPI.auth.signOut()
    document.location.href = "/login" 
  }
  const [open, setOpen] = useState(false);
  const handleWalletModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [cashout, setCashout] = React.useState<string>("")
  const handleSubmitWithdrawal = async (event: React.FormEvent) => {
    event.preventDefault();
    const formElement = formRef.current;
    if (formElement) {
      const formData = new FormData(formElement);
      let formInput: Model_Withdrawal = initialWithdrawalValue
      console.log(walletBalance-parseFloat(formInput.request_amount))
      console.log(walletBalance)
      if(walletBalance < walletBalance-parseFloat(formInput.request_amount)){
        Swal.fire('Failed', 'Insufficient Balance', 'error')
        return
      }
      if(walletBalance <= 0){
        Swal.fire('Failed', 'Insufficient Balance', 'error')
        return
      }
      if(walletBalance-parseFloat(formInput.request_amount) <= 0){
        Swal.fire('Failed', 'Insufficient Balance', 'error')
        return
      }
      formInput.firstName = formData.get('firstName');
      formInput.middleName = formData.get('middleName');
      formInput.lastName = formData.get('lastName');
      formInput.request_amount = formData.get('request_amount');
      formInput.email = formData.get('email');
      formInput.phoneNo = formData.get('phoneNo');
      formInput.address = formData.get('address');
      formInput.transaction_type = cashout === "GCASH" ? cashout : cashout === "PERA_PADALA" ? cashout : formData.get('transaction_type');
      // const response = await RequestWithdrawal(formInput)

      const { data: { user } } = await SBAPI.auth.getUser()
      let { data: users, error } = await SBAPI
        .from('users')
        .select('*')
        .eq('email', user?.email)
        if(users !== null) {
          const { data:withdraw_data, error: withdraw_error } = await SBAPI
          .from('withdraw_requests')
          .insert({
            status: "REQUEST",
            userId: users[0].id,
            firstName: formInput.firstName,
            email: formInput.email,
            phoneNo: formInput.phoneNo,
            request_amount: formInput.request_amount,
            approvedById: users[0].user_origin,
            transaction_type: formInput.transaction_type,
          })
          // const { data:deposit_to_data, error: deposit_to_error } = await SBAPI
          // .from('wallets')
          // .insert({
          //   amount: formInput.request_amount * -1,
          //   createdById: users[0].id, 
          //   userId: users[0].id,
          //   sentTo: users[0].user_origin === null ? 9 : users[0].user_origin,
          //   remarks: '', 
          //   type: "DEPOSIT"
          // })

          // const { data:receivedfrom_data, error: receivedfrom_error } = await SBAPI
          // .from('wallets')
          // .insert({
          //   amount: formInput.request_amount,
          //   createdById: users[0].id, 
          //   userId: users[0].user_origin === null ? 9 : users[0].user_origin,
          //   receivedFrom: users[0].id,
          //   remarks: '', 
          //   type: "RECEIVED",
          // })
          
        }
      if(users) {
        Swal.fire('Success', 'Your withdrawal request has been successfully sent to your agent', 'success')
      } else {
        Swal.fire('Failed', 'Something went wrong while submitting your withdrawal request, Please try again after refreshing the page.', 'error')
      }
      handleClose()
    }
  }
  const BankComponent = () => {
    return (
      <div>
          <h2 id="modal-title">Bank Transfer Form</h2>
          <form onSubmit={handleSubmitWithdrawal} ref={formRef}>
            <div id="modal-description">
                <TextField
                  label="Bank Name"
                  name='transaction_type'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  // Add necessary event handlers and state for inputs
                />
                <TextField
                  label="Account Holder"
                  name='firstName'
                  variant="outlined"
                  size={'small'}
                  sx={{margin: '0.5em 0em'}}
                  fullWidth
                  // Add necessary event handlers and state for inputs
                />
                <TextField
                  label="Account Number"
                  name='phoneNo'
                  variant="outlined"
                  size={'small'}
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
                  size={'small'}
                  fullWidth
                  helperText={"Remaining balance: " + (walletAmount === undefined ? walletBalance : walletAmount)}
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
      </div>
    )
  }
  const PadalaComponent = () => {
    return (
      <div>
          <h2 id="modal-title">Remittance Form</h2>
          <form onSubmit={handleSubmitWithdrawal} ref={formRef}>
            <div id="modal-description">
                <TextField
                  label="Name"
                  name='firstName'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  // Add necessary event handlers and state for inputs
                />
                <TextField
                  label="Address"
                  name='address'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  // Add necessary event handlers and state for inputs
                />
                <TextField
                  label="Phone Number"
                  name='phoneNo'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  // Add necessary event handlers and state for inputs
                />
                <TextField
                  label="Amount"
                  name='request_amount'
                  type='number'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  helperText={"Remaining balance: " + (walletAmount === undefined ? walletBalance : walletAmount)}
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
      </div>
    )
  }
  const GcashComponent = () => {
    return (
      <div>
          <h2 id="modal-title">GCASH Transfer Form</h2>
          <form onSubmit={handleSubmitWithdrawal} ref={formRef}>
            <div id="modal-description">
                <TextField
                  label="GCASH Name"
                  name='firstName'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  // Add necessary event handlers and state for inputs
                />
                <TextField
                  label="GCASH Number"
                  name='phoneNo'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  // Add necessary event handlers and state for inputs
                />
                <TextField
                  label="Amount"
                  name='request_amount'
                  type='number'
                  variant="outlined"
                  sx={{margin: '0.5em 0em'}}
                  size={'small'}
                  fullWidth
                  helperText={"Remaining balance: " + (walletAmount === undefined ? walletBalance : walletAmount)}
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
      </div>
    )
  }
  const CashOutModal = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          sx={{zIndex: 1040}}
        >
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              maxWidth: '320px',
              bgcolor: '#f4f4f4',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant='h6'>
              Select A Cashout Method
            </Typography>
            <Select
                sx={{
                    width: '80%'
                }}
                value={cashout}
                size={'small'}
                onChange={(event) => setCashout(event.target.value)}
            >
                <MenuItem value={"BANK"}>BANK</MenuItem>
                <MenuItem value={"PERA_PADALA"}>Pera Padala</MenuItem>
                <MenuItem value={"GCASH"}>GCASH</MenuItem>
            </Select>
            
              {cashout === "BANK" && <BankComponent />}
                {cashout === "PERA_PADALA" && <PadalaComponent />}
                {cashout === "GCASH" && <GcashComponent /> }
          </Box>
        </Modal>
      </div>
    );
  };
  
  interface Transaction {
    id: number,
    amount: number,
    type: string,
    datetime: Date,
    remarks: string
  }

  interface TransactionHistoryModalProps {
    open: boolean;
    transactions: Transaction[];
    onClose: () => void;
  }
  const columns = [
    { field: 'datetime', headerName: 'Datetime', width: 200,
    valueGetter: (params:any) => {
      return stringToShortDate(params.row.datetime);
    }, },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'type', headerName: 'Type', width: 150},
    { field: 'remarks', headerName: 'Remarks', width: 350 },
  ];
  const TransactionHistoryModal = ({ open, transactions, onClose }: {open: boolean, transactions: Transaction[], onClose: () => void}) => {
    // const rows = transactions.map((transaction, index) => ({ id: index, ...transaction }));
    console.log(transactions)
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 500,
          }}
        >
          <DataGrid
            rows={transactions}
            columns={columns}
            disableRowSelectionOnClick
            checkboxSelection={false}
            sx={{maxHeight: '40vh'}}
          />
          <Button onClick={onClose} variant="contained" color="secondary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    );
  };
  interface ProfileModalProps {
    open: boolean;
    onClose: () => void;
  }
  
  const handleOpenProfileView = () => {
    setIsProfileViewOpen(true);
  };

  const handleCloseProfileView = () => {
    setIsProfileViewOpen(false);
  };
  const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
    const [playerName, setPlayerName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    };
  
    const handleSaveProfile = () => {
      if (password !== confirmPassword) {
        setPasswordError('Password and Confirm Password do not match');
      } else {
        // Save the profile changes here
        onClose();
      }
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography variant='h5'>
            Update Profile
          </Typography>
          <TextField
            fullWidth
            label="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            variant="outlined"
            error={password !== confirmPassword}
            helperText={passwordError}
          />
          <Button onClick={handleSaveProfile} variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
          <Button onClick={onClose} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([])
  const handleOpenModal = () => {
    const fetch = async () => {
      let { data: wallets, error } = await SBAPI
        .from('wallets')
        .select('*')
        .eq('userId', user?.id)  
        if(wallets !== null) {
          let list: Transaction[] = []
          wallets.map((val: any, index: number) => {
            list.push({id: index, type: val.type, amount: val.amount, datetime:  new Date(val.created_at), remarks: val.remarks})
          })
          list.sort((a, b) => {
            return (b.datetime as Date).getTime() - (a.datetime as Date).getTime();
          });
          setTransactionsData(list)
        }    
      // const response = await TransactionList();
      // if(response !== undefined) {
      //   const responseData= response.data
      //   let list: Transaction[] = []
      //   responseData.map((val: any, index: number) => {
      //     list.push({id: index, type: val.type, amount: val.amount, datetime: val.created_at})
      //   })
      //   setTransactionsData(list)
      // }
    }
    fetch()
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const ChatButton = memo(() => {
    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="secondary" aria-label="add"
          onClick={() => setChatOpen(chatOpen ? false : true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            }}>
          <MailIcon />
        </Fab>
      </Box>
    );
  })
  const ChatBox =  React.memo(() => {
    const [message, setMessage] = useState("");
    const onSendMessage = async (text: string) => {
      const { data, error } = await SBAPI
      .from('chats')
      .insert([
        { text: text, sender: user?.id, recipient: 9},
      ])
    }
    const handleSendMessage = () => {
      onSendMessage(message);
      setMessage("");
    };

    const containerRef = React.useRef<any | null>(null);

    // Scroll to the bottom of the container when the selectedChat changes
    React.useEffect(() => {
        if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);
    
    const MessageComponent = {
      me: (props: messagesType) => {
          return (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Paper elevation={3} sx={{width: 'fit-content', padding: 1.5, backgroundColor: "lightgray"}}>
                      {props.text}
                  </Paper>
                  <Typography variant="caption" sx={{color: 'lightgray'}}>
                      {stringToShortDate(props.created_at)}
                  </Typography>
              </Grid>
          )
      }, 
      other: (props: messagesType) => {
          return ( 
              <Grid item xs={12} sm={12} md={12} lg={12} display={'grid'} justifyContent={'end'} justifyItems={'end'}>
                  <Paper sx={{width: 'fit-content', padding: 1.5, backgroundColor: '#8ed0ff'}}>
                      {props.text}
                  </Paper>
                  <Typography variant="caption" sx={{color: 'lightgray'}}>
                      {stringToShortDate(props.created_at)}
                  </Typography>
              </Grid>
          )
      }
  }
    return (
      <Container
        maxWidth={'xs'}
      >
        <Paper sx={{
          padding: '2em 1em',
          backgroundColor: '#282a30'
        }}>
          <Typography variant="h5" sx={{color: 'white'}}>Admin Support</Typography>
          <div style={{
              border: '1px solid #e1e1e1',
              borderRadius: '1rem'
            }}>
            <Grid container columns={12} sx={{maxHeight: '40vh', overflowY: 'auto'}} ref={containerRef}>
                {
                    messages.map((val, i) => (
                        val.sender === 9 ? MessageComponent.me(val):MessageComponent.other(val)
                    ))
                }
            </Grid>
            {/* <List sx={{maxHeight: '50vh', overflowY: 'auto'}} ref={containerRef}>
              {messages.map((message) => (
                <ListItem key={message.id}>
                  <ListItemText
                    primary={message.message}
                    secondary={(message.sender !== 9 ? "Sent" : "Received") + " " + new Date(message.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  />
                </ListItem>
              ))}
            </List> */}
            <div style={{display: 'flex', margin: '0rem 1rem 1rem 1rem'}}>
                <Input
                    placeholder="Enter your message"
                    value={message}
                    fullWidth
                    sx={{
                        backgroundColor: '#4f4f4fad',
                        color: 'white'
                    }}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <IconButton 
                    color="primary"
                    onClick={handleSendMessage}>
                    <SendIcon />
                </IconButton>
            </div>
          </div>
        </Paper>
      </Container>
    );
  })
  const [changePassword_open, setChangePassword_open] = useState(false);
  const changePassword_close = () => {
    setChangePassword_open(false)
  }
  const ChangePassword_Component = ({ open, onClose }: {open: boolean, onClose: any}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = React.useState('')

    const handleChangePassword = async () => {
      // Handle the password change logic here
      // You can compare newPassword and confirmPassword, make API calls, etc.
      // Reset the form fields after the change
      if(newPassword.length < 6) {
        setPasswordError("Password must be 6 characters and above")
        return
      }
      if(newPassword === confirmPassword) {
        const response = await changePassword({newPassword: newPassword, currentPassword: currentPassword})
        console.log(response.response.data)
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose(); // Close the modal
      } else {
        setPasswordError('Password does not match')
      }
    };
    return (
      <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          outline: 'none',
        }}
      >
        <h2>Change Password</h2>
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          helperText={ passwordError }
          FormHelperTextProps={{style: {color: 'red'}}}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleChangePassword}>
          Submit
        </Button>
      </Box>
    </Modal>
    )
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
      sx={{
        backgroundColor: 'rgb(40, 42, 48)',
        borderBottom: 'solid 2px ' + colors.gold,
      }}
    >
      <Grid item key={'logo'} xs={12} sm={4} md lg xl>
        <ProfileModal open={isProfileViewOpen} onClose={handleCloseProfileView} />
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
                &#8369;{walletAmount === undefined ? walletBalance : walletAmount}
              </Typography>
            </Card>
            <Button size={'medium'} variant="contained" onClick={handleWalletModal} sx={{display: 'flex', flexDirection: 'column', padding: '5px'}}>
              <AccountBalanceWalletIcon />
              <Typography sx={{fontSize: '10px', lineHeight: 1}} variant='caption'>CASHOUT</Typography>
            </Button>
          </ButtonGroup>
          <Avatar onClick={handleAvatarClick} sx={{cursor:'pointer', margin: '0em 1em 0em 1em'}} />
          <Typography variant='body1' style={{color: 'white', display:'flex', alignItems:'center'}}>{user?.player_name}</Typography>
          <TransactionHistoryModal open={isModalOpen} transactions={transactionsData} onClose={handleCloseModal} />
          <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
            <Paper>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAvatarClose}
              >
                {/* <MenuItem onClick={handleOpenProfileView}>View Profile</MenuItem> */}
                <MenuItem onClick={handleOpenModal}>Transaction History</MenuItem>
                <MenuItem onClick={() => setChangePassword_open(true)}>Change Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Paper>
          </Popper>
          <CashOutModal />
        </Grid>
      </Grid>
      {
        user?.user_origin === null &&
        <div>
          <ChatButton />
          <div style={{display: chatOpen ? 'block': 'none',
            position: 'fixed',
            bottom: 36,
            right: 36,
            zIndex: 5}}>
            <ChatBox />
          </div>
        </div>
      }
      <ChangePassword_Component open={changePassword_open} onClose={changePassword_close}/>
    </Grid>
  );
};
const DeclaratorHeader = () => {
  const [user, setUser] = React.useState<UserModel_Hidden>()
  React.useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //       const response = await fetchUser()
    //       if(response === undefined) {
    //         document.location.href = '/login'
    //       } else {
    //         const userResponse: UserModel_Hidden = response
    //         setUser(userResponse)
    //       }
    //   } catch(err) {
    //     document.location.href = '/login'
    //   }
    // }
    // fetchUserData()
  }, [])
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout()
    let { error } = await SBAPI.auth.signOut()
    document.location.href = "/login" 
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
    React.useEffect(() => {
      userMiddleware()
    })
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