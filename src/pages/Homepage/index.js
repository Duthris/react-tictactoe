import React from "react";
import { makeStyles, Grid, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 140,
    },
    centerText: {
        textAlign: "center"
    },
}));

export default function Homepage() {

    const classes = useStyles()

    return <Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography className={classes.centerText}>Welcome</Typography>
            </Grid>
        </Grid>
    </Container>
}
