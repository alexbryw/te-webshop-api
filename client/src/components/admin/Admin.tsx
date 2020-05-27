import React from 'react'
import { Product } from '../items/itemListCore'
import { items } from '../../ItemList'
import AdminLayout from './AdminLayout'
import createTypography from '@material-ui/core/styles/createTypography'


interface Props {
}

interface State {
    items: Product[]
}

export default class Admin extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            items: items
        }   
    }

    //Updates the edited item in Local Storage (is lifted from EditItem)
    handleSubmit = (arrayIndex:number, itemData:Product) => {
            items[arrayIndex] = {
            id: itemData.id,
            name: itemData.name, 
            price: itemData.price,
            imgURL: itemData.imgURL,
            description: itemData.description,
            nrInStock: itemData.nrInStock,
            category: itemData.category
        }
        if( itemData.name === "" ||
            isNaN(itemData.price) ||
            itemData.imgURL === "" ||
            itemData.description === "" ||
            isNaN(itemData.nrInStock) ||
            itemData.category === "" ){
            } else {
                localStorage.setItem('productList', JSON.stringify(this.state.items))
                this.setState({items: this.state.items})
            }
    }

    //Removes a item in Local Storage (is lifted from EditItem)
    delete = (i:number) => {
        let productList = this.state.items
        productList = productList.slice(0, i).concat(productList.slice(i + 1, productList.length))
        this.setState({items: productList})
        localStorage.setItem('productList', JSON.stringify(productList))
    }

    //Add a new item to Local Storage (is lifted from NewItem)
    handleNew = (newItem:any) => {
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
            description: newItem.description,
            nrInStock: newItem.nrInStock,
            category: newItem.caregory
        })
        
        if(
            newItem.name === "" ||
            isNaN(newItem.price) ||
            newItem.imgURL === "" ||
            newItem.description === "" ||
            isNaN(newItem.nrInStock) ||
            newItem.caregory === ""
        ){
            } else {
                localStorage.setItem('productList', JSON.stringify(productList))
                this.setState({items: productList})
            }
    }

    render(){
        return(
            <AdminLayout 
            items={this.state.items}
            delete={this.delete}
            handleSubmit={this.handleSubmit}
            handleNew={this.handleNew}
            />
        )
    }
}