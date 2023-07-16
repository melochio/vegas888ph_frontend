import { colors } from "@/publicComponents/customStyles"
import { LoggedHeader } from "@/publicComponents/header"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Grid } from "@mui/material";
import StarRateIcon from '@mui/icons-material/StarRate';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CasinoIcon from '@mui/icons-material/Casino';

const gameList = [
    {
        title: "Sabong",
        description: "sabong game 1",
        imgPath: "/sample1.png"
    },
    {
        title: "Game 2",
        description: "sabong game 2",
        imgPath: "/sample2.jpg"
    },
    {
        title: "Game 3",
        description: "sabong game 3",
        imgPath: "/sample1.jpg"
    },
    {
        title: "Game 3",
        description: "sabong game 3",
        imgPath: "/sample1.jpg"
    },
    {
        title: "Game 3",
        description: "sabong game 3",
        imgPath: "/sample1.jpg"
    }
]
const categoryList = [
    {icon : () => <StarRateIcon style={{fontSize: '3rem', color: colors.gold}} />, title: "Top Games"},
    {icon : () => <LocalFireDepartmentIcon style={{fontSize: '3rem', color: '#e33030'}} />, title: "New Games"},
    {icon : () => <CasinoIcon style={{fontSize: '2.5rem', color: colors.silver, transform:'rotate(45deg)'}} />, title: "Others"},
]
const Categories = () => {
    return (
        <div>
            <Grid container columns={12} flexDirection={'row'} justifyContent={'center'}>
                    {categoryList.map((val, index) => (
                        <Grid item key={index} md={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} display={'flex'} sx={{
                            border: 'solid 3px '+ colors.gold,
                            borderRadius: '50%',
                            minHeight: '130px',
                            minWidth: '130px',
                            margin: '0rem 1rem'
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
export default function Dashboard() {
    const GameCard: any = (props: {
        title: string, 
        description: string, 
        imgPath: string,
    }) => {
        return (
            <Card sx={{ minHeight: '240px' }}>
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
    return (
        <div>
            <LoggedHeader />
            <div style={{
                margin: '0rem 10rem'
            }}>
                <Categories />
                <Card sx={{backgroundColor: colors.silver}}>
                    <Grid container columns={12} flexDirection={'row'} columnSpacing={3}>
                        {gameList.map((val, index) => (
                            <Grid key={index} item sm={4} md={2} lg={2} xl={2} xs={6}>
                                <GameCard {...val}/>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </div>
        </div>
    )
}