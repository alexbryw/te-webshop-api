import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";

const apiURL = "http://localhost:9000/api/";

interface Props {}
interface State {
  products: Product[];

  uploadFile:(file:any) => any
  fetchProducts: () => any;
  textLogger: (text: String) => void;
}

export const ProductContext = createContext<State>({
  products: [],

  uploadFile: () => {
    return ""
  },

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

      uploadFile: this.uploadFile,
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



  //   // TODO FLYTTA TILL ProductContext
  //   handleimgURLChange = (event: any ) => {
  //     const input: any = document.querySelector('.imageUploader')
  //     if(input) {
  //         this.uploadFile(input.files[0])
  //     }
  // }
// TODO FLYTTA TILL ProductContext

    // TODO FLYTTA TILL ProductContext
    uploadFile = (file:any) => {

      console.log(file.size)
      // add file to FormData object
      const fd = new FormData();
      //fd.append('name','bild')
      fd.append( 'image', file);
      console.log(fd)
      // send `POST` request
      fetch('http://localhost:9000/api/files/', {
          method: 'POST',
          body: fd
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));

      if(!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
          console.log('Only images are allowed.');
          return;
      }

      // check file size (< 2MB)
      if(file.size > 2 * 1024 * 1024) {
          console.log('File must be less than 2MB.');
          return;
      }

    }    
    // TODO FLYTTA TILL ProductContext
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
