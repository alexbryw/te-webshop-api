import React from 'react'


interface Props {
    Order: any
}

interface State {
    allOrders: any
}

export default class OrderListTemp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            allOrders: []
        }
    }

    async componentDidMount() {
        const orders = await this.props.Order.getAllOrders()
        this.setState({ allOrders: orders })
    }

    render() {
        return (
            <div>
                <h3>OrderTempList</h3>
                {this.state.allOrders.length > 0 ? this.state.allOrders.map((order: any, index: any) => <h3 key={index}>{order.to_firstname}</h3>) : <h3>Nothing here.</h3>}
                <h3>End order List</h3>
            </div>
        )
    }
}