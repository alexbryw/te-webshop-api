import React, {CSSProperties} from 'react'
import AddressForm from './AddressForm'
import Payment from './Payment'
import Button from '@material-ui/core/Button'
import { CustomerInfo, CustomerPaymentInfo, CartItem } from '../../interfaces/interfaces'
import { Grid } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import HomeButton from './HomeButton'
import ShoppingCart from '../ShoppingCart'
import { NewCartContext , State as CartState} from '../../contexts/NewCartContext'
import ShoppigCartCheckout from './../ShoppingCartCheckout'
import serverAPI from '../../serverAPI'
import { Link } from 'react-router-dom'

interface Props{
    cartState: CartState
    userContext: any
    orderContext: any
}

interface State{
    step:number,
    customerInfo?:any
    customerPaymentInfo?:any
    orderNumber:number
    disableOrderButton: boolean
    orderResponse: any
}

export default class CheckOut extends React.Component<Props, State>{
    constructor(props:Props){
        super(props)
        this.state = {
            step: 1,
            customerInfo: undefined,
            customerPaymentInfo: undefined,
            orderNumber: 0,
            disableOrderButton: false,
            orderResponse: {}
        }   
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps: Props, prevState: State){
        if(this.state.step === 3 && prevState.step !== 3){
            this.props.cartState.emptyCart()
        }
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
          step: step + 1
        })
    }

    previousStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        })
    }

    private onAddressFormSubmit = (customerInfoFromForm: CustomerInfo) => {
        this.setState({
            customerInfo: customerInfoFromForm,
            step: this.state.step + 1
        })
    }

    private onPaymentFormSubmit = (customerInfoFromForm: CustomerPaymentInfo) => {
        const ts = Math.round((new Date()).getTime() / 1000)

        if(this.state.disableOrderButton === false){
            this.apiCall(customerInfoFromForm, ts)
        }
        this.setState({disableOrderButton: true})
    }

    async apiCall(customerInfoFromForm: CustomerPaymentInfo, ts: number){
        // console.log(this.props.userContext._id, " user id")
        // console.log("from order api call")
        // console.log(this.state.customerInfo)
        // console.log(this.props.cartState.cartList)
        console.log(customerInfoFromForm.paymentMethod)
        if(this.props.cartState.cartList && this.props.cartState.cartList.length > 0 && this.state.customerInfo){
            console.log("ok")
        }
        const newProductRow = this.props.cartState.cartList.map( (cartItem: CartItem) => {return {product: cartItem.id, qty: cartItem.nrItems}})
        // console.log(newProductRow)
        const newOrder = {
            user: this.props.userContext._id,
            shipping: this.state.customerInfo.shippingId,
            productRow: newProductRow,
            to_firstname: this.state.customerInfo.firstName,
            to_lastname: this.state.customerInfo.lastName,
            to_street: this.state.customerInfo.address,
            to_city: this.state.customerInfo.city,
            to_zip: this.state.customerInfo.zipCode,
            paymentMethod: customerInfoFromForm.paymentMethod
        }
        console.log(newOrder)
        const response = await this.props.orderContext.sendOrder(newOrder)
        // const response = await serverAPI(customerInfoFromForm)
        if(response){
            if(response.err){
                console.log(response.err)
            }
            this.setState({
            customerPaymentInfo: customerInfoFromForm,
            step: this.state.step + 1,
            orderNumber: ts,
            disableOrderButton: false,
            orderResponse: response
            })
        }
    }

    render(){
        const { step } = this.state
        let continueButton:any
        if(!this.state.disableOrderButton){
            continueButton = <Button 
                                variant="contained" 
                                color="primary"
                                style={{margin:'0 0 1em 1em'}}
                                onClick = {this.previousStep}> 
                                Stämmer inte?                                   
                            </Button>
        }

        switch(step){
            case 1:
                return(
                    <div>
                        <HomeButton/>
                        <Grid 
                            container
                            justify="center"
                            style={gridStyle}>
                            <Grid item xs={12} sm={6}>
                                <Card style={checkoutStyle}>
                                    <Typography color="primary" variant="h4" style={{...{marginLeft:"1rem"}, ...{marginTop:"1.5em"}}}>
                                        Kassa
                                    </Typography>

                                    {this.props.cartState.cartList.length > 0 ? 
                                        <div>
                                            <ShoppingCart/>
                                            <AddressForm 
                                                customerInfo={this.state.customerInfo} 
                                                onSubmit={this.onAddressFormSubmit}
                                                cartState={this.props.cartState}
                                            />
                                        </div>
                                        :
                                        <div style = {flexIt}>
                                            <Typography variant="h5" color="primary">Kundvagnen är tom.</Typography>
                                            <br/>
                                            <Typography variant="h5" color="primary">Gå till <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Startsidan</Link></Typography>
                                        </div>
                                    }
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                )
            break

            case 2:
                if(this.state.customerInfo) {
                    return(
                        <NewCartContext.Consumer>
                        {(cartState) => (
                            <div>
                                <HomeButton/>
                                <Grid container
                                    justify="center"
                                    style={gridStyle}
                                >

                                    <Grid item xs={12} sm={6}>

                                        <Card style={cardStyle}>
                                                <ShoppigCartCheckout/>
                                                <Typography variant = "h6">Skickas till:</Typography>
                                                <Typography>{this.state.customerInfo?.firstName} {this.state.customerInfo?.lastName}</Typography>
                                                <Typography>{this.state.customerInfo?.address}</Typography>
                                                <Typography>{this.state.customerInfo?.zipCode} {this.state.customerInfo?.city}</Typography>
                                                <br/>
                                                <Typography>Mail: {this.state.customerInfo?.email}</Typography>
                                                <Typography>Mobilnummer: {this.state.customerInfo?.mobile}</Typography>          
                                                <br/>           
                                                <Typography>Valt Fraktsätt: {this.state.customerInfo?.shippingMethod} ({this.state.customerInfo?.shippingCost} kr)</Typography>
                                                <Typography style = {{fontWeight:'bold'}}>Förväntad leveransdag: {this.state.customerInfo?.deliveryDate} </Typography>
                                                <br/>
                                                <Typography variant="h5" color="primary">
                                                    Att betala: {cartState.cartTotalPrice + this.state.customerInfo?.shippingCost} kr
                                                    <br/>
                                                    <span style = {{...{fontSize: '0.6rem'}, ...{marginLeft:'6.5rem'}}}>(varav {cartState.cartTotalPrice * 0.25} kr moms).</span>
                                                </Typography>                      
                                                <b/>
                                                <Payment
                                                onSubmit={this.onPaymentFormSubmit}
                                                customerInfo={this.state.customerInfo}
                                                isDisabled = {this.state.disableOrderButton}
                                                />
                                                {continueButton}
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>               
                        )}                   
                        </NewCartContext.Consumer>
                    )
                }
            break

            case 3:
                if(this.state.customerInfo && this.state.customerPaymentInfo) {
                    return(
                        <NewCartContext.Consumer>
                        {(cartState) => (  
                            <div>
                                <HomeButton/>
                                <Grid container
                                    justify="center"
                                    style={gridStyle}>
                                    <Grid item xs={12} sm={6}>
                                        <Card style={cardStyle}>
                                            <h1>Bravo!</h1>
                                            
                                            {this.state.orderResponse.err ? <h3>{this.state.orderResponse.err}</h3> :
                                            <div>
                                                <h3>first name: {this.state.orderResponse.to_firstname}</h3>
                                                <h3>last name: {this.state.orderResponse.to_lastname}</h3>
                                                <h3>City: {this.state.orderResponse.to_city}</h3>
                                                <h3>Street: {this.state.orderResponse.to_street}</h3>
                                                <h3>Area code: {this.state.orderResponse.to_zip}</h3>
                                                {/* <h3>Nr of products: {this.state.orderResponse.productRow.length}</h3> */}
                                                <h3>orderDate: {this.state.orderResponse.orderDate}</h3>
                                                {/**isOrderShipped: false
                                                    orderDate: "2020-06-10T16:03:09.596Z"
                                                    productRow: (2) [{…}, {…}]
                                                    shipping: "5ed0edb79781da7e89d7cb50"
                                                    to_city: "Götetest"
                                                    to_firstname: "Bruce"
                                                    to_lastname: "Banner"
                                                    to_street: "Testgatan 18"
                                                    to_zip: 12345
                                                    user: "5edf8924bb36e02f2c910771" */}
                                            </div>
                                            }
                                            <Typography>Du har beställt supergott te för den totala kostnaden av {cartState.savedCartTotalPrice + this.state.customerInfo?.shippingCost}kr! <br/> Vi har skickat bekräftelse till din mail: {this.state.customerInfo?.email}</Typography>
                                            <br/>
                                            <Typography>Beräknad leveransdag: {this.state.customerInfo?.deliveryDate}</Typography>
                                            <br/>
                                            <Typography>Ditt ordernummer är: {this.state.orderNumber}</Typography>
                                            <ShoppigCartCheckout/>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                        )}                   
                        </NewCartContext.Consumer>
                    )
                }
            break
        }
    }
}

const checkoutStyle:CSSProperties = {
    padding: '1rem'
}

const cardStyle:CSSProperties = {
    padding: '2rem'
}

const gridStyle:CSSProperties = {
    maxWidth:'100vw',
}

const flexIt:CSSProperties = {
    marginTop: '3rem',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
} 