'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { colors } from "@/publicComponents/customStyles";
import EastIcon from '@mui/icons-material/East';
import React from "react";
import { isJsxElement } from "typescript";
import { LoggedHeader } from "@/publicComponents/header";
import MuxPlayer from "@mux/mux-player-react"; 
import { bet_api } from "@/api/bettor/bet";
import { currentGame, getStream } from "@/api/bettor/game";
import Game_Model, { initialGameValue } from "@/models/game";
import Stream_Model, { initialStreamValue } from "@/models/stream";
import socket from "@/utils/webSocket";
import Swal from "sweetalert2";

type Round = {
    winner: 'MERON' | 'WALA';
    fightNo: string;
};
  
const rounds: Round[] = [
    {fightNo: '1', winner: 'MERON'},
    {fightNo: '2', winner: 'MERON'},
    {fightNo: '3', winner: 'MERON'},
    {fightNo: '4', winner: 'MERON'},
    {fightNo: '5', winner: 'WALA'},
    {fightNo: '6', winner: 'MERON'},
    {fightNo: '7', winner: 'MERON'},
    {fightNo: '8', winner: 'WALA'},
    {fightNo: '9', winner: 'WALA'},
    {fightNo: '10', winner: 'WALA'},
    {fightNo: '11', winner: 'MERON'},
    {fightNo: '12', winner: 'WALA'},
    {fightNo: '13', winner: 'MERON'},
    {fightNo: '14', winner: 'WALA'},
    {fightNo: '15', winner: 'WALA'},
    {fightNo: '16', winner: 'WALA'},
]
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
const Trends = ({isMeron, textValue}:{isMeron: boolean, textValue: string}) => {
    return (
        <div style={{
            border: '1px solid gray',
            maxWidth: '25px',
            maxHeight: '25px',
            minWidth: '25px',
            minHeight: '25px',
        }}>
        {/* <div style={{backgroundColor: isMeron ? 'red': 'blue', borderRadius: '50%', color: 'white'}}>{textValue}</div> */}
            <CircleIcon style={{color: isMeron ? 'red': 'blue'}} />
        </div>
    )
}
export default function GameView() {
    const [currentGameState, setCurrentGameState] = React.useState<Game_Model>(initialGameValue)
    const [streamData, setStreamData] = React.useState<Stream_Model>(initialStreamValue)
    // React.useEffect(() => {
    //     socket.on('sabong_currentDetails', (eventData) => {
    //         // Handle the received event data
    //         console.log('Received event data:', eventData);
    //         // Your logic to update the component's state or perform any other action
    //       });
      
    //       // Clean up the event listener when the component is unmounted
    //       return () => {
    //         socket.off('sabong_currentDetails');
    //       };
    // }, []);
    
    const BetButtons = () => {
        const handleBet = async (side: string, amount: string) => {
            if(side === "") {
                Swal.fire('No Sides Selected', 'Please select a winning side', 'warning')
            } else {
                const apiResponse = await bet_api("SABONG", side, amount);
            }
        }
        const [selectedSide, setSelectedSide] = React.useState<"MERON" | "WALA" | "">("");
    
        const [isOpen, setIsOpen] = React.useState(false);
        const handleClickOpen = (side: "MERON" | "WALA") => {
            setSelectedSide(side)
            setIsOpen(true);
        };
        const BetModal = () => {
            const handleClose = () => {
            setIsOpen(false);
            };
            return (
                <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
                    <DialogTitle textAlign={'center'}>Select an Amount</DialogTitle>
                    <DialogContent>
                        <Typography variant="h6" textAlign={'center'} sx={{color: selectedSide === 'MERON' ? 'red': 'blue'}}>{selectedSide}</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant={'contained'} sx={{backgroundColor: colors.gold, color: 'black'}} onClick={() => handleBet(selectedSide, '10')}>10</Button>
                        <Button variant={'contained'} sx={{backgroundColor: colors.gold, color: 'black'}} onClick={() => handleBet(selectedSide, '50')}>50</Button>
                        <Button variant={'contained'} sx={{backgroundColor: colors.gold, color: 'black'}} onClick={() => handleBet(selectedSide, '100')}>100</Button>
                        <Button variant={'contained'} sx={{backgroundColor: colors.gold, color: 'black'}} onClick={() => handleBet(selectedSide, '500')}>500</Button>
                        <Button variant={'contained'} sx={{backgroundColor: colors.gold, color: 'black'}} onClick={() => handleBet(selectedSide, '1000')}>1000</Button>
                    </div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    </DialogActions>
                </Dialog>
            )
        }
        return (
            <div>
                <Grid columns={12} container>
                    <Grid item sm md xs lg xl>
                        <div style={{backgroundColor: 'maroon', color: 'white', minWidth: '100%', textAlign:'center'}}>
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
                            }}
                            onClick={() => handleClickOpen('MERON')}
                            >CHOOSE MERON</Button>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="body2">
                                0.00
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item sm md xs lg xl>
                        <div style={{backgroundColor: '#0404b1', color: 'white', textAlign:'center'}}>
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
                            }}
                            onClick={() => handleClickOpen('WALA')}
                            >CHOOSE WALA</Button>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="body2">
                                0.00
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <BetModal />
            </div>
        )
    }
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
    let counter = 0;
    type trendCount = {
        count: number,
        isMeron: boolean,
    }
    const trendCountList: trendCount[] = [];

    rounds.forEach((val, index) => {
        const isMeron: boolean = val.winner === 'MERON';

        if (index === 0 || rounds[index].winner !== rounds[index - 1].winner) {
            counter = 1;
        } else {
            counter++;
        }

        if (index === rounds.length - 1 || rounds[index].winner !== rounds[index + 1].winner) {
            trendCountList.push({count: counter, isMeron: val.winner === 'MERON'});
        }
    });
    return (
        <div>
            <LoggedHeader />
            <LiveStreamComponent />
            <GameHeader fight_num={currentGameState.gameNo}
                bettingStatus={currentGameState.result}
                expFights={streamData.expfights}
                streamStatus={streamData.viewState} />
            <BetButtons />
            <br />
            <div>
                <Typography variant="h6" sx={{color: "white"}}>Trends <EastIcon /></Typography>
                <div style={{ display: 'flex', maxWidth: '100vw', minHeight: '20vh', padding: '2em 0em', overflowX: 'auto' }}>
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} textValue={`${index}`} />
                            ))}
                            </div>
                        ))
                    }
                {/* {trendColumns.map((column, columnIndex) => (
                    <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {column}
                    </div>
                ))} */}
                </div>
            </div>
        </div>
    )
}