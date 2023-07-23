import { colors } from "@/publicComponents/customStyles"
import { LoggedHeader } from "@/publicComponents/header"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {Typography as TypographyMui} from '@mui/material';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Button, Grid } from "@mui/material";
import StarRateIcon from '@mui/icons-material/StarRate';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CasinoIcon from '@mui/icons-material/Casino';
import { Scale } from "@mui/icons-material";

const gameList = [
    {
        title: "Sabong",
        description: "live sabong",
        imgPath: "/sample7.jpeg",
        href: "/gameView",
    },
    {
        title: "Bingo",
        description: "Live bingo game",
        imgPath: "/sample5.png",
        href: "#",
    },
    {
        title: "Dice",
        description: "Dice game",
        imgPath: "/sample4.png",
        href: "#",
    },
    {
        title: "Wheel Spin",
        description: "Spin the wheel game",
        imgPath: "/sample3.png",
        href: "#",
    },
    {
        title: "Roulette",
        description: "Roulette game",
        imgPath: "/sample1.png",
        href: "#",
    },
    {
        title: "Rocket Up",
        description: "Checkout before the rocket blows up",
        imgPath: "/sample2.png",
        href: "#",
    }
]
const categoryList = [
    {icon : () => <StarRateIcon style={{fontSize: '3rem', color: colors.gold}} />, title: "Top Games", isActive: true},
    {icon : () => <LocalFireDepartmentIcon style={{fontSize: '3rem', color: '#e33030'}} />, title: "New Games", isActive: false},
    {icon : () => <CasinoIcon style={{fontSize: '2.5rem', color: colors.silver, transform:'rotate(45deg)'}} />, title: "Others", isActive: false},
]
const Categories = () => {
    return (
        <div>
            <Grid container columns={12} flexDirection={'row'} justifyContent={'center'}>
                    {categoryList.map((val, index) => (
                        <Grid item key={index} md={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} display={'flex'} sx={{
                            cursor: 'pointer',
                            border: 'solid 3px '+ colors.gold,
                            borderRadius: '50%',
                            minHeight: '130px',
                            minWidth: '130px',
                            margin: '0rem 1rem',
                            backgroundColor: val.isActive ? '#4f4f4fa3' : 'transparent',
                            transform: 'scale(0.9)',
                            '&:hover':{
                                transform: 'scale(1.1)'
                            }
                        }}>
                            <val.icon />
                            <Typography level="h2" fontSize="lg" textColor="#fff">
                                {val.title}
                            </Typography>
                        </Grid>
                    ))}
            </Grid>
        </div>
    )
}
const GameCard: any = (props: {
    title: string, 
    description: string, 
    imgPath: string,
}) => {
    const handleClick = () => {

    }
    return (
        <Card className={'gameCard'} sx={{ minHeight: '350px', height: '10rem',
        cursor: "pointer"}}>
            <CardCover>
                <img
                    src={props.imgPath}
                    loading="lazy"
                    alt=""
                />
            </CardCover>
            <CardCover
                sx={{
                    background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="h2" fontSize="xl" textColor="#fff" mb={1}>
                    {props.title}
                </Typography>
                <Typography
                    textColor="neutral.300"
                >
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default function Dashboard() {
    const Leaderboards = () => {
        return (
            <Card>
                <div style={{
                    margin: '2em',
                    textAlign: 'center'
                }}>
                    <TypographyMui variant="h2">RECENT WINNERS</TypographyMui>
                    <TypographyMui variant="h5">We update our site regularly; more and more winners are added every day! To locate the most recent winner's information</TypographyMui>
                </div>
            </Card>
        )
    }
    return (
        <div>
            <LoggedHeader />
            <div style={{
                margin: '0rem 10rem'
            }}>
                <Categories /><br /><br />
                <Card sx={{backgroundColor: colors.silver}}>
                    <Grid container columns={12} flexDirection={'row'} rowSpacing={3} columnSpacing={3}>
                        {gameList.map((val, index) => (
                            <Grid key={index} item sm={12} md={6} lg={4} xl={4} xs={12}>
                                <a href={val.href}>
                                    <GameCard {...val}/>
                                </a>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '2rem'
                }}>
                    <Button sx={{borderRadius: '2em', backgroundColor: colors.gold, fontWeight: 700, padding: '1em 2em'}} variant={'contained'}>View All</Button>
                </div>
                <Leaderboards />
            </div>
        </div>
    )
}