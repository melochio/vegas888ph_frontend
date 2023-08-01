'use client'
import { Card, CardContent, Container, Divider, Grid, ListItem, ListItemButton, Typography, ListItemText, Paper } from "@mui/material";
import { text } from "stream/consumers";
import MailIcon from '@mui/icons-material/Mail';
import SBAPI from '@utils/supabase'
import React from "react";

type messagesType = {
    id: number,
    text: string,
    sender: string, //userId
    recepient: string, //userId
    created_at: Date, //userId
}
interface GroupedChats {
    [senderId: string]: messagesType[];
}
export default function Messages() {
    const [list, setList] = React.useState<messagesType[]>([])
    const fetch = async () => {
        let { data, error } = await SBAPI
        .from('chats')
        .select('*')
        
        const groupedChats: GroupedChats = {};
        data?.forEach((chat: messagesType) => {
            if(chat.sender !== "admin"){
                const sender = chat.sender;
                if (!groupedChats[sender]) {
                    groupedChats[sender] = [];
                }
                groupedChats[sender].push(chat);
            }
        });
        console.log(groupedChats)
    }
    React.useEffect(() => {
        fetch()
    }, [])
    return (
        <Container>
            <Card>
                <Grid container columns={12} sx={{ minHeight: '75vh'}}>
                    <Grid item sm={6} xs={6} md={3} lg={3}>
                        <Paper sx={{ overflowY: 'auto', maxHeight: '100%'}}>
                            <ListItem key={1} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={'test'} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem key={1} disablePadding>
                                <ListItemButton>
                                    <Typography variant={'body2'} fontWeight={700}>TEST TITLE</Typography><br />
                                </ListItemButton>
                            </ListItem>
                        </Paper>
                    </Grid>
                    <Grid item sm={6} xs={6} md={9} lg={9}>
                        <Paper sx={{minHeight: '100%', minWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography variant="body2" sx={{
                                color: "lightgray"
                            }}>NO MESSAGE SELECTED</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}