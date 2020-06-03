import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { Product } from '../items/itemListCore'
//import { items } from '../../ItemList'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TextMobileStepper from './TextMobileStepper'




export default function Home() {

    const[products, setProducts] = React.useState([])
        const fetchProducts = async () => {
            await fetch("http://localhost:9000/api/products/", {
                method: "GET",
                credentials: 'include',
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                setProducts(data)
            })
        } 
        useEffect(() => {
          fetchProducts()
        }, [])

        const[files, setFiles] = React.useState([])
        const fetchFiles = async () => {
            await fetch("http://localhost:9000/api/files/", {
                method: "POST",
                credentials: 'include',
            }).then((response) => response.json()).then((data) => {
                console.log(data);
                setFiles(data)
            })
        } 
        useEffect(() => {
          fetchFiles()
        }, [])
  
    return (
        <div>

            <TextMobileStepper />
            <Container>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    >
                    {products.map((itemData: Product, index: number) =>
                        <Grid key={index}
                        item xs={12} sm={6} md={4}
                        >
                            <ProductCard itemData={itemData} />
                        </Grid>
                    )}
                  
                </Grid>
            </Container>
        </div>
    )
}
