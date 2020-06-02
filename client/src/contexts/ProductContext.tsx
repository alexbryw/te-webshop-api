import React, { createContext, Component } from "react";

const apiURL = "http://localhost:9000/api/";
const productURL = "http://localhost:9000/api/products/";

interface Props { }
interface State { }

export const ProductContext = createContext<State>({

})

export class ProductContextProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    // const[products, setProducts] = React.useState([])
    // const fetchProducts = async () => {
    //     await fetch("http://localhost:9000/api/products/", {
    //         method: "GET",
    //         credentials: 'include',
    //     }).then((response) => response.json()).then((data) => {
    //         console.log(data);
    //         setProducts(data)
    //     })
    // }

    render() {
        return (
            <ProductContext.Provider value={this.state}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

export default ProductContextProvider;