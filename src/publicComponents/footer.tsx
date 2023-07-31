import { Typography } from "@mui/material"
import { Grid } from "@mui/material"
import { colors } from "./customStyles"

export default function Footer() {
    return (
        <Grid container flexDirection={'column'} alignContent={'center'} columns={12} pt={4} pb={4} marginTop={6} sx={{
            borderTop: 'solid 2px ' + colors.gold,
            backgroundColor: 'rgb(40, 42, 48)',
            position: 'relative',
            bottom: 0,
        }}>
            <Grid item sm md lg xl xs>
                <Typography variant="subtitle1" color={'white'}>&copy; All rights reserved to Vegas 888 PH</Typography>
            </Grid>
        </Grid>
    )
}