import React, { createContext, Component } from "react";

import { Product } from "../interfaces/interfaces";
import { appendFile } from "fs";

interface Props { }
interface State {
  products: Product[];

  uploadFile: (file: any) => any;
  updateProduct: (product: any, productId: any, cb: () => void) => any;
  postProduct: (product: any, cb: () => void) => any;
  fetchProducts: () => any;
  fetchProduct: (id: string) => any;
  getCategories: () => any;
  deleteProduct: (productId: any, cb: () => void) => any
}

export const ProductContext = createContext<State>({
  products: [],

  updateProduct: () => {
    return "";
  },

  uploadFile: () => {
    return "";
  },

  postProduct: () => {
    return "";
  },

  fetchProducts: () => {
    return [];
  },
  fetchProduct: () => {
    return {};
  },

  getCategories: () => {
    return [];
  },

  deleteProduct: () => {
    return [];
  },
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
      getCategories: this.getCategories,
      deleteProduct: this.deleteProduct,
    };
  }

  getCategories = async () => {
    const products = await this.fetchProducts("");
    let categories: string[] = [""];

    products.forEach((product: any) => {
      product.category.forEach((cate: string) => {
        const found = categories.find((x) => x === cate);

        if (!found) categories.push(cate);
        console.log(cate, found);
      });
    });
    // console.log(categories);

    return categories;
  };

  fetchProducts = async (filter?: String) => {
    let filterURL: string;

    if (filter === "") {
      filterURL = "http://localhost:9000/api/products/";
    } else {
      filterURL = "http://localhost:9000/api/products/category/" + filter;
    }

    const products = await fetch(filterURL, {
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
    return product
  };

  uploadFile = async (file: any) => {
    console.log(file.size);
    const fd = new FormData();
    fd.append("image", file);

    // send `POST` request
    const uploadedFile = await fetch("http://localhost:9000/api/files/", {
      method: "POST",
      body: fd,
    });

    if (!uploadedFile) {
      console.log("this file is NOT uploading 🍊");
    }
    const newFile = await uploadedFile.json();

    // .then(res => res.json())
    //.then(save => save.json())

    // .then(json => console.log(json))
    // .catch(err => console.error(err));

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      console.log("Only images are allowed.");
      return;
    }
    console.log(newFile);
    console.log(newFile._id);
    // check file size (< 2MB)
    if (file.size > 2 * 1024 * 1024) {
      console.log("File must be less than 2MB.");
      return;
    }
    return newFile;
  };

  postProduct = async (product: any, cb: () => void) => {
    const getUploadedFile = await this.uploadFile(product.file);
    product.file = getUploadedFile._id;

    // console.log("***********************");
    // console.log(product);
    // console.log(file);
    // console.log("***********************");
    // console.log(getUploadedFile._id);
    // console.log(product);
    // const fd = new FormData(file);
    //       fd.append('product', product + 'uploadFile', file._id)
    //fd.append('product', product)
    await fetch("http://localhost:9000/api/products", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: product.file,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        nrInStock: product.nrInStock,
      }),
    }).then(() => cb())

    //TODO ERROR Controll

    // .then((res) => res.json())
    // .then((json) => {
    //   console.log('************************',json);
    //  // console.log(this.uploadFile, '******************* THIS IS THE IMAGE****************')
    //   return json;
    // });
    // return ;
  };

  updateProduct = async (product: any, productId: any, cb: () => void) => {
    console.log("from updateproduct", product, productId);
    await fetch("http://localhost:9000/api/products/" + productId,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          nrInStock: product.nrInStock,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("updated product", data);
        cb()
      });
  };

  deleteProduct = async (productId: any, cb: () => void) => {
    console.log("from deleteproduct", productId)
    await fetch("http://localhost:9000/api/products/" + productId,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("deleted product", data);
        cb()
      });
  };





  //   async componentDidMount(){
  //     const data = await this.uploadFile
  //     console.log("from product Context ****HELLO****")
  //     console.log(data)
  // }

  textLogger = (text: String): void => {
    console.log(text, "this is the text? form ProductContext");
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

