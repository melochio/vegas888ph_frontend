'use client'
import { Button, Grid, Typography } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { colors } from "@/publicComponents/customStyles";
import EastIcon from '@mui/icons-material/East';
import React from "react";
import { isJsxElement } from "typescript";
import { LoggedHeader } from "@/publicComponents/header";
<<<<<<< HEAD
import MuxPlayer from "@mux/mux-player-react"; 
import { bet_api } from "@/api/bettor/bet";

type Round = {
    winner: 'meron' | 'wala';
    fightNo: string;
};
  
const rounds: Round[] = [
    {fightNo: '1', winner: 'meron'},
    {fightNo: '2', winner: 'meron'},
    {fightNo: '3', winner: 'meron'},
    {fightNo: '4', winner: 'meron'},
    {fightNo: '5', winner: 'wala'},
    {fightNo: '6', winner: 'meron'},
    {fightNo: '7', winner: 'meron'},
    {fightNo: '8', winner: 'wala'},
    {fightNo: '9', winner: 'wala'},
    {fightNo: '10', winner: 'wala'},
    {fightNo: '11', winner: 'meron'},
    {fightNo: '12', winner: 'wala'},
    {fightNo: '13', winner: 'meron'},
    {fightNo: '14', winner: 'wala'},
    {fightNo: '15', winner: 'wala'},
    {fightNo: '16', winner: 'wala'},
=======

type Round = {
    winner: 'meron' | 'wala';
};
  
const rounds: Round[] = [
    {winner: 'meron'},
    {winner: 'meron'},
    {winner: 'meron'},
    {winner: 'meron'},
    {winner: 'wala'},
    {winner: 'meron'},
    {winner: 'meron'},
    {winner: 'wala'},
    {winner: 'wala'},
    {winner: 'wala'},
    {winner: 'meron'},
    {winner: 'wala'},
    {winner: 'meron'},
    {winner: 'wala'},
    {winner: 'wala'},
    {winner: 'wala'},
>>>>>>> origin/jAddAgentDashboard
]
const GameHeader = () => {
    return (
        <div>
            <Grid columns={12} container flexDirection={"row"} justifyContent={'space-between'}>
                <Grid item md sm xs>
                    <Typography sx={{color: 'white'}} variant="h6">Fight #1</Typography>
                </Grid>
                <Grid item md sm xs textAlign={'right'}>
                    <Typography sx={{color: 'white', display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}
                    variant="body2">Last Call <CircleIcon style={{color: 'white', paddingLeft: '10px'}} /></Typography>
                </Grid>
            </Grid>
            <Typography variant="body2" sx={{color: 'white'}}>
                <Typography variant="caption" sx={{backgroundColor:'red', padding: '5px', borderRadius: '3px', color: 'white'}}>MIRROR</Typography>
                Private Sabong
                <Typography variant="caption" sx={{color: 'white'}}>(300 exp. fights)</Typography>(300 exp. fights)
            </Typography>
        </div>
    )
}
const BetButtons = () => {
<<<<<<< HEAD
    const handleBet = (side: string) => {
        const submitBet = async () => {
            // const apiResponse = await bet_api("")
        }
    }
=======
>>>>>>> origin/jAddAgentDashboard
    return (
        <div>
            <Grid columns={12} container>
                <Grid item sm md xs lg xl>
<<<<<<< HEAD
                    <div style={{backgroundColor: 'maroon', color: 'white', minWidth: '100%', textAlign:'center'}}>
=======
                    <div style={{padding: '1rem', backgroundColor: 'maroon', color: 'white', minWidth: '100%', textAlign:'center'}}>
>>>>>>> origin/jAddAgentDashboard
                        MERON
                    </div>
                    <div style={{backgroundColor: 'red', minWidth: '100%', textAlign:'center'}}>
                        <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
<<<<<<< HEAD
                            {/* 400,000.<Typography sx={{color: 'white'}} variant="caption">00</Typography> */}
                            0.00
=======
                            400,000.<Typography sx={{color: 'white'}} variant="caption">00</Typography>
>>>>>>> origin/jAddAgentDashboard
                        </Typography>
                        <Button style={{
                            backgroundColor: colors.gold,
                            color: 'black',
                            padding: '1em 1em',
                            marginBottom: '2rem'
<<<<<<< HEAD
                        }}
                        onClick={() => handleBet('meron')}
                        >CHOOSE MERON</Button>
                    </div>
                </Grid>
                <Grid item sm md xs lg xl>
                    <div style={{backgroundColor: '#0404b1', color: 'white', textAlign:'center'}}>
=======
                        }}>CHOOSE MERON</Button>
                    </div>
                </Grid>
                <Grid item sm md xs lg xl>
                    <div style={{padding: '1rem', backgroundColor: '#0404b1', color: 'white', textAlign:'center'}}>
>>>>>>> origin/jAddAgentDashboard
                        WALA
                    </div>
                    <div style={{backgroundColor: 'blue', textAlign:'center'}}>
                        <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
<<<<<<< HEAD
                            0.00
=======
                            230,780.<Typography sx={{color: 'white'}} variant="caption">66</Typography>
>>>>>>> origin/jAddAgentDashboard
                        </Typography>
                        <Button style={{
                            backgroundColor: colors.gold,
                            color: 'black',
                            padding: '1em 1em',
                            marginBottom: '2rem'
<<<<<<< HEAD
                        }}
                        onClick={() => handleBet('wala')}
                        >CHOOSE WALA</Button>
=======
                        }}>CHOOSE WALA</Button>
