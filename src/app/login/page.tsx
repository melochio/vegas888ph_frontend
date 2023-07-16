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
        <Grid container columns={12} justifyContent={'center'} minHeight={'63vh'}>
            <Grid item md={5}>
                <Card sx={{padding: '4rem', backgroundColor: colors.silver, borderRadius: '1em'}}>
                    <form action="" method="post">
                        <Typography variant="h4" fontWeight={700} textAlign={'center'}>Login</Typography>
                        <br /> <br />
                        <Grid container columns={12} flexDirection={'row'} justifyContent={'center'} rowSpacing={2}>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="emailInput"
                                    aria-describedby="emailInput-helper-text" 
                                    helperText=" " 
                                    label="Email address"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8}>
                                <FormControl fullWidth>
                                    <TextField id="passwordInput"
                                    aria-describedby="passwordInput-helper-text"
                                    helperText=" " 
                                    label="Password"/>
                                </FormControl> 
                            </Grid>
                            <Grid item sm={8} md={8} lg={8} xl={8} xs={8} textAlign={'center'}>
                                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                            </Grid>
                            <Grid item sm={6} md={6} lg={6} xl={6} xs={6}>
                                <Button fullWidth variant={'contained'} sx={{
                                    padding: '1rem 3rem', fontWeight: 700, backgroundColor: colors.gold, color: 'black'
                                    }}>Login</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}

export default function Login() {
    return (
        <div>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}