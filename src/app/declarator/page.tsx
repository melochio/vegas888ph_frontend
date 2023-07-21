'use client'
import { currentGame, getStream } from "@/api/bettor/game"
import Game_Model, { initialGameValue } from "@/models/game"
import Stream_Model, { initialStreamValue } from "@/models/stream"
import React from "react"
import MuxPlayer from "@mux/mux-player-react"; 
import { Button, Grid, Typography } from "@mui/material"
import { colors } from "@/publicComponents/customStyles"
import { updateGameResult } from "@/api/declarator/http"
import CircleIcon from '@mui/icons-material/Circle';
import socket from "@/utils/webSocket"

export default function Declarator() {
    const [currentGameState, setCurrentGameState] = React.useState<Game_Model>(initialGameValue)
    const [streamData, setStreamData] = React.useState<Stream_Model>(initialStreamValue)
    type statusType = "OPEN" | "CLOSED" | "MERON" | "WALA" | "CANCELLED" | "FAILED" | "DRAW"
    const handleResult = async (status: statusType) => {
        await updateGameResult(currentGameState.gameNo, status)
        setCurrentGameState({...currentGameState, result: status})
    }
    React.useEffect(() => {
        // socket.on('sabong_currentDetails-channel:App\\Events\\sabong_currentDetails', (data: any) => {
        //   // Handle the received users data
        //   console.log(data)
        // });
    
        // Clean up the event listener when the component is unmounted
        // return () => {
        //   socket.off('sabong_currentDetails-channel:App\\Events\\sabong_currentDetails');
        // };
    }, []);
    React.useEffect(() => {
        const fetchCurrentGame = async () => {
            const gameResponse = await currentGame()
            if (gameResponse !== undefined){
                setCurrentGameState(gameResponse.data)

            }
        }
        fetchCurrentGame()
        const fetchCurrentStream = async () => {
            const gameResponse = await getStream()
            if (gameResponse !== undefined){
                setStreamData(gameResponse.data)

            }
        }
        fetchCurrentStream()
    }, [])
    const LiveStreamComponent = () => {
        return (
          <div style={{
            minWidth: '100%',
          }}>
            <MuxPlayer
                streamType="ll-live"
                playbackId={streamData.streamID}
                autoPlay={true}
                metadata={{
                    video_id: "video-id-54321",
                    video_title: "Test video title",
                    viewer_user_id: "user-id-007",
                }}
            />
          </div>
        );
    };
    
    const GameHeader = (
        {fight_num, bettingStatus, expFights, streamStatus}: 
        {fight_num: string, bettingStatus: null | "OPEN" | "CLOSED", expFights: string, streamStatus: "Private" | "Public"} ) => {
        return (
            <div>
                <Grid columns={12} container flexDirection={"row"} justifyContent={'space-between'}>
                    <Grid item md sm xs>
                        <Typography sx={{color: 'white'}} variant="h6">Fight #{fight_num}</Typography>
                    </Grid>
                    <Grid item md sm xs textAlign={'right'}>
                        <Typography sx={{color: 'white', display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}
                        variant="body2">Last Call <CircleIcon style={{color: bettingStatus === "OPEN" ? 'green': bettingStatus === "CLOSED" ?'red':'white', paddingLeft: '10px'}} /></Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{color: 'white'}}>
                    <Typography variant="caption" sx={{backgroundColor:'red', padding: '5px', borderRadius: '3px', color: 'white'}}>MIRROR</Typography>
                    {streamStatus} Sabong
                    <Typography variant="caption" sx={{color: 'white'}}>({expFights} exp. fights)</Typography>
                </Typography>
            </div>
        )
    }
    const BettingControls = () => {
        return (
            <div>
                <Grid columns={12} container>
                    <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Typography variant="h4" sx={{fontWeight: 700, color: 'white', textAlign: 'center'}}>Betting Controls</Typography>
                    </Grid>
                    <Grid margin={'auto'} item sm={12} xs={12} md={6} lg={6} xl={4}>
                        <div style={{backgroundColor: '#005700', color: 'white', minWidth: '100%', textAlign:'center', padding: '1em 0em'}}>
                            OPEN BETTING
                        </div>
                        <div style={{backgroundColor: 'green', minWidth: '100%', textAlign:'center', padding: '2em 0em'}}>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                fontWeight: 700,
                                width: '50%'
                            }}
                            onClick={() => handleResult('OPEN')}
                            >OPEN</Button>
                        </div>
                    </Grid>
                    <Grid margin={'auto'} item sm={12} xs={12} md={6} lg={6} xl={4}>
                        <div style={{backgroundColor: '#535353', color: 'white', minWidth: '100%', textAlign:'center', padding: '1em 0em'}}>
                            CLOSE BETTING
                        </div>
                        <div style={{backgroundColor: 'gray', minWidth: '100%', textAlign:'center', padding: '2em 0em'}}>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                fontWeight: 700,
                                width: '50%'
                            }}
                            onClick={() => handleResult('CLOSED')}
                            >CLOSE</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
    const WinnerControls = () => {
        return (
            <div>
                <Grid columns={12} container>
                    <Grid item sm={12} md={12} xs={12} lg={12} xl={12}>
                        <Typography variant="h4" sx={{fontWeight: 700, color: 'white', textAlign: 'center'}}>Declare Winner</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={3} xl={3}>
                        <div style={{backgroundColor: 'maroon', color: 'white', minWidth: '100%', textAlign:'center', padding: '1em 0em'}}>
                            MERON
                        </div>
                        <div style={{backgroundColor: 'red', minWidth: '100%', textAlign:'center'}}>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                                {/* 400,000.<Typography sx={{color: 'white'}} variant="caption">00</Typography> */}
                                0.00
                            </Typography>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                marginBottom: '2rem',
                                fontWeight: 700,
                                width: '50%'
                            }}
                            onClick={() => handleResult('MERON')}
                            >MERON</Button>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={3} xl={3}>
                        <div style={{backgroundColor: '#0404b1', color: 'white', textAlign:'center', padding: '1em 0em'}}>
                            WALA
                        </div>
                        <div style={{backgroundColor: 'blue', textAlign:'center'}}>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                                0.00
                            </Typography>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                marginBottom: '2rem',
                                fontWeight: 700,
                                width: '50%'
                            }}
                            onClick={() => handleResult('WALA')}
                            >WALA</Button>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={3} xl={3}>
                        <div style={{backgroundColor: '#005700', color: 'white', minWidth: '100%', textAlign:'center', padding: '1em 0em'}}>
                            DRAW
                        </div>
                        <div style={{backgroundColor: 'green', minWidth: '100%', textAlign:'center'}}>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                                {/* 400,000.<Typography sx={{color: 'white'}} variant="caption">00</Typography> */}
                                0.00
                            </Typography>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                marginBottom: '2rem',
                                fontWeight: 700,
                                width: '50%'
                            }}
                            onClick={() => handleResult('DRAW')}
                            >DRAW</Button>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={3} xl={3}>
                        <div style={{backgroundColor: '#535353', color: 'white', minWidth: '100%', textAlign:'center', padding: '1em 0em'}}>
                            CANCELLED
                        </div>
                        <div style={{backgroundColor: 'gray', minWidth: '100%', textAlign:'center'}}>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                                {/* 400,000.<Typography sx={{color: 'white'}} variant="caption">00</Typography> */}
                                0.00
                            </Typography>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                marginBottom: '2rem',
                                fontWeight: 700,
                                width: '50%'
                            }}
                            onClick={() => handleResult('FAILED')}
                            >CANCELLED</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
    return (
        <div>
            <LiveStreamComponent />
            <GameHeader fight_num={currentGameState.gameNo}
                bettingStatus={currentGameState.result}
                expFights={streamData.expfights}
                streamStatus={streamData.viewState} />
            <BettingControls />
            <WinnerControls />
        </div>
    )
}