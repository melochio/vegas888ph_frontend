'use client'
import { Button, Grid, Typography } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { colors } from "@/publicComponents/customStyles";
import EastIcon from '@mui/icons-material/East';
import React from "react";
import { isJsxElement } from "typescript";

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
]
const GameHeader = () => {
    return (
        <div>
            <Grid columns={12} container flexDirection={"row"} justifyContent={'space-between'}>
                <Grid item md sm xs>
                    <Typography sx={{color: 'white', marginLeft: '2em'}} variant="h6">Fight #1</Typography>
                </Grid>
                <Grid item md sm xs textAlign={'right'}>
                    <Typography sx={{color: 'white', display: 'flex', justifyContent: 'flex-end', alignItems:'center', marginRight: '2em'}}
                    variant="body2">Last Call <CircleIcon style={{color: 'white', paddingLeft: '10px'}} /></Typography>
                </Grid>
            </Grid>
            <Typography variant="body2" sx={{color: 'white', marginLeft: '3em'}}>
                <Typography variant="caption" sx={{backgroundColor:'red', padding: '5px', borderRadius: '3px', color: 'white'}}>MIRROR</Typography>
                Private Sabong
                <Typography variant="caption" sx={{color: 'white'}}>(300 exp. fights)</Typography>(300 exp. fights)
            </Typography>
        </div>
    )
}
const BetButtons = () => {
    return (
        <div>
            <Grid columns={12} container>
                <Grid item sm={6} md={6}>
                    <div style={{padding: '1rem', backgroundColor: 'maroon', color: 'white', minWidth: '100%', textAlign:'center'}}>
                        MERON
                    </div>
                    <div style={{backgroundColor: 'red', minWidth: '100%', textAlign:'center'}}>
                        <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                            400,000.<Typography sx={{color: 'white'}} variant="caption">00</Typography>
                        </Typography>
                        <Button style={{
                            backgroundColor: colors.gold,
                            color: 'black',
                            padding: '1em 1em',
                            marginBottom: '2rem'
                        }}>CHOOSE MERON</Button>
                    </div>
                </Grid>
                <Grid item sm={6} md={6}>
                    <div style={{padding: '1rem', backgroundColor: '#0404b1', color: 'white', textAlign:'center'}}>
                        WALA
                    </div>
                    <div style={{backgroundColor: 'blue', textAlign:'center'}}>
                        <Typography sx={{color: 'white', padding: '1rem'}} variant="h6">
                            230,780.<Typography sx={{color: 'white'}} variant="caption">66</Typography>
                        </Typography>
                        <Button style={{
                            backgroundColor: colors.gold,
                            color: 'black',
                            padding: '1em 1em',
                            marginBottom: '2rem'
                        }}>CHOOSE WALA</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
const Trends = ({isMeron}:{isMeron: boolean}) => {
    return (
        <div style={{
            border: '1px solid gray',
            maxWidth: '25px',
            maxHeight: '25px',
            minWidth: '25px',
            minHeight: '25px',
        }}>
            <CircleIcon style={{fontSize:'25px',color: isMeron ? 'red': 'blue'}} />
        </div>
    )
}
export default function GameView() {
    const LiveStreamComponent = () => {
        return (
          <div style={{
            minHeight: '40vh',
            minWidth: '90vw',
            backgroundColor: 'black',
          }}>
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
    return (
        <div>
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