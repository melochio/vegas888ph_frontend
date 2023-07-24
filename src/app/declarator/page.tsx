'use client'
import { currentGame, getExpFights, getStream } from "@/api/bettor/game"
import Game_Model, { initialGameValue } from "@/models/game"
import Stream_Model, { initialStreamValue } from "@/models/stream"
import React from "react"
import MuxPlayer from "@mux/mux-player-react"; 
import { 
    Button, 
    Grid, 
    Typography,
    AppBar,
    Card,
    CardActions,
    CardContent,
    CssBaseline,
    Drawer,
    makeStyles,
    Toolbar,
    useTheme,
    Slider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    IconButton, } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import { colors } from "@/publicComponents/customStyles"
import { updateGameResult, gameList as gameList_API } from "@/api/declarator/http"
import CircleIcon from '@mui/icons-material/Circle';
import socket from "@/utils/webSocket"
import Swal from "sweetalert2"
import userMiddleware from "@/utils/middleware"

export default function Declarator() {
    React.useEffect(() => {
      userMiddleware()
    }, [])
    const [currentGameState, setCurrentGameState] = React.useState<Game_Model>(initialGameValue)
    const [gameList, setGameList] = React.useState<Game_Model[]>([])
    const [streamData, setStreamData] = React.useState<Stream_Model>(initialStreamValue)
    const [expFights, setExpFights] = React.useState(0)
    const fetchExpFights = async () => {
        const expFightsRepsonse = await getExpFights()
        if (expFightsRepsonse !== undefined){
            setExpFights(expFightsRepsonse.data)
        }
    }
    const fetchGameList = async () => {
        const gameListResponse = await gameList_API()
        if (gameListResponse !== undefined){
            setGameList(gameListResponse.data)
        }
    }
    const fetchCurrentStream = async () => {
        const gameResponse = await getStream()
        if (gameResponse !== undefined){
            setStreamData(gameResponse.data)
        }
    }
    const fetchCurrentGame = async () => {
        const gameResponse = await currentGame()
        if (gameResponse !== undefined){
            setCurrentGameState(gameResponse.data)
        }
    }
    type statusType = "OPEN" | "CLOSED" | "MERON" | "WALA" | "CANCELLED" | "FAILED" | "DRAW" | ""
    const handleResult = async (status: statusType) => {
        let titleText
        let htmlText
        if(status === "OPEN" || status === "CLOSED") {
            titleText = "Confirm Betting Status"
            htmlText = `Confirm betting Status of <b>Fight # ${currentGameState.gameNo}</b> to <b>${status}</b> ?`
        } else {
            titleText = "Declare Game Result"
            htmlText = `Declare Game Result of <b>Fight # ${currentGameState.gameNo}</b> to <b <b style="color: 
            ${status == "MERON" ? "red" : status == "WALA" ? "blue" : status == "DRAW" ? "green": "gray"}">${status}</b> ?
            `
        }
        Swal.fire({
            title: titleText,
            html: htmlText,
            showCancelButton: true,
            cancelButtonText: 'NO',
            confirmButtonText: 'YES',
            confirmButtonColor: 'gold',
            reverseButtons: true,
        }).then(async (result) =>{
            if(result.isConfirmed){
                await updateGameResult(currentGameState.id, status)
                setCurrentGameState({...currentGameState, result: status})
                if(status === "MERON" || status === "WALA" || status === "DRAW" || status === "FAILED") {
                    setGameList((prevGameList) => {
                        let newGames:Game_Model[] = [];
                        prevGameList.map((game, i) => {
                            if (i !== 0) {
                                newGames.push(game);
                            }
                        })
                        return newGames
                    });
                    setCurrentGameState(gameList[0])
                }
            }
        })
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
        fetchCurrentGame()
        fetchCurrentStream()
        fetchGameList()
        fetchExpFights()
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
    
    const GameHeader = React.useCallback((
        {bettingStatus, expFights, streamStatus}: 
        {bettingStatus: null | "OPEN" | "CLOSED", expFights: number, streamStatus: "Private" | "Public"} ) => {
        return (
            <div>
                <Grid columns={12} container flexDirection={"row"} justifyContent={'space-between'}>
                    <Grid key={'fight_title'+currentGameState.gameNo} item md sm xs>
                        <Typography sx={{color: 'white'}} variant="h6">Fight #{currentGameState.gameNo}</Typography>
                    </Grid>
                    <Grid key={'fight_lastCall'+currentGameState.gameNo} item md sm xs textAlign={'right'}>
                        <Typography sx={{color: 'white', display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}
                        variant="body2">Last Call <CircleIcon style={{color: bettingStatus === "OPEN" ? 'green': bettingStatus === "CLOSED" ?'red':'white', paddingLeft: '10px'}} /></Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{color: 'white'}}>
                    <Typography variant="caption" sx={{backgroundColor:'red', padding: '5px', borderRadius: '3px', color: 'white'}}>MIRROR</Typography>
                    {streamStatus} Sabong
                    <Typography variant="caption" sx={{color: 'white'}}>({expFights} rem. fights)</Typography>
                </Typography>
            </div>
        )
    }, [currentGameState])
    
    const RoundControl = React.useCallback(({gameInfo, isDisabled}:{gameInfo: Game_Model, isDisabled: boolean}) => {
        const [betStatus, setBetStatus] = React.useState<any>(()=>{
            switch(gameInfo.result){
                case "OPEN":
                    return gameInfo.result
                case "CLOSED":
                    return gameInfo.result
                case null:
                    return ""
                case "":
                    return ""
                default:
                    return "CLOSED"
            }
        })
        const [winner, setWinner] = React.useState<any>("")
        switch(gameInfo.result) {
            case "DRAW":
                setBetStatus("CLOSED");
            case "MERON":
                setBetStatus("CLOSED");
            case "WALA":
                setBetStatus("CLOSED");
            case "FAILED":
                setBetStatus("CLOSED");
        }
        return (
            <Grid key={gameInfo.id} margin={'auto'} item sm={6} xs={12} md={4} lg={4} xl={3}>
                <div style={{width: '100%'}}>
                    <div style={{backgroundColor: !isDisabled ? 'rgb(255 123 59)' : 'rgb(187 124 94)', fontWeight: 700, color: 'white', textAlign:'center', padding: '1em 0em', borderRadius: '1em 1em 0em 0em'}}>
                        Fight # {gameInfo.gameNo}
                    </div>
                    <div style={{backgroundColor: !isDisabled ? 'white' : '#a3a3a3', 
                    padding: '1em 2em', 
                    borderRadius: '0em 0em 1em 1em',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}>
                        <FormControl variant="filled" sx={{ m: 1, width: '80%'}}>
                            <Typography variant="body2" fontWeight={700}>Betting Status</Typography>
                            <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
                                <Select
                                    value={betStatus}
                                    sx={{
                                        width: '80%'
                                    }}
                                    disabled={isDisabled?true : false }
                                    onChange={(event) => setBetStatus(event.target.value)}
                                >
                                    <MenuItem value={"OPEN"}>OPEN</MenuItem>
                                    <MenuItem value={"CLOSED"}>CLOSED</MenuItem>
                                </Select>
                                <IconButton size="small" color="success" onClick={() => {
                                        if(betStatus !== "") {
                                            handleResult(betStatus)
                                        } else {
                                            Swal.fire(
                                                'Select from the list',
                                                undefined,
                                                'warning'
                                            )
                                        }
                                    }}
                                    disabled={isDisabled?true:false}>
                                    <CheckIcon fontSize={'large'}/>
                                </IconButton>
                            </div>
                        </FormControl>
                        <FormControl variant="filled" sx={{ m: 1, width: '80%'}}>
                            <Typography variant="body2" fontWeight={700}>Declare Winner</Typography>
                            <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
                                <Select
                                    value={winner}
                                    sx={{
                                        width: '80%'
                                    }}
                                    disabled={isDisabled?true:false}
                                    onChange={(event) => setWinner(event.target.value)}
                                >
                                    <MenuItem value={"MERON"}>MERON</MenuItem>
                                    <MenuItem value={"WALA"}>WALA</MenuItem>
                                    <MenuItem value={"FAILED"}>FAILED</MenuItem>
                                    <MenuItem value={"DRAW"}>DRAW</MenuItem>
                                </Select>
                                <IconButton size="small" color="success" onClick={() => {
                                        if(winner !== "") {
                                            handleResult(winner)
                                        } else {
                                            Swal.fire(
                                                'Select from the list',
                                                undefined,
                                                'warning'
                                            )
                                        }
                                    }}
                                    disabled={isDisabled?true:false}>
                                    <CheckIcon fontSize={'large'}/>
                                </IconButton>
                            </div>
                        </FormControl>
                    </div>
                </div>
            </Grid>
        )
    },[gameList.length])
    return (
        <div>
            <LiveStreamComponent key={'streamComponent'}/>
            <GameHeader
                bettingStatus={currentGameState.result}
                expFights={expFights}
                streamStatus={streamData.viewState}
                key={'gameHeader'} />
            <Card style={{
                maxWidth:"90%",
                backgroundColor: 'transparent',
                margin: 'auto',
                maxHeight: '100vh',
                overflowY: 'auto'
            }}>
            <CardContent key={'controls'}>
                <Grid columns={12} container columnSpacing={3} rowSpacing={3}>
                    {
                        gameList.map((val, i) => (
                            <RoundControl isDisabled={i === 0 ? false: true} gameInfo={val} />
                        ))
                    }
                </Grid>
            </CardContent>
            </Card>
        </div>
    )
}