import React, { useEffect } from "react";

// STYLES
import useStyles from "./homeStyles"

// COMPONENTS
import ProductCard from "./ProductCard";
import TextMobileStepper from "./TextMobileStepper";

// INTERFACES
import { Product } from "../../interfaces/interfaces";

// MATERIAL UI
import { Grid, Container, Button, Typography } from "@material-ui/core/";
import { Redirect } from "react-router-dom";

interface Props {
  productContext: any;
  userContext: any;
}

export default function Home(props: Props) {
  const classes = useStyles()


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
      <Typography>Kategorier</Typography>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.categoriesBar}
      >
        {/* <Typography>Kategorier</Typography> */}
        <Button variant="outlined" color="secondary">
          Alla
        </Button>
        <Button variant="outlined" color="secondary">
          Rött te
        </Button>
        <Button variant="outlined" color="secondary">
          Svart te
        </Button>
        <Button variant="outlined" color="secondary">
          Koffeinfritt te
        </Button>
      </Grid>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.productContainer}
        >
          {products.map((product: Product, index: number) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <ProductCard
                product={product}
                productContext={props.productContext}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
