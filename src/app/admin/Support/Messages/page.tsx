'use client'
import { Card, CardContent, Container, Divider, Grid, ListItem, ListItemButton, Typography, ListItemText, Paper, Button, Input, IconButton } from "@mui/material";
import { text } from "stream/consumers";
import MailIcon from '@mui/icons-material/Mail';
import SBAPI from '@utils/supabase'
import React from "react";
import { stringToShortDate } from "@/utils/tools";
import SendIcon from '@mui/icons-material/Send';

type messagesType = {
    id: number,
    message: string,
    sender: number, //userId
    recepient: number, //userId
    created_at: Date, //userId
    sender_name: string, //userId
}
export default function Messages() {
    const [list, setList] = React.useState<messagesType[]>([])
    const [selectedChat, setSelectedChat] = React.useState<messagesType[]>([])
    const [selectedSender, setSelectedSender] = React.useState<number | null>(null)
    const [message, setMessage] = React.useState("")
    const fetch = async () => {
        let { data, error } = await SBAPI
        .rpc('getchats')
        
        if (error) console.error(error)
        else setList(data)
    }
    const fetchCurrentChats = async () => {
        let { data, error } = await SBAPI
        .rpc('getchats_byid', {
            input_id: selectedSender
        })
        .order('created_at', {ascending: true})

        if (error) console.error(error)
        else setSelectedChat(data)
    }
    React.useEffect(() => {
        const chats = SBAPI.channel('custom-insert-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'chats' },
          (payload:any) => {
            fetch()
            fetchCurrentChats()
          }
        )
        .subscribe()
    }, [selectedSender])
    React.useEffect(() => {
        fetch()
    }, [])
    const handleSelectedChat = async (sender: number) => {
        setSelectedSender(sender)
    }
    React.useEffect(() => {
        fetchCurrentChats()
    }, [selectedSender])
    const MessageComponent = {
        me: (props: messagesType) => {
            return (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Paper elevation={3} sx={{width: 'fit-content', padding: 1.5, backgroundColor: "lightgray"}}>
                        {props.message}
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
                        {props.message}
                    </Paper>
                    <Typography variant="caption" sx={{color: 'lightgray'}}>
                        {stringToShortDate(props.created_at)}
                    </Typography>
                </Grid>
            )
        }
    }
    const handleSendMessage = () => {
        const onSendMessage = async (text: string) => {
            const { data, error } = await SBAPI
            .from('chats')
            .insert([
                { text: text, sender: 9, recipient: selectedSender},
            ])
            setMessage("")
        }
        if(message !== ""){
            onSendMessage(message)
        }
    }
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Scroll to the bottom of the container when the selectedChat changes
    React.useEffect(() => {
        if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [selectedChat]);
    return (
            <Card>
                <Grid container columns={12} sx={{ minHeight: '75vh'}}>
                    <Grid item sm={2} xs={2} md={3} lg={3} sx={{backgroundColor: '#282a30'}}>
                        <Paper sx={{ overflowY: 'auto', maxHeight: '100%'}}>
                            {
                                list.map((value, key) => (
                                    <div>
                                        <ListItem key={key + "_" + value.sender} disablePadding sx={{backgroundColor: selectedSender === value.sender ? '#42b9ff' : '#a3ddff'}}>
                                            <ListItemButton onClick={() => handleSelectedChat(value.sender)}>
                                                <Typography variant={'body2'} fontWeight={700}>{value.sender_name}</Typography><br />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))
                            }
                        </Paper>
                    </Grid>
                    <Grid item sm={10} xs={10} md={9} lg={9} padding={4} borderLeft={'solid #cccccc 1px'}
                    display={'flex'} flexDirection={'column'} justifyContent={'space-between'}  sx={{backgroundColor: '#282a30'}}>
                    {
                        selectedChat.length > 0 ?
                        <Grid container columns={12} sx={{maxHeight: '70vh', overflowY: 'auto'}} ref={containerRef}>
                            {
                                selectedChat.map((val, i) => (
                                    val.sender === 9 ? MessageComponent.me(val):MessageComponent.other(val)
                                ))
                            }
                        </Grid>
                        :
                        <div style={{minHeight: '100%', minWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography variant="body2" sx={{
                                color: "lightgray"
                            }}>NO MESSAGE SELECTED</Typography>
                        </div>
                    }
                    {
                        selectedSender !== null &&
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
                    }
                    </Grid>
                </Grid>
            </Card>
    )
}