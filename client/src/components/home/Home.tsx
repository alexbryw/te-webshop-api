import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '../../interfaces/interfaces'
import { items } from '../../ItemList'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextMobileStepper from './TextMobileStepper'


export default function Home() {

    return (
        <>
            <TextMobileStepper />
            <Container>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {items.map((itemData: Product, index: number) =>
                        <Grid key={index}
                            item xs={12} sm={6} md={4}
                        >
                            <ProductCard itemData={itemData} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>

    )
}

