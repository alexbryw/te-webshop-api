import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import TextMobileStepper from "./TextMobileStepper";
import { Product } from "../items/itemListCore";
// import { items } from '../../ItemList'

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

interface Props {
  productContext: any;
}

export default function Home(props: Props) {
  const [products, setProducts] = React.useState([]);

  const getProducts = async () => {
    setProducts(await props.productContext.fetchProducts());
  };

  useEffect(() => {
    getProducts();
  }, []);

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
          {products.map((product: Product, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <ProductCard product={product} productContext={productContext} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
