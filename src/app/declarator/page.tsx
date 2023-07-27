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
import Swal from "sweetalert2"
import userMiddleware from "@/utils/middleware"
import SBAPI from '@utils/supabase'
import './styles.css'; // Import the CSS file

export default function Declarator() {
    React.useEffect(() => {
    //   userMiddleware()
    }, [])
    const [currentGameState, setCurrentGameState] = React.useState<Game_Model>(initialGameValue)
    const [gameList, setGameList] = React.useState<Game_Model[]>([])
    const [streamData, setStreamData] = React.useState<Stream_Model>(initialStreamValue)
    const [expFights, setExpFights] = React.useState(0)
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
            }
        })
    }
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
        const fetchGameList = async () => {
            const { data, error } = await SBAPI.from('sabong_histories').select('*').order('id', { ascending: false });

  if (error) {
    throw error;
  }

  let hasReachedFirst = false;
  let newGamelist = [];

  data.forEach((val) => {
    if (val.result !== null) {
      if (!hasReachedFirst) {
        newGamelist.push(val);
      }

      if (val.gameNo === 1) {
        hasReachedFirst = true;
      }
    } else {
      if (val.gameNo === 1) {
        hasReachedFirst = true;
      }
    }
  });
        }
        const fetchCurrentStream = async () => {
            const { data, error } = await SBAPI
            .from('sabong_histories')
            .select('*')
            .or('result.eq.CLOSED,result.eq.OPEN,result.is.null')
            .order('id', { ascending: true })
            if(data !== null) {
                setStreamData(data[0])
            }
        }
        const fetchCurrentGame = async () => {
            const { data, error } = await SBAPI
            .from('sabong_histories')
            .select('*')
            .or('result.eq.CLOSED,result.eq.OPEN,result.is.null')
            .order('id', { ascending: true })
            if(data !== null) {
                setCurrentGameState(data[0])
            }
        }
        fetchCurrentGame()
        fetchCurrentStream()
        fetchGameList()
        fetchExpFights()
        
        SBAPI.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'sabong_histories' },
            (payload) => {
                fetchCurrentGame()
                fetchCurrentStream()
                fetchGameList()
                fetchExpFights()
            }
        )
        .subscribe()
    }, [])
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
    
    const GameHeader = (
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
    }
    
    const RoundControl = ({gameInfo, isDisabled}:{gameInfo: Game_Model, isDisabled: boolean}) => {
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
    }
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