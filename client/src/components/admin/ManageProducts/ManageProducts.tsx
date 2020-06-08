import React, { useEffect } from 'react'

// COMPONENTS
import ProductAdminList from './ProductAdminList'
import NewItemToggle from './NewItemToggle'
import { items } from '../../../ItemList'

// INTERFACES
import { Product } from '../../../interfaces/interfaces'

// MATERIAL UI
import { Container, Card } from '@material-ui/core/'

// CONTEXTS
// import { ProductContext } from '../../../contexts/ProductContext';

interface Props {
    productContext: any
    // items: Product[]
    // delete: any
    // handleSubmit: any
    // handleNew: any
}

interface State {
}

const ManageProducts = (props: Props) => {
    const [itemList, setItemList] = React.useState(items)
    const [products, setProducts] = React.useState<[]>([]);


    //Updates the edited item in Local Storage (is lifted from EditItem)
    const handleSubmit = (arrayIndex: number, itemData: Product) => {
        items[arrayIndex] = {
            id: itemData.id,
            name: itemData.name,
            price: itemData.price,
            imgURL: itemData.imgURL,
            description: itemData.description
        }
        if (itemData.name === "" ||
            isNaN(itemData.price) ||
            itemData.imgURL === "" ||
            itemData.description === "") {
        } else {
            localStorage.setItem('productList', JSON.stringify(itemList))
            setItemList(itemList)
        }
    }

    //Removes a item in Local Storage (is lifted from EditItem)
    const handleDelete = (i: number) => {
        let productList: any = itemList
        productList = productList.slice(0, i).concat(productList.slice(i + 1, productList.length))
            ({ items: productList })
        localStorage.setItem('productList', JSON.stringify(productList))
    }

    //Add a new item to Local Storage (is lifted from NewItem)
    const handleNew = (newItem: any) => {
        const productList = items
        let allIDs = []
        let highestID
        for (let i = 0; i < items.length; i++) {
            allIDs.push(productList[i].id)
        }
        //Checks the highest ID and adds 1 so that no ID is the same
        //Known "bug", if every item is removed, the first item added will have ID null
        //Second will have 1
        highestID = Math.max(...allIDs) + 1
        productList.push({
            id: highestID,
            name: newItem.name,
            price: newItem.price,
            imgURL: newItem.imgURL,
            description: newItem.description
        })

        if (
            newItem.name === "" ||
            isNaN(newItem.price) ||
            newItem.imgURL === "" ||
            newItem.description === ""
        ) {
        } else {
            localStorage.setItem('productList', JSON.stringify(productList))
            setItemList(productList)
        }
    }

    const getProducts = async () => {
        setProducts(await props.productContext.fetchProducts(""));
      };

      useEffect(() => {
        getProducts()
      },[]);


    return (
        // <ProductContext.Consumer>{(productContext) => (
            <Container>
                {console.log("from manage product")}
                {console.log(products)}

                <Card variant="outlined">
                    <NewItemToggle handleNew={handleNew} productContext={props.productContext}/>
                    
                </Card>
                {/* {if(product.length > 0){} */}
                {products.map((product: any, index: number) =>
                    <ProductAdminList itemData={product} key={index} arrayIndex={index} delete={handleDelete} handleSubmit={handleSubmit} />
                )}
            </Container>
        // )}</ProductContext.Consumer>
    )

}

export default ManageProducts
