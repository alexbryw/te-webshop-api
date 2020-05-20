import { Product } from "./components/items/itemListCore";

//For Url path props in React Router in Product component.
export interface RouteMatch {
    path: string
    url: string
    isExact: boolean
    params:{
        id: string
    }
}

export interface CartItem{
    id: number
    nrItems: number
    product: Product
}

//Sorry for long lump of code
export interface CustomerInfo {
    firstName: string
    lastName: string
    address: string
    zipCode: any
    city: string
    email: any
    mobile: any
    shippingMethod: string
    shippingCost:any
    deliveryDate:any

    isFirstNameError: boolean
    firstNameErrorText: string
    isLastNameError: boolean
    lastNameErrorText: string
    isAddressError: boolean
    addressErrorText: string
    zipCodeErrorText: string
    isZipCodeError: boolean
    cityErrorText: string
    isCityError: boolean
    emailErrorText: string
    isEmailError: boolean
    isMobileError: boolean
    mobileErrorText: string
    isShippingError: boolean
    shippingErrorText: string
}

export interface CustomerPaymentInfo {
    paymentMethod: string
    cardOwner:string
    cardNr: any
    cardExp: any
    cardCVC: any
    swishNr: any
    emailFaktura:any

    isPaymentError: boolean
    paymentErrorText:string
    isCardOwnerError: boolean,
    cardOwnerErrorText: string,
    isCardNrError: boolean,
    cardNrErrorText: string
    isCardExpError: boolean,
    isCardCVCError: boolean,
    cardCVCErrorText: string
    cardExpErrorText: string,
    isSwishNrError: boolean,
    swishErrorText: string,
    isEmailFakturaError: boolean,
    emailErrorText: string
}