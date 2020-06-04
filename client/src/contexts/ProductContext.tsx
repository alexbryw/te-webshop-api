import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";

const apiURL = "http://localhost:9000/api/";

interface Props {}
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
  textLogger: () => {},
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

  fetchProductsByCategory = async () => {
    const products = await fetch("http://localhost");
  };

  fetchImage = () => {};

 

//   postImage = async () => {
//     const dbimage = await fetch("http://localhost:9000/api/files/", {
//       method: "POST",
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         console.log('************************',json);
//         return json;
//       });
//     return dbimage;
    
//   };

//   async componentDidMount(){
//     const data = await this.postImage()
//     console.log("from product Context ****HELLO****")
//     console.log(data)
// }

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
