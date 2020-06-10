import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";
import { appendFile } from "fs";

interface Props { }
interface State {
  products: Product[];

  uploadFile:(file:any) => any
  updateProduct:(product:any) => any
  postProduct:(product: any, file:any) => any
  fetchProducts: () => any;
  fetchProduct: (id: string) => any;
  getCategories: () => any;
}

export const ProductContext = createContext<State>({
  products: [],

  updateProduct: () => {
    return ""
  },

  uploadFile: () => {
    return ""
  },

  postProduct: () => {
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

      updateProduct: this.updateProduct,
      uploadFile: this.uploadFile,
      postProduct: this.postProduct,
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


    uploadFile = async (file:any) => {
      console.log(file.size)
      const fd = new FormData();
      fd.append( 'image', file);
      console.log(fd)
      // send `POST` request
      const uploadedFile = await fetch ('http://localhost:9000/api/files/', {
          method: 'POST',
          body: fd
      })
      if(!uploadedFile){
        console.log('this file is NOT uploading 🍊')
      }
      const newFile = await uploadedFile.json()
    

      // .then(res => res.json())
      //.then(save => save.json())
      
      // .then(json => console.log(json))
      // .catch(err => console.error(err));

      if(!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
          console.log('Only images are allowed.');
          return;
      }
      console.log(newFile)
      console.log(newFile._id)
      // check file size (< 2MB)
      if(file.size > 2 * 1024 * 1024) {
          console.log('File must be less than 2MB.');
          return;
      }
      return newFile
    }    

  postProduct = async (product: any, file:any) => {
    console.log('***********************')
    console.log(product)
    console.log(file)
    console.log('***********************')
    const getUploadedFile = await this.uploadFile(file)
    console.log(getUploadedFile._id)
    product.file = getUploadedFile._id
    console.log(product)
    // const fd = new FormData(file);
    //       fd.append('product', product + 'uploadFile', file._id)
          //fd.append('product', product)
  

    const completeProduct = await fetch("http://localhost:9000/api/products", {
      method: "POST",
      credentials: "include",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "file": product.file,
        "title": product.title,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "nrInStock": product.nrInStock
      })
    }) 
    const returnedProduct = await completeProduct.json()
    console.log(returnedProduct)

    //TODO ERROR Controll

      // .then((res) => res.json())
      // .then((json) => {
      //   console.log('************************',json);
      //  // console.log(this.uploadFile, '******************* THIS IS THE IMAGE****************')
      //   return json;
      // });
      // return ;
    
  };

  updateProduct = async (product: any) => {
    console.log("from updateproduct", product)
  }

//   async componentDidMount(){
//     const data = await this.uploadFile
//     console.log("from product Context ****HELLO****")
//     console.log(data)
// }

  textLogger = (text: String): void => {
    console.log(text, 'this is the text? form ProductContext');
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
