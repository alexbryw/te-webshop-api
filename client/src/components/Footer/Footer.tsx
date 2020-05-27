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
        <Container style={footerStyle} maxWidth={false}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
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
                <Grid item className={classes.adminBtn}>
                    <Link to="/admin" style={buttonStyle}>
                        <Button color="secondary" variant="outlined">
                            Admin
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}


//Footer placement is controlled in Layouts, const stickyFooter
const footerStyle: CSSProperties = {
    backgroundColor: '#346933',
    width: '100vw',
    position: 'relative',
    height: '9em',
    padding: '1em',
    margin: '1em 0 0 0',
    bottom: 0
}

const buttonStyle: CSSProperties = {
    margin: '0.5em',
    textDecoration: 'none'
}