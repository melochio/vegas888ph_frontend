'use client'
import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { colors } from "@/publicComponents/customStyles";
import EastIcon from '@mui/icons-material/East';
import React from "react";
import { LoggedHeader } from "@/publicComponents/header";
import { bet_api } from "@/api/bettor/bet";
import Game_Model, { initialGameValue } from "@/models/game";
import Stream_Model, { initialStreamValue } from "@/models/stream";
import Swal from "sweetalert2";
import './styles.css'; // Import the CSS file
import SBAPI from '@utils/supabase'
import { UserModel_Hidden } from "@/models/users";
import { fetchUser } from "@/api/bettor/auth";

type Round = {
    winner: "MERON" | "WALA" | "FAILED" | "DRAW";
    fightNo: string;
};
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
export default function GameView() { 
    const [user, setUser] = React.useState<UserModel_Hidden>()
    const [currentGameState, setCurrentGameState] = React.useState<Game_Model>(initialGameValue)
    const [streamData, setStreamData] = React.useState<Stream_Model>(initialStreamValue)
    const [trendsState, setTrendsState] = React.useState<Round[]>([])
    const [walletBalance, setWalletBalance] = React.useState(0)
    const [expFights, setExpFights] = React.useState<any>(0)
    const fetchBalance = async () => {
        if (user?.id !== undefined) {
            let { data: getwalletbalance, error } = await SBAPI
            .from('getwalletbalance')
            .select('*')
            .eq('id', user.id)
            if(getwalletbalance !== null) {
                setWalletBalance(getwalletbalance[0].wallet_amount)
            }
        }
    }
    React.useEffect(()=>{
        if(user !== undefined) {
            fetchBalance()
        }
    }, [user])
    React.useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await SBAPI.auth.getUser()
            let { data: users, error } = await SBAPI
            .from('users')
            .select('user_level')
            .eq('email', user?.email)
        }
        const fetchExpFights = async () => {
            let { data: expData, error } = await SBAPI
              .from('sabong_histories')
              .select('*')
              .is('result', null)
            if (expData !== null){
                setExpFights(expData?.length)
            }
        }
        const fetchTrends = async () => {
            let { data: gamelist, error } = await SBAPI
                .from('sabong_histories')
                .select('*')
                .order('id', { ascending: false })
            let newGamelist: Game_Model[] = []
            let hasReachedFirst = false
            gamelist?.map((val: Game_Model) => {
                if(val.result !== null) {
                    if(!hasReachedFirst) {
                        newGamelist.push(val)
                    } 
                    if(val.gameNo === 1) {
                        hasReachedFirst = true;
                    }
                } else {
                    if (val.gameNo === 1) {
                        hasReachedFirst = true
                    }
                }
            })
            let newTrends: Round[] = []
            newGamelist.reverse().map((val) => {
                newTrends.push({winner: val.result, fightNo: val.gameNo})
            })
            setTrendsState(newTrends)
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
        const fetchCurrentStream = async () => {
            let { data: stream_configuration, error } = await SBAPI
            .from('stream_configuration')
            .select("*")
            .eq('gameTitle', 'SABONG')
            if(stream_configuration !== null) {
                setStreamData(stream_configuration[0])
            }
        }
        fetchUserData()
        fetchCurrentStream()  
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
                fetchCurrentGame()
                fetchTrends()
            }
        )
        .subscribe()
        SBAPI.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'wallets' },
            (payload) => {
                fetchBalance()
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
        const [totalBet, setTotalBet] = React.useState(0)
        const [isOpen, setIsOpen] = React.useState(false);
        const handleClickOpen = (side: "MERON" | "WALA") => {
            setSelectedSide(side)
            setIsOpen(true);
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
            <div>
                <Grid columns={12} container>
                    <Grid key={'meron'} item sm={6} md={6} lg={6}>
                        <div style={{backgroundColor: 'maroon', color: 'white', minWidth: '100%', textAlign:'center', padding: '1em 0em'}}>
                            <Typography variant="h6">MERON</Typography>
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
                    <Grid key={'wala'} item sm={6} md={6} lg={6}>
                        <div style={{backgroundColor: '#0404b1', color: 'white', textAlign:'center', padding: '1em 0em'}}>
                            <Typography variant="h6">WALA</Typography>
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
                    <Grid key={'betList'} item sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container columns={12} columnSpacing={3} rowSpacing={3} justifyContent={'center'}>
                                    <Grid item sm={12} md={12} lg={12}>
                                        <Typography variant="h6" display={'flex'}>
                                            Your Balance: <b style={{color: "green"}}>{walletBalance.toLocaleString("en-US", {
                                            style: "decimal",
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}</b>
                                        </Typography>
                                        <Typography variant="h6">
                                            You are about to bet: {totalBet.toLocaleString("en-US", {
                                            style: "decimal",
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                        </Typography>
                                    </Grid>
                                    {
                                        betAmounts.map((val, i) => (
                                            <Grid item key={"betAmountItem_"+val.amount}>
                                                <Button variant={'contained'}
                                                    sx={{backgroundColor: colors.gold, color: 'black'}}
                                                    onClick={() => {
                                                        if(walletBalance >= (parseFloat(val.amount)+totalBet)){
                                                            if(i === betAmounts.length-1) {
                                                                setTotalBet(parseFloat(val.amount))
                                                            } else {
                                                                setTotalBet(parseFloat(val.amount)+totalBet)
                                                            }
                                                        } else {
                                                            setTotalBet(walletBalance)
                                                        }
                                                    }}>
                                                    {i !== betAmounts.length-1 ? parseFloat(val.amount).toLocaleString():"ALL IN" }
                                                </Button>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
    const LiveStreamComponent = () => {
        return (
          <Grid container columns={12}>
            <Grid item xs sm md lg className={'frameContainer'}>
                <iframe id="ifvideo"style={{minHeight: '80%', minWidth: '99.8%'}} allowFullScreen={true}
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
            <Grid container columns={12}>
                <Grid item md={6}>
                    <LiveStreamComponent key={'liveStream'}/>
                </Grid>
                <Grid item md={6}>
                    <GameHeader fight_num={currentGameState !== undefined?currentGameState.gameNo:'' }
                        bettingStatus={currentGameState !== undefined ? currentGameState.result:null}
                        expFights={expFights}
                        streamStatus={streamData!== undefined?streamData.viewState:''} 
                        key={'gameHeader'}
                        />
                    <BetButtons key={'buttons'}/>
                    <Typography key={'trends'} variant="h6" sx={{color: "white", display: 'flex', alignItems: 'center'}}>Trends <EastIcon /></Typography>
                    <div style={{
                        display: 'flex',
                        minHeight: '20vh',
                        padding: '1em',
                        maxWidth: '95%',
                        maxHeight: '20vh',
                        overflow: 'auto',
                        }}>
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
                </Grid>
                <Grid item md={12}>
                </Grid>
            </Grid>
        </div>
    )
}