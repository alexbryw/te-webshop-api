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
      });
    });

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
        return data;
      });
    return product
  };

  uploadFile = async (file: any) => {
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

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      console.log("Only images are allowed.");
      return;
    }
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
  };

  updateProduct = async (product: any, productId: any, cb: () => void) => {
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
        cb()
      });
  };

  deleteProduct = async (productId: any, cb: () => void) => {
    await fetch("http://localhost:9000/api/products/" + productId,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        cb()
      });
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

