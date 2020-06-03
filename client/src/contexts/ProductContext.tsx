import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";

const apiURL = "http://localhost:9000/api/";

interface Props { }
interface State {
  products: Product[];

  fetchProducts: () => any;
  textLogger: (text: String) => void;
}

export const ProductContext = createContext<State>({
  products: [],

  fetchProducts: () => {
    return [];
  },
  textLogger: () => { },
});

export class ProductContextProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      products: [],

      fetchProducts: this.fetchProducts,
      textLogger: this.textLogger,
    };
  }

  fetchProducts = async () => {
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
  };

  fetchImage = () => { };

  textLogger = (text: String): void => {
    console.log(text);
  };

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
