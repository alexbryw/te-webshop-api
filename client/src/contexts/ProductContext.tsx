import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";

const apiURL = "http://localhost:9000/api/";

interface Props { }
interface State {
  products: Product[];

  fetchProducts: () => any;
  fetchProduct: (id: string) => any;

  getCategories: () => any;
}

export const ProductContext = createContext<State>({
  products: [],

  fetchProducts: () => {
    return [];
  },
  fetchProduct: () => {
    return {};
  },

  getCategories: () => {
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

      getCategories: this.getCategories
    };
  }

  getCategories = async () => { }

  fetchProducts = async (filter?: String) => {
    let filterURL: string;

    if (filter === "") {
      filterURL = "http://localhost:9000/api/products/"

    } else {
      filterURL = "http://localhost:9000/api/products/category/" + filter
    }

    const products = await fetch(filterURL,
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
