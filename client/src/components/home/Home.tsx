import React, { useEffect } from "react";

// COMPONENTS
import ProductCard from "./ProductCard";
import TextMobileStepper from "./TextMobileStepper";

// INTERFACES
import { Product } from "../../interfaces/interfaces"

// MATERIAL UI
import { Grid, Container, Typography } from "@material-ui/core/";
import { Redirect } from "react-router-dom";

interface Props {
  productContext: any;
  userContext: any;
}

export default function Home(props: Props) {
  const [products, setProducts] = React.useState([]);

  const getProducts = async () => { 
    setProducts(await props.productContext.fetchProducts());
    console.log(products);
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
        // direction="row"
        // justify="center"
        // alignItems="center"
        >
          {products.length > 0 ? products.map((product: Product, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <ProductCard
                product={product}
                productContext={props.productContext}
              />
            </Grid>
          )) : <Grid item>
              <Typography variant="h6">
                No products available
                  </Typography>
            </Grid>}
        </Grid>
      </Container>

    </>
  );
}
