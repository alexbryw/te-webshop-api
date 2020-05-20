import React, {CSSProperties} from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { CustomerPaymentInfo } from './../../typings'
import FormHelperText from '@material-ui/core/FormHelperText'

interface Props{
  onSubmit: (customerPaymentInfo: CustomerPaymentInfo) => void
    customerInfo: any
    isDisabled: boolean
}

export default class Payment extends React.Component<Props, CustomerPaymentInfo>{
    constructor(props:Props){
        super(props)
        this.state = {
          paymentMethod:'',
          isPaymentError: false,
          paymentErrorText:'',

          cardOwner: this.props.customerInfo.firstName + ' ' + this.props.customerInfo.lastName,
          isCardOwnerError: false,
          cardOwnerErrorText: '',
          
          cardNr: '',
          isCardNrError: false,
          cardNrErrorText: '',

          cardExp: '',
          isCardExpError: false,
          cardExpErrorText: '',

          cardCVC: '',
          isCardCVCError: false,
          cardCVCErrorText: '',

          swishNr: this.props.customerInfo.mobile,
          isSwishNrError: false,
          swishErrorText: '',

          emailFaktura: this.props.customerInfo.email,
          isEmailFakturaError: false,
          emailErrorText: ''
        }
    }

    componentDidMount() {
      window.scrollTo(0, 0)
    }

    private onSubmit = () => {
      const err = this.validateInput()
      if(!err){
        this.props.onSubmit(this.state)
      }
    }

    private handleRadioChange = (event: { target: { value: any } }) => { 
        this.setState({paymentMethod: event.target.value})
    } 

