import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";
import { appendFile } from "fs";

interface Props { }
interface State {
  products: Product[];

  uploadFile: (file: any) => any
  postProduct: (product: any, file: any) => any
  fetchProducts: () => any;
  fetchProduct: (id: string) => any;

  getCategories: () => any;
}

export const ProductContext = createContext<State>({
  products: [],

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
        // console.log(cate, found);
      });
    });
    // console.log(categories);

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
        // console.log(data);

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
        return data
      })
    return product
  }


  uploadFile = async (file: any) => {
    // console.log(file.size)
    const fd = new FormData();
    fd.append('image', file);
    // console.log(fd)
    // send `POST` request
    const uploadedFile = await fetch('http://localhost:9000/api/files/', {
      method: 'POST',
      body: fd
    })
    if (!uploadedFile) {
      console.log('this file is NOT uploading 🍊')
    }
    const newFile = await uploadedFile.json()

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      console.log('Only images are allowed.');
      return;
    }
    console.log(newFile)
    console.log(newFile._id)
    // check file size (< 2MB)
    if (file.size > 2 * 1024 * 1024) {
      console.log('File must be less than 2MB.');
      return;
    }
    return newFile
  }

  postProduct = async (product: any, file: any) => {
    // console.log('***********************')
    // console.log(product)
    // console.log(file)
    // console.log('***********************')

    const getUploadedFile = await this.uploadFile(file)
    // console.log(getUploadedFile._id)
    product.file = getUploadedFile._id
    // console.log(product)


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
    // console.log(returnedProduct)

    //TODO ERROR Controll


  };


  textLogger = (text: String): void => {
    // console.log(text, 'this is the text? form ProductContext');
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

