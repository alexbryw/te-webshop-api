import React, { CSSProperties } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import { CustomerInfo } from '../../interfaces/interfaces'
import { Typography } from '@material-ui/core/'
import { Grid } from '@material-ui/core/'
import { State as CartState } from '../../contexts/NewCartContext'

interface Props {
  onSubmit: (customerInfo: CustomerInfo) => void
  customerInfo: CustomerInfo
  cartContext: CartState
}

export default class AddressForm extends React.Component<Props, CustomerInfo> {

  constructor(props: Props) {
    super(props)
    this.state = {
      firstName: '',
      isFirstNameError: false,
      firstNameErrorText: '',

      lastName: '',
      isLastNameError: false,
      lastNameErrorText: '',

      address: '',
      isAddressError: false,
      addressErrorText: '',

      zipCode: '',
      zipCodeErrorText: '',
      isZipCodeError: false,

      city: '',
      cityErrorText: '',
      isCityError: false,

      email: '',
      emailErrorText: '',
      isEmailError: false,

      mobile: '',
      isMobileError: false,
      mobileErrorText: '',

      shippingMethod: '',
      isShippingError: false,
      shippingErrorText: '',
      deliveryDate: '',
      shippingCost: '',
      shippingId: '',
      shippingOptions: []
    }
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
    const shippingOptions = await this.props.cartContext.getShippingOptions()
    this.setState({
      shippingOptions: shippingOptions
    })
  }

  //---ALL INPUT VALIDATION

  validateInput = () => {

    let isError = false
    const errors = {
      firstNameErrorText: '', isFirstNameError: false,
      lastNameErrorText: '', isLastNameError: false,
      addressErrorText: '', isAddressError: false,
      zipCodeErrorText: '', isZipCodeError: false,
      cityErrorText: '', isCityError: false,
      emailErrorText: '', isEmailError: false,
      mobileErrorText: '', isMobileError: false,
      shippingErrorText: '', isShippingError: false
    }

    if (this.state.firstName.length < 1) {
      isError = true
      errors.firstNameErrorText = 'Obligatorisk'
      errors.isFirstNameError = true   //Behövs eventuellt inte
    }

    if (this.state.lastName.length < 1) {
      isError = true
      errors.lastNameErrorText = 'Obligatorisk'
      errors.isLastNameError = true
    }

    if (this.state.address.length < 2) {
      isError = true
      errors.addressErrorText = 'Obligatorisk'
      errors.isAddressError = true
    }

    if (this.state.city.length < 1) {
      isError = true
      errors.cityErrorText = 'Obligatorisk'
      errors.isCityError = true
    }

    const zipCodeVal = /^\d{5}$/

    if (this.state.zipCode.match(zipCodeVal)) {
      errors.isZipCodeError = false
    }
    else {
      isError = true
      errors.zipCodeErrorText = 'fem siffror'
      errors.isZipCodeError = true
    }

    const mailVal = /^\w+([.-]?w+)*@\w+([.-]?w+)*(\.\w{2,3})+$/

    if (mailVal.test(this.state.email)) {
      errors.isEmailError = false
    }
    else {
      isError = true
      errors.emailErrorText = 'ogiltig e-mail'
      errors.isEmailError = true
    }

    const phoneVal = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

    if (this.state.mobile.match(phoneVal)) {
      errors.isMobileError = false
    }
    else {
      isError = true
      errors.mobileErrorText = 'ogiltigt mobilnummer-format'
      errors.isMobileError = true
    }

    if (this.state.shippingMethod === '') {
      isError = true
      errors.shippingErrorText = 'Du måste välja fraktsätt'
      errors.isShippingError = true
    }

    if (isError) {
      this.setState({
        ...this.state,
        ...errors,
      })
    }
    return isError
  }

  //----SUBMIT EVENT---------

  private onSubmit = () => {
    const err = this.validateInput()
    if (!err) {
      this.props.onSubmit(this.state)
    }
  }

  // ------- SHIPPING ------
  private handleShipmentInput = (event: { target: { value: any } }) => {
    let shippingOption
    if (event.target.value) { //just find shipping object from event.target.value _id.
      shippingOption = this.state.shippingOptions.find((shippingOption: any) => shippingOption._id === event.target.value)
    }
    this.setState({
      shippingMethod: shippingOption.companyName ? shippingOption.companyName : "",
      deliveryDate: shippingOption.deliveryTime ? this.calculateDeliveryDate(shippingOption.deliveryTime) : this.calculateDeliveryDate(5),
      shippingCost: shippingOption.price ? shippingOption.price : 0,
      shippingId: shippingOption._id ? shippingOption._id : ""
    })
  }


