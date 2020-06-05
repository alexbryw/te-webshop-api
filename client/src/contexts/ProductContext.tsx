import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";

const apiURL = "http://localhost:9000/api/";

interface Props { }
interface State {
  products: Product[];

  uploadFile:(file:any) => any
  fetchProducts: () => any;
  fetchProduct: (id: string) => any;

  getCategories: () => any;
}

export const ProductContext = createContext<State>({
  products: [],

  uploadFile: () => {
    return ""
  },

  fetchProducts: () => {
    return [];
  },
  fetchProduct: () => {
    return {};
  },

  getCategories: () => {
    return [];
  }
});

export class ProductContextProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      products: [],

      uploadFile: this.uploadFile,
      fetchProducts: this.fetchProducts,
      fetchProduct: this.fetchProduct,

      getCategories: this.getCategories
    };
  }

  getCategories = async () => {
    const products = await this.fetchProducts("")
    let categories: string[] = [""]

    products.forEach((product: any) => {
      product.category.forEach((cate: string) => {
        const found = categories.find(x => x === cate)

        if (!found) categories.push(cate)
        console.log(cate, found);
      });
    });
    console.log(categories);

    return categories
  }

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
      });}


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
