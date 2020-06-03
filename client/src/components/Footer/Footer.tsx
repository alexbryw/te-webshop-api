import React, { CSSProperties } from 'react'
import Container from '@material-ui/core/Container'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'


import useStyles from './FooterStyle';


export default function Footer() {

    const classes = useStyles();
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>
                <Typography color="secondary" variant="body2">
                    Tekulan AB
                    </Typography>
            </Grid>
            <Grid item>
                <Typography color="secondary" variant="body2">
                    VägGatan 34
                    </Typography>
            </Grid>
            <Grid item>
                <Typography color="secondary" variant="body2">
                    123 45 Stadeborg
                    </Typography>
            </Grid>
            <Grid item>
                <Typography color="secondary" variant="body2">
                    +4699-0253 6456
                    </Typography>
            </Grid>
        </Grid>
    )
}