  private calculateDeliveryDate(daysToDeliver: any) {
    let today = new Date()
    let business_days = daysToDeliver
    let deliveryDate = today
    let total_days = business_days

    for (let days = 1; days <= total_days; days++) {
      deliveryDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000))
      if (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
        total_days++
      }
    }

    let deliveryNumberDate: any = deliveryDate.getDate()
    let deliveryWeekday: any = deliveryDate.getDay()

    let fixWeekday = [6, 0, 1, 2, 3, 4, 5]
    deliveryWeekday = fixWeekday[deliveryWeekday]
    let weekdayName = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"]
    deliveryWeekday = weekdayName[deliveryWeekday]

    let deliveryMonth: any = deliveryDate.getMonth()
    const monthName = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"]
    deliveryMonth = monthName[deliveryMonth]

    let calculatedDeliveryDate = deliveryWeekday + ' ' + deliveryNumberDate + ' ' + deliveryMonth
    return calculatedDeliveryDate
  }

  render() {
    return (
      <div>
        <form autoComplete="on" >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                name="fname"
                autoComplete='given-name'
                label="Förnamn"
                value={this.state.firstName}
                error={this.state.isFirstNameError}
                fullWidth
                helperText={this.state.firstNameErrorText}
                onChange={(event) => { this.setState({ firstName: event.target.value }) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                name="lname"
                autoComplete="family-name"
                label="Efternamn"
                value={this.state.lastName}
                error={this.state.isLastNameError}
                fullWidth
                helperText={this.state.lastNameErrorText}
                onChange={(event) => { this.setState({ lastName: event.target.value }) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                name="ship-address"
                autoComplete="shipping street-address"
                label="Adress"
                value={this.state.address}
                error={this.state.isAddressError}
                fullWidth
                helperText={this.state.addressErrorText}
                onChange={(event) => { this.setState({ address: event.target.value }) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                name="ship-zip"
                autoComplete="shipping postal-code"
                label="Postnummer"
                value={this.state.zipCode}
                error={this.state.isZipCodeError}
                fullWidth
                helperText={this.state.zipCodeErrorText}
                onChange={(event) => { this.setState({ zipCode: event.target.value }) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                name="ship-city"
                autoComplete="shipping locality"
                label="Ort"
                value={this.state.city}
                error={this.state.isCityError}
                fullWidth
                helperText={this.state.cityErrorText}
                onChange={(event) => { this.setState({ city: event.target.value }) }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                color="secondary"
                name="phone"
                autoComplete="tel"
                label="Mobil-nummer"
                value={this.state.mobile}
                error={this.state.isMobileError}
                fullWidth
                helperText={this.state.mobileErrorText}
                onChange={(event) => { this.setState({ mobile: event.target.value }) }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                color="secondary"
                name="email"
                autoComplete="email"
                label="E-Mail"
                value={this.state.email}
                error={this.state.isEmailError}
                fullWidth
                helperText={this.state.emailErrorText}
                onChange={(event) => { this.setState({ email: event.target.value }) }}
              />
            </Grid>
          </Grid>
          <br />
          <FormControl error={this.state.isShippingError}>
            <br />
            <br />
            <FormLabel component="legend">
              <Typography variant="h5" color="primary" style={{ marginLeft: '0.5em' }}>
                Välj fraktsätt
                </Typography>
            </FormLabel>

            <RadioGroup
              value={this.state.shippingId}
              onChange={this.handleShipmentInput}
              style={flex}>
              {this.state.shippingOptions.length > 0 ? this.state.shippingOptions.map((shippingOption: any) => {
                return (
                  <div style={deliverensBox} key={shippingOption._id}>
                    <h3>{shippingOption.companyName}</h3>
                    <p>Leverans: {shippingOption.deliveryTime} arbetsdag. Pris: {shippingOption.price}:- </p>
                    <FormControlLabel
                      value={shippingOption._id}
                      control={<Radio />}
                      label={shippingOption.companyName}
                    />
                  </div>
                )
              })
                : <h3>Loading Shipping options</h3>}

            </RadioGroup>
            <FormHelperText>{this.state.shippingErrorText}</FormHelperText>
          </FormControl>
        </form>
        <Button
          type='submit'
          onClick={() => this.onSubmit()}
          variant="contained"
          color="primary"
          style={{ margin: '2em 0 1em 2em' }}
        >
          Fortsätt
          </Button>
      </div>
    )
  }
}

const deliverensBox: CSSProperties = {
  background: "#0001",

  margin: '1rem 0.5em',
  padding: '1rem',
  width: '100%'
}
const flex: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
}