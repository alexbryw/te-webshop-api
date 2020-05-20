import React from 'react'
import { Product } from '../items/itemListCore'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import PurchasingArea from './PurchasingArea'


interface Props{
    itemData: Product
}

const useStyles = makeStyles({
    media: {
      height: '50vh',
    },
  })

export default function ViewProduct(props:Props) {
    const classes = useStyles()


    return(
        <Card>
            <Grid 
                container
                spacing={5}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={6} md={4}>
                    <CardMedia
                        className={classes.media}
                        image={props.itemData?.imgURL}
                        title={props.itemData?.name + " image"}
                        />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            {props.itemData?.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" color="textSecondary" component="h2">
                            {props.itemData?.price + ' kr'}
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                            {props.itemData?.description}
                        </Typography>
                        <PurchasingArea itemData={props.itemData}/>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}