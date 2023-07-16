import { colors } from "@/publicComponents/customStyles"
import Footer from "@/publicComponents/footer"
import Header from "@/publicComponents/header"
import { Button, Checkbox, FormControlLabel } from "@mui/material"
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@mui/material"
import { Grid } from "@mui/material"

const Form = () => {
    return (
        <Grid container columns={12} justifyContent={'center'}>
            <Grid item md={5}>
                <Card sx={{padding: '4rem', backgroundColor: colors.silver, borderRadius: '1em'}}>
                    <form action="localhost" method="post">
                        <Typography variant="h4" fontWeight={700} textAlign={'center'}>Play With Us</Typography>
                        <br /> <br />
                        <Grid container columns={12} flexDirection={'row'} justifyContent={'center'} rowSpacing={5}>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="nameInput"
                                    name="nameInput"
                                    aria-describedby="nameInput-helper-text" 
                                    helperText="Your identity will be kept hidden from public" 
                                    label="Your Name"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="playernameInput"
                                    name="playernameInput"
                                    aria-describedby="playernameInput-helper-text" 
                                    helperText="This will be shown on as your ingame name" 
                                    label="Player Name"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="emailInput"
                                    name="emailInput"
                                    aria-describedby="emailInput-helper-text" 
                                    helperText="We'll never share your email" 
                                    label="Email address"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="passwordInput"
                                    name="passwordInput"
                                    aria-describedby="passwordInput-helper-text"
                                    label="Password"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="cPasswordInput"
                                    name="cPasswordInput"
                                    aria-describedby="cPasswordInput-helper-text" 
                                    label="Comfirm Password"/>
                                </FormControl>
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8} textAlign={'center'}>
                                <FormControlLabel control={<Checkbox />} label="I agree to VEGAS 888 Terms & Conditions*" />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6} xl={6} xs={6}>
                                <Button fullWidth variant={'contained'} sx={{
                                    padding: '1rem 5rem',
                                    fontWeight: 700,
                                    backgroundColor: colors.gold,
                                    color: 'black'
                                    }}>Register</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}

export default function Register() {
    return (
        <div>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}