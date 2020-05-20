import React from 'react'
import Container from '@material-ui/core/Container'
import { Product } from '../items/itemListCore'
import { items } from '../../ItemList'
import Card from '@material-ui/core/Card'
import ProductAdminList from './ProductAdminList'
import NewItemToggle from './NewItemToggle'

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
            <Container>
                <Card variant="outlined">
                    <NewItemToggle handleNew={this.props.handleNew}/>
                </Card>
                {items.map((itemData:Product, index:number) =>
                    <ProductAdminList itemData={itemData} key={index} arrayIndex={index} delete={this.props.delete} handleSubmit={this.props.handleSubmit}/>
                )}
            </Container>
        )
    }
}