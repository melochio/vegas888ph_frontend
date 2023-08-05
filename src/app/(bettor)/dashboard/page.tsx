
    }
    return (
        <Card className={'gameCardContainer'} sx={{ minHeight: '100px', transition: 'color 0.3s ease-in-out', 
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
                <IconButton aria-label="delete" size={'large'} sx={{justifyContent: 'flex-end'}}>
                    <PlayCircleIcon className="playbutton" style={{scale: 1.8}} />
                </IconButton>
            </CardContent>
        </Card>
        // <div style={{display: 'flex', flexDirection: 'row'}}>
        //     <img src={props.imgPath} style={{height: '100px'}} />
        //     <Typography level="h2" fontSize="xl">
        //         {props.title}
        //     </Typography>
        // </div>
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
            <Container>
                <Categories /><br /><br />
                    <Grid container columns={12} flexDirection={'row'} rowSpacing={3} columnSpacing={3}>
                        {gameList.map((val, index) => (
                            <Grid key={index} item sm={12} md={6} lg={4} xl={4} xs={12}>
                                <a href={val.href}>
                                    <GameCard {...val}/>
                                </a>
                            </Grid>
                        ))}
                    </Grid>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '2rem'
                }}>
                    <Button sx={{borderRadius: '2em', backgroundColor: colors.gold, fontWeight: 700, padding: '1em 2em'}} variant={'contained'}>View All</Button>
                </div>
                {/* <Leaderboards /> */}
            </Container>
        </div>
    )
}