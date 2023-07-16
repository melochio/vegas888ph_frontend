import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import sampleImg from '@assets/sample1.jpg'
import { colors } from "@/publicComponents/customStyles"
import { LoggedHeader } from "@/publicComponents/header"

const gameList = [
    {
        title: "Sabong",
        description: "sabong game 1",
        imgPath: "/sample1.jpg"
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
export default function Dashboard() {
    const GameCard = (props: {
        title: string, 
        description: string, 
        imgPath: string,
    }) => {
        return (
            <Card sx={{ maxWidth: 345, borderRadius: '0.4rem' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height={140}
                        image={props.imgPath}
                        alt=""
                    />
                    <CardContent sx={{backgroundColor: 'rgb(87 87 87)'}}>
                        <Typography color={colors.silver} gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                        <Typography color={colors.silver} variant="body2">
                            {props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
    return (
        <div>
            <LoggedHeader />
            <Grid container columns={12} flexDirection={'row'} justifyContent={'center'} columnSpacing={3}>
                {gameList.map((val) => (
                    <Grid item sm={4} md={2} lg={2} xl={2} xs={6}>
                        <GameCard {...val}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}