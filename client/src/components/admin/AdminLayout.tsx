import React from 'react'
import Container from '@material-ui/core/Container'
import { Product } from '../items/itemListCore'
import { items } from '../../ItemList'
import Card from '@material-ui/core/Card'
import ProductAdminList from './ProductAdminList'
import NewItemToggle from './NewItemToggle'
import { OrderContext } from '../../contexts/OrderContext'
import OrderListTemp from './OrderListTemp'

interface Props {
    items: Product[]
    delete: any
    handleSubmit: any
    handleNew: any
}

interface State {
}

export default class AdminLayout extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
        }   
    }

    render(){
        return(
            <OrderContext.Consumer>{(Order)=> (
            <Container>
                {/* <OrderListTemp Order={Order} /> */}
                <Card variant="outlined">
                    <NewItemToggle handleNew={this.props.handleNew}/>
                </Card>
                {items.map((itemData:Product, index:number) =>
                    <ProductAdminList itemData={itemData} key={index} arrayIndex={index} delete={this.props.delete} handleSubmit={this.props.handleSubmit}/>
                )}
            </Container>
            )}</OrderContext.Consumer>
        )
    }
}