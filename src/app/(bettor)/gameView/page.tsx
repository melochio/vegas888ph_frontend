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
import { currentGame, getExpFights, getGameTrends, getStream } from "@/api/bettor/game";
import Game_Model, { initialGameValue } from "@/models/game";
import Stream_Model, { initialStreamValue } from "@/models/stream";
import socket from "@/utils/webSocket";
import Swal from "sweetalert2";
import { GetMyBalance } from "@/api/bettor/wallet";
import Pusher from "pusher-js";
import { io } from "socket.io-client";
import './styles.css'; // Import the CSS file
import Echo from "laravel-echo";
import SBAPI from '@utils/supabase'
import { equal } from "assert";

type Round = {
    winner: "MERON" | "WALA" | "FAILED" | "DRAW";
    fightNo: string;
};
  
const rounds: Round[] = [
    {fightNo: '1', winner: 'FAILED'},
    {fightNo: '2', winner: 'DRAW'},
    {fightNo: '3', winner: 'MERON'},
    {fightNo: '4', winner: 'MERON'},
]
const GameHeader = (
    {fight_num, bettingStatus, expFights, streamStatus}: 
    {fight_num: string, bettingStatus: null | "OPEN" | "CLOSED", expFights: number, streamStatus: "Private" | "Public"} ) => {
    return (
        <div>
            <Grid columns={12} container flexDirection={"row"} justifyContent={'space-between'}>
                <Grid item md sm xs>
                    <Typography sx={{color: 'white'}} variant="h6">Fight #{fight_num}</Typography>
                </Grid>
                <Grid item md sm xs textAlign={'right'}>
                    <Typography sx={{color: 'white', display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}
                    variant="body2">Last Call 
                    <CircleIcon style={{color: bettingStatus === "OPEN" ? 'green': bettingStatus === "CLOSED" ?'red':'white', paddingLeft: '10px'}} />
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body2" sx={{color: 'white'}}>
                <Typography variant="caption" sx={{backgroundColor:'red', padding: '5px', borderRadius: '3px', color: 'white'}}>MIRROR</Typography>
                {streamStatus} Sabong
                <Typography variant="caption" sx={{color: 'white'}}>({expFights} rem. fights)</Typography>
            </Typography>
        </div>
    )
}
const Trends = ({winner, textValue}:{winner: "MERON" | "WALA" | "FAILED" | "DRAW", textValue: string[]}) => {
    if(winner !== null) {
        const trendColor = ():string => {
            switch (winner) {
                case "MERON":
                    return "red"
                case "WALA":
                    return "blue"
                case "DRAW":
                    return "green"
                case "FAILED":
                    return "lightgray"
            }
        }
        return textValue.map((val, i) => (
            <div key={'trendCol_'+i} style={{
                border: '1px solid gray',
                maxWidth: '25px',
                maxHeight: '25px',
                minWidth: '25px',
                minHeight: '25px',
            }}>
                <div style={{
                    backgroundColor: trendColor(), 
                    borderRadius: '50%', 
                    color: 'white', 
                    height: '100%', 
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    }}>
                    {val}
                </div>
            </div>
        ))
    }
}
declare global {
  interface Window {
    Pusher: typeof Pusher;
    io: any; // Add this line to declare io (optional if you're using socket.io-client separately)
    Echo: typeof Echo;
  }
}
export default function GameView() { 
    const [currentGameState, setCurrentGameState] = React.useState<Game_Model>(initialGameValue)
    const [streamData, setStreamData] = React.useState<Stream_Model>(initialStreamValue)
    const [trendsState, setTrendsState] = React.useState<Round[]>([])
    const [walletBalance, setWalletBalance] = React.useState(0)
    const [expFights, setExpFights] = React.useState<any>(0)
    React.useEffect(() => {
        const fetchExpFights = async () => {
            let { data: expData, error } = await SBAPI
              .from('sabong_histories')
              .select('*')
              .is('result', null)
            if (expData !== null){
                setExpFights(expData?.length)
            }
        }
        const fetchBalance = async () => {
            const response = await GetMyBalance();
            setWalletBalance(response?.data);
        }
        const fetchTrends = async () => {
            let { data: gamelist, error } = await SBAPI
                .from('sabong_histories')
                .select('*')
                .gte('gameNo', 1)
                .order('id', { ascending: false })
                // .gte('id', (query:any) => {
                //     query
                //     .select('MAX(gameNo)')
                //     .from('sabong_histories')
                //     .eq('gameNo', 1)
                //     // .count('gameNo', { distinct: true })
                //     // .then((result:any) => result - 1); // Equivalent to MAX(gameNo) - COUNT(DISTINCT gameNo) + 1
                // });
            let newGamelist = []
            let hasReachedFirst = false
            // for (let index = 0; index < array.length; index++) {
            //     const element = array[index];
            //     for
            // }
            gamelist?.map((val: Game_Model) => {
                if(val.result !== null) {
                    newGamelist.push(val)
                    if(val.gameNo === 1) {
                        hasReachedFirst = true;
                    }
                }
            })
            // setTrendsState(gamelist)


            // const trendsRepsonse = await getGameTrends()
            // if (trendsRepsonse !== undefined){
            //     const trendsList: Game_Model[] = trendsRepsonse.data
            //     let newTrends: Round[] = []
            //     trendsList.map((val) => {
            //         newTrends.push({winner: val.result, fightNo: val.gameNo})
            //     })
            //     setTrendsState(newTrends)
            // }
        }
        const fetchCurrentGame = async () => {
            const { data, error } = await SBAPI
            .from('sabong_histories')
            .select('*')
            .or('result.eq.CLOSED,result.eq.OPEN,result.is.null')
            .order('id', { ascending: true })
            // // .eq('result', 'CLOSED')
            // .eq('result', 'OPEN')
            // .is('result', null)
            if(data !== null) {
                setCurrentGameState(data[0])
            }
        }
        const fetchCurrentStream = async () => {
            let { data: stream_configuration, error } = await SBAPI
            .from('stream_configuration')
            .select("*")
            .eq('gameTitle', 'SABONG')
            if(stream_configuration !== null) {
                setStreamData(stream_configuration[0])
            }
        }
        fetchCurrentStream()  
        fetchBalance()
        fetchCurrentGame()
        fetchTrends()
        fetchExpFights()
        SBAPI.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'sabong_histories' },
            (payload) => {
                fetchExpFights()
                fetchCurrentStream()  
                fetchBalance()
                fetchCurrentGame()
                fetchTrends()
            }
        )
        .subscribe()
    }, [])
    React.useEffect(() => {
    }, [])
    const handleBet = async (side: string, amount: string) => {
        if(side === "") {
            Swal.fire('No Sides Selected', 'Please select a winning side', 'warning')
        } else {
            Swal.fire({
                title: 'Confirm Bet',
                html: `
                  Confirm bet on <b style="color: ${side == "MERON" ? "red" : "blue" }">${side}</b> for <b>${amount}</b>
                `,
                showCancelButton: true,
                cancelButtonText: 'NO',
                confirmButtonText: 'YES',
                confirmButtonColor: 'gold',
                reverseButtons: true,
            }).then(async (result) =>{
                if(result.isConfirmed){
                    try{
                        const apiResponse = await bet_api("SABONG", side, amount);
                        setWalletBalance(walletBalance-parseFloat(amount))
                        Swal.fire('Bet Successful', 'success')
                    } catch (error){
                        Swal.fire('Bet Failed', 'Insuficient Balance', 'error')
                    }
                }
            })
        }
    }
    const BetButtons = () => {
        const [selectedSide, setSelectedSide] = React.useState<"MERON" | "WALA" | "">("");
        const [isOpen, setIsOpen] = React.useState(false);
        const handleClickOpen = (side: "MERON" | "WALA") => {
            setSelectedSide(side)
            setIsOpen(true);
        };
        const elementRef = React.useRef();
        const BetModal = () => {
            const handleClose = () => {
                setIsOpen(false);
            };
            const betAmounts = [
                {amount: '1'},
                {amount: '10'},
                {amount: '50'},
                {amount: '100'},
                {amount: '500'},
                {amount: '1000'},
                {amount: '5000'},
                {amount: '10000'},
                {amount: '50000'},
                {amount: walletBalance.toString()}
            ]
            return (
                <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs" sx={{zIndex: 1000}}>
                    <DialogTitle textAlign={'center'}>Select an Amount</DialogTitle>
                    <DialogContent>
                        <Grid container columns={12}>
                            <Grid key={'betAmountList'} item xs sm md lg xl>
                                <Typography variant="h6" textAlign={'center'} sx={{color: selectedSide === 'MERON' ? 'red': 'blue'}}>{selectedSide}</Typography>
                                <Grid container columns={12} columnSpacing={3} rowSpacing={3} justifyContent={'center'}>
                                    {
                                        betAmounts.map((val, i) => (
                                            <Grid item key={"betAmountItem_"+val.amount}>
                                                <Button variant={'contained'}
                                                    sx={{backgroundColor: colors.gold, color: 'black'}}
                                                    onClick={() => handleBet(selectedSide, val.amount)}>
                                                    {i !== betAmounts.length-1 ? parseFloat(val.amount).toLocaleString():"ALL IN" }
                                                </Button>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{justifyContent: 'space-between'}}>
                        <Typography variant="caption">Remaining Balance: {walletBalance.toLocaleString("en-US", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}</Typography>
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
                    <Grid key={'meron'} item sm md xs lg xl>
                        <div style={{backgroundColor: 'maroon', color: 'white', minWidth: '100%', textAlign:'center'}}>
                            MERON
                        </div>
                        <div style={{backgroundColor: 'red', minWidth: '100%', textAlign:'center'}}>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                                {currentGameState !== undefined && !isNaN(parseFloat(currentGameState.meron_total_bet))
                                ?parseFloat(currentGameState.meron_total_bet).toLocaleString("en-US", {
                                    style: "decimal",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }): '0.00'}
                            </Typography>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                opacity: currentGameState !== undefined && currentGameState.result === "OPEN" ? '1':'0.7'
                            }}
                            disabled={currentGameState !== undefined && currentGameState.result === "OPEN" ? false:true}
                            onClick={() => handleClickOpen('MERON')}
                            >CHOOSE MERON</Button>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="body2">
                                {currentGameState !== undefined && currentGameState.meron_odds !== null ? parseFloat(currentGameState.meron_odds).toFixed(2) : 0.00 }
                            </Typography>
                        </div>
                    </Grid>
                    <Grid key={'wala'} item sm md xs lg xl>
                        <div style={{backgroundColor: '#0404b1', color: 'white', textAlign:'center'}}>
                            WALA
                        </div>
                        <div style={{backgroundColor: 'blue', textAlign:'center'}}>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                                {currentGameState !== undefined && !isNaN(parseFloat(currentGameState.wala_total_bet))
                                ?parseFloat(currentGameState.wala_total_bet).toLocaleString("en-US", {
                                    style: "decimal",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }): '0.00'}
                            </Typography>
                            <Button style={{
                                backgroundColor: colors.gold,
                                color: 'black',
                                padding: '1em 1em',
                                opacity: currentGameState !== undefined && currentGameState.result === "OPEN" ? '1':'0.7'
                            }}
                            disabled={currentGameState !== undefined && currentGameState.result === "OPEN" ? false:true}
                            onClick={() => handleClickOpen('WALA')}
                            >CHOOSE WALA</Button>
                            <Typography sx={{color: 'white', padding: '1rem'}} variant="body2">
                                {currentGameState !== undefined && currentGameState.wala_odds !== null ? parseFloat(currentGameState.wala_odds).toFixed(2) : 0.00 }
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <BetModal />
            </div>
        )
    }
    const LiveStreamComponent = () => {
        return (
          <Grid container columns={12}>
            <Grid item xs sm md lg className={'frameContainer'}>
                <iframe id="ifvideo"style={{minHeight: '100%', minWidth: '99.8%'}} allowFullScreen={true}
                    src="">
                </iframe>
                {/* <ReactPlayer url={streamData.streamID} controls style={{minHeight: '100%', minWidth: '99.8%'}} /> */}
            </Grid>
        </Grid>
        );
    };
    let counter = 0;
    type trendCount = {
        count: number,
        winner: "MERON" | "WALA" | "FAILED" | "DRAW",
        textValues: string[],
    }
    const trendCountList: trendCount[] = [];

    let gameNos:string[]= []
    trendsState.forEach((val, index) => {
        if (index === 0 || trendsState[index].winner !== trendsState[index - 1].winner) {
          counter = 1;
          gameNos = []
          gameNos.push(trendsState[index].fightNo)
        } else {
          counter++;
          gameNos.push(trendsState[index].fightNo)
        }
      
        if (index === trendsState.length - 1 || trendsState[index].winner !== trendsState[index + 1].winner) {
          trendCountList.push({count: counter, winner: val.winner, textValues: gameNos})
        }
    });
    return (
        <div>
            <LoggedHeader key={'header'}/>
            <LiveStreamComponent key={'liveStream'}/>
            <GameHeader fight_num={currentGameState !== undefined?currentGameState.gameNo:'' }
                bettingStatus={currentGameState !== undefined ? currentGameState.result:null}
                expFights={expFights}
                streamStatus={streamData!== undefined?streamData.viewState:''} 
                key={'gameHeader'}
                />
            <BetButtons key={'buttons'}/>
            <br />
            <div >
                <Typography key={'trends'} variant="h6" sx={{color: "white"}}>Trends <EastIcon /></Typography>
                <div style={{ display: 'flex', maxWidth: '100vw', minHeight: '20vh', padding: '2em 0em', overflowX: 'auto' }}>
                {
                    trendCountList.map((val, i) => {
                        return (
                            <div key={'trendCount_'+i} style={{ display: 'flex', flexDirection: 'column' }}>
                                <Trends winner={val.winner} textValue={val.textValues} />
                            </div>
                        );
                    })
                }
                </div>
            </div>
        </div>
    )
}