    private validateInput = () =>{
    
      let isError = false
      const errors = {
        paymentErrorText:'', isPaymentError: false, 
        cardOwnerErrorText:'', isCardOwnerError:false, 
        isCardNrError:false, cardNrErrorText:'', 
        isCardExpError:false, cardExpErrorText: '', 
        isCardCVCError: false, cardCVCErrorText: '', 
        isSwishNrError: false, swishErrorText: '', 
        isEmailFakturaError: false, emailErrorText: ''
      }

      if(this.state.paymentMethod === ''){
        isError = true
        errors.paymentErrorText =  'Du måste välja ett betalsätt'
        errors.isPaymentError = true
      }

      if(this.state.paymentMethod  === 'Bankkort'){  
       
        if(this.state.cardOwner.length < 4){
          isError = true
          errors.cardOwnerErrorText = 'Ogiltigt namn'
          errors.isCardOwnerError = true   
        }

        const cardnoVisa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
        const cardnoMC = /^(?:5[1-5][0-9]{14})$/

        if((this.state.cardNr.match(cardnoMC))||(this.state.cardNr.match(cardnoVisa))){
          errors.isCardNrError = false
        }
        else{
          isError = true
          errors.cardNrErrorText =  'ogiltigt kort-nummer'
          errors.isCardNrError = true
        }

        const cardExpVal = /^(0?[1-9]|1[012])[/-](?:202[0-5])/
  
        if(this.state.cardExp.match(cardExpVal)){
          errors.isCardExpError = false
        }
        else{
          isError = true
          errors.cardExpErrorText =  'ogiltigt, MM/YYYY'
          errors.isCardExpError = true
        } 

        const cardCVCVal = /^\d{3}$/

        if( this.state.cardCVC.match(cardCVCVal)){
          errors.isCardCVCError= false
        }
          else{
            isError = true
            errors.cardCVCErrorText =  'tre siffror'
            errors.isCardCVCError = true
        }
      }
 
      if(this.state.paymentMethod  === 'Swish'){
        const phoneVal = /^[+]?[(]?[0-9]{3}[)]?[-/s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

        if( this.state.swishNr.match(phoneVal)){
            errors.isSwishNrError = false
        }
        else{
          isError = true
          errors.swishErrorText =  'ogiltigt mobilnummer-format'
          errors.isSwishNrError = true
        }
      } 

      if(this.state.paymentMethod  === 'Faktura'){  
        const mailVal = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

        if( this.state.emailFaktura.match(mailVal)){
            errors.isEmailFakturaError = false
        }
        else{
          isError = true
          errors.emailErrorText =  'ogiltig e-mail'
          errors.isEmailFakturaError = true
        }
      }

      if(isError){
        this.setState({
          ...this.state,
          ...errors,
        })
      }
      return isError
    }

    private handleMoreInformationBank() {
      if(this.state.paymentMethod === 'Bankkort'){
      return(
        <form autoComplete="on" >
          <TextField id="outlined-basic" 
            label="kortägare" 
            variant="outlined"
            style = {margins}
            name="ccname"
            autoComplete="cc-name"
            value={this.state.cardOwner}
            error = {this.state.isCardOwnerError}
            helperText = {this.state.cardOwnerErrorText}
            //onChange = {this.handleChange('kortNr')}
            />
            <br/>
          <TextField id="outlined-basic" 
            label="kortnummer" 
            variant="outlined"
            style = {margins}
            name="cardnumber"       
            autoComplete="cc-number"
            value= {this.state.cardNr} 
            error = {this.state.isCardNrError} 
            helperText= {this.state.cardNrErrorText}
            onChange={(event) => { this.setState({ cardNr: event.target.value }) }}
            //onChange = {this.handleChange('kortNr')}
            />
            <br/>
          <TextField id="outlined-basic" 
            label="Giltighetstid" 
            variant="outlined"
            name="cc-exp"
            autoComplete="cc-exp"
            placeholder="MM/YYYY"
            value= {this.state.cardExp} 
            error = {this.state.isCardExpError} 
            helperText= {this.state.cardExpErrorText}
            inputProps={{ maxLength: 7}}
            style = {{...{width:'15ch'},...margins}}
            onChange={(event) => { this.setState({ cardExp: event.target.value }) }}
            //onChange = {this.handleChange('kortNr')}
            />
          <TextField id="outlined-basic" 
            label="CVC" 
            variant="outlined"
            name="cvc"
            autoComplete="cc-csc"
            placeholder="nnn"
            value= {this.state.cardCVC} 
            error = {this.state.isCardCVCError} 
            helperText= {this.state.cardCVCErrorText}
            inputProps={{ maxLength: 3}}
            style = {{...{width:'10ch'}, ...margins}}
            onChange={(event) => { this.setState({ cardCVC: event.target.value }) }}
            //onChange = {this.handleChange('kortNr')}
            />
          <br/>  
        </form>
      )}
    }
  private handleMoreInformationSwish() {
    if(this.state.paymentMethod  === 'Swish'){
      return(
        <TextField id="outlined-basic" 
          label="Mobil-nummer"
          variant="outlined"
          style = {margins}
          value={this.state.swishNr}
          error = {this.state.isSwishNrError} 
          helperText = {this.state.swishErrorText}
          onChange={(event) => { this.setState({ swishNr: event.target.value }) }}    
        />
      )}
  }
  private handleMoreInformationFaktura() {
    if(this.state.paymentMethod  === 'Faktura'){
      return(
        <TextField 
          label= "E-mail"
          variant="outlined"
          style = {{...margins, ...{width:'16rem'}}}
          color="secondary"
          name="email"
          autoComplete="email"
          value={this.state.emailFaktura}
          onChange={(event) => { this.setState({ emailFaktura: event.target.value }) }}
        />
      )
    }    
  }
  render(){
    const mc = require("./../../assets/images/mastercard.png")
    const visa = require("./../../assets/images/visa.png")
    const swish = require("./../../assets/images/swish.png")
    const klarna = require("./../../assets/images/klarna.png")
    let waitingForPaymentText
    if (this.props.isDisabled){
      waitingForPaymentText = <p style = {{...{color: 'rgba(0, 0, 0, 0.38)'}, ...{marginLeft: '1rem'}}}>Kontrollerar betalning</p> 
    }

    return (
      <>
        <FormControl component="fieldset" error = {this.state.isPaymentError} style = {spaceing}>
          <FormLabel component="legend" style = {{marginLeft: '0.5rem'}}>Betalsätt</FormLabel>
          <FormHelperText>{this.state.paymentErrorText}</FormHelperText>
          <RadioGroup aria-label="gender" name="gender1" onChange={this.handleRadioChange}>
          <div style = {radiobuttonContainer}>
              <FormControlLabel value="Bankkort" control={<Radio />} label="Bankkort" />
              <img src={mc} alt="" style={imgSize}/>
              <img src={visa} alt="" style={imgSize}/>
            </div>
            {this.handleMoreInformationBank()}
            <div style = {radiobuttonContainer}>
              <FormControlLabel value="Swish" control={<Radio />} label="Swish" />
              <img src={swish} alt="" style={imgSize}/>
            </div>
            {this.handleMoreInformationSwish()}
            <div style = {radiobuttonContainer}>
              <FormControlLabel value="Faktura" control={<Radio />} label="Klarna Faktura" />
              <img src={klarna} alt="" style={imgSize}/>
              </div>
            {this.handleMoreInformationFaktura()}
          </RadioGroup>
        </FormControl>
        <br/>
          <Button
              type = 'submit'
              onClick={() => this.onSubmit()}
              variant="contained" 
              color="primary"
              disabled = {this.props.isDisabled}
              style={{margin:'0 0 1em 1em'}}>
                Slutför ditt köp
            </Button>
            {waitingForPaymentText} 
      </>
    )
  } 
}

const spaceing:CSSProperties = {
    margin: '2rem 0'
}

const margins:CSSProperties = {
  margin: '0.3rem'
}

const imgSize:CSSProperties = {
  height: '1.5rem',
  marginRight: '0.5rem'
}

const radiobuttonContainer:CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}