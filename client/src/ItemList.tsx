import { itemsCore } from './components/items/itemListCore'
import { Product, NewProduct } from "./interfaces/interfaces"

export const items: Array<Product> = getList()

function getList() {
    let itemList = []
    //Adds the core itemList if local store is empty
    if (localStorage.getItem('productList') === null) {
        localStorage.setItem('productList', JSON.stringify(itemsCore))
    }
    //Uppdates itemList with Local Store version
    itemList = JSON.parse(localStorage.getItem('productList') || '{}')
    return itemList
}

export async function fetchProducts() {
    const products: [NewProduct] = await fetch("http://localhost:9000/api/products/", {
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
