import React, { createContext, Component } from "react";


const apiURL = "http://localhost:9000/api/";
const orderURL = "http://localhost:9000/api/orders/";

interface Props { }
interface State {
    getOrders: () => any
    updateOrders: (orderID: any) => any

}

export const OrderContext = createContext<State>({
    getOrders: () => { },
    updateOrders: () => { },

});

export class OrderContextProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            getOrders: this.getOrders,
            updateOrders: this.updateOrders,
        }
    }


//hämta en besökares alla ordrar
//******************   |    */
//******************   |     */
//******************   V     */
// getAllOrders = async () => {
//     const order = await fetch(orderURL, {}


    getOrders = async () => {
        console.log('hello')
        const orders = await fetch("http://localhost:9000/api/orders/", {

            method: "GET",
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                return data
            })

        return orders
    }

    updateOrders = async (order: any) => {
        const updatedOrders = await fetch("http://localhost:9000/api/orders/" + order._id, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isOrderShipped: true
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const orders = this.getOrders()
                return orders
            })

        return updatedOrders
    }



    render() {
        return (
            <OrderContext.Provider value={this.state}>
                {this.props.children}
            </OrderContext.Provider>
        );
    }
}

export default OrderContextProvider;
