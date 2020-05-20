import { itemsCore, Product } from './components/items/itemListCore'

export const items: Array<Product> = getList()

function getList(){
    let itemList=[]
    //Adds the core itemList if local store is empty
    if(localStorage.getItem('productList') === null){
        localStorage.setItem('productList', JSON.stringify(itemsCore))
    }
    //Uppdates itemList with Local Store version
    itemList = JSON.parse(localStorage.getItem('productList') || '{}')
    return itemList
}

