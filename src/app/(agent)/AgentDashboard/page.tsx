import { colors } from "@/publicComponents/customStyles"
import AgentNav from "@/publicComponents/agentNav"
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Breadcrumbs, Grid, Link, Stack, Typography as TypographyMui } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Container from '@mui/material/Container';
export default function Dashboard() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            MUI
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
        >
            Core
        </Link>,
        <Typography key="3">
            Breadcrumb
        </Typography>,
    ];

    const Commission = () => {
        const containerStyle = {
            marginLeft: '240px',
            margin: 'auto',
            backgroundColor: 'grey',
            height: '20vh'
        };
        return (
            <Container style={containerStyle}>
                <Typography>working</Typography>
            </Container>
        )
    }
    return (
        <div>
            <Stack spacing={2}>
                 
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    color='white'
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Commission />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Commission />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Commission />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Commission />
                </Grid>
            </Grid>
        </div>
    )
}