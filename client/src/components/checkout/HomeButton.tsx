import React,{ CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import { IconButton } from '@material-ui/core'

export default function HomeButton() {
    return(
        <div>
            <Link to="/" style={homeButtonLink}>
                <IconButton color="primary">
                    <HomeIcon/>
                </IconButton>
            </Link>
        </div>
    )
}

const homeButtonLink:CSSProperties = {
    border: 'solid 0.15em #2c393f',
    position:'absolute',
    left: '1em', 
    borderRadius:'3em',
    textDecoration:'none',
}