>>>>>>> origin/jAddAgentDashboard
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
<<<<<<< HEAD
const Trends = ({isMeron, textValue}:{isMeron: boolean, textValue: string}) => {
=======
const Trends = ({isMeron}:{isMeron: boolean}) => {
>>>>>>> origin/jAddAgentDashboard
    return (
        <div style={{
            border: '1px solid gray',
            maxWidth: '25px',
            maxHeight: '25px',
            minWidth: '25px',
            minHeight: '25px',
        }}>
<<<<<<< HEAD
            <div style={{backgroundColor: isMeron ? 'red': 'blue', borderRadius: '50%', color: 'white'}}>{textValue}</div>
=======
            <CircleIcon style={{fontSize:'25px',color: isMeron ? 'red': 'blue'}} />
>>>>>>> origin/jAddAgentDashboard
        </div>
    )
}
export default function GameView() {
    const LiveStreamComponent = () => {
        return (
          <div style={{
            minWidth: '100%',
          }}>
<<<<<<< HEAD
            <MuxPlayer
                streamType="ll-live"
                playbackId="MRLwgB4HRQkeUmbPXZS2aDbdqOz100yvX1BG17JJv68M"
                autoPlay={true}
                metadata={{
                    video_id: "video-id-54321",
                    video_title: "Test video title",
                    viewer_user_id: "user-id-007",
                }}
            />
=======
            <video
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              controls // Add this if you want to show video controls (play, pause, volume, etc.)
            >
              {/* Add the source of your live stream here */}
              <source src="your-live-stream-url" type="video/mp4" />
              {/* You can add more source elements with different formats (e.g., WebM, Ogg) for browser compatibility */}
            </video>
>>>>>>> origin/jAddAgentDashboard
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
        const isMeron: boolean = val.winner === 'meron';

        if (index === 0 || rounds[index].winner !== rounds[index - 1].winner) {
            counter = 1;
        } else {
            counter++;
        }

        if (index === rounds.length - 1 || rounds[index].winner !== rounds[index + 1].winner) {
            trendCountList.push({count: counter, isMeron: val.winner === 'meron'});
        }
    });
<<<<<<< HEAD
=======
    console.log(trendCountList)
    // for (const val of rounds) {
    //     const isMeron = val.winner === 'meron';
    //     currentColumn.push(<Trends key={currentColumn.length} isMeron={isMeron} />);
    //     if (currentColumn.length === 1) {
    //     trendColumns.push(currentColumn);
    //     currentColumn = [];
    //     }
    // }
    // Add any remaining column
    // if (currentColumn.length > 0) {
    //     trendColumns.push(currentColumn);
    // }
>>>>>>> origin/jAddAgentDashboard
    return (
        <div>
            <LoggedHeader />
            <LiveStreamComponent />
            <GameHeader />
            <BetButtons />
            <br />
            <div>
                <Typography variant="h6" sx={{color: "white"}}>Trends <EastIcon /></Typography>
                <div style={{ display: 'flex', maxWidth: '100vw', minHeight: '20vh', padding: '2em 0em', overflowX: 'auto' }}>
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
<<<<<<< HEAD
                                <Trends key={i + index} isMeron={val.isMeron} textValue={`${index}`} />
=======
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
                            ))}
                            </div>
                        ))
                    }
                    {
                        trendCountList.map((val, i) => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {Array.from({ length: val.count }).map((_, index) => (
                                <Trends key={i + index} isMeron={val.isMeron} />
>>>>>>> origin/jAddAgentDashboard
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