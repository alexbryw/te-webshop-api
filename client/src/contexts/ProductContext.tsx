import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";

const apiURL = "http://localhost:9000/api/";

interface Props { }
interface State {
  products: Product[];

  fetchProducts: () => any;
  fetchProduct: (id: string) => any;

}

export const ProductContext = createContext<State>({
  products: [],

  fetchProducts: () => {
    return [];
  },
  fetchProduct: () => {
    return {};
  }
});

export class ProductContextProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      products: [],

      fetchProducts: this.fetchProducts,
      fetchProduct: this.fetchProduct,
    };
  }

  fetchProducts = async (filter?: String) => {
    if (filter === "") {
      const products = await fetch("http://localhost:9000/api/products/", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data;
        });
      return products;
    } else {
      const products = await fetch(
        "http://localhost:9000/api/products/category/" + filter,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data;
        });
      return products;
    }
  };

  fetchProduct = async (id: string) => {
    const product = await fetch("http://localhost:9000/api/products/" + id, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });

    return product;

  }

  render() {
    return (
      <ProductContext.Provider value={this.state}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductContextProvider;

// const[products, setProducts] = React.useState([])
// const fetchProducts = async () => {
// };
