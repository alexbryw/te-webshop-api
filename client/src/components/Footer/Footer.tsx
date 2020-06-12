import React, { CSSProperties } from 'react'
import Container from '@material-ui/core/Container'
import { Typography, IconButton } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';


import useStyles from './FooterStyle';


export default function Footer() {

    const classes = useStyles();
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>
                <Typography color="primary" variant="body2">
                    +4699-0253 6456
                </Typography>
            </Grid>

            <Grid item>
                <IconButton>
                    <InstagramIcon />
                </IconButton>
                <IconButton>
                    <TwitterIcon />
                </IconButton>
                <IconButton>
                    <PinterestIcon />
                </IconButton>
            </Grid>

            <Grid item>
                <Typography color="primary" variant="body2">
                    tekulan@temail.te
                </Typography>
            </Grid>
        </Grid>
    )
}
