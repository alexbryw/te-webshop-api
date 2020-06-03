import React, { CSSProperties } from 'react'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'



interface Props{
    handleNew: any
}

interface State{
    addedMessage: boolean,
    userMassage: string,
    id: number,
    name: string, 
    price: number,
    imgURL: string,
    description: string
}

export default class NewItem extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            addedMessage: false,
            userMassage: "",
            id: 0 ,
            name: "Namn" , 
            price: 0 ,
            imgURL: "imgURL" ,
            description: "Beskrivning"
        }   
    }

    //Updates states so it matches the textboxes content
    handleNameInput = (event: { target: { value: any } }) => this.setState({name:event.target.value})
    handlePriceInput = (event: { target: { value: any } }) => this.setState({price:event.target.value})
    handleimgURLChange = (event: { target: { value: any } }) => this.setState({imgURL:event.target.value})
    handleDescriptionInput = (event: { target: { value: any } }) => this.setState({description:event.target.value})
    
    //Let the user know if they added a item correctly or not
    checkInput(){
        let userMassage
        if(
            this.state.name === "" ||
            isNaN(this.state.price) ||
            this.state.imgURL === "" ||
            this.state.description === ""
        ){
            userMassage = "Något blev fel"
        } else {
            userMassage = ""
        }
        return userMassage
    }

    //Let the user know if the have added it
    added(){
        this.setState({addedMessage: true})
    }

    render(){
        const newItem = {
            id: this.state.id,
            name: this.state.name , 
            price: this.state.price ,
            imgURL: this.state.imgURL ,
            description: this.state.description
        }
        let userMassage = this.checkInput()


        return(
            <div>
                <div style={divSpace}/>
                <FormControl fullWidth>
                    <form autoComplete="off">
                    <TextField 
                        fullWidth 
                        name="name"
                        label="Namn" 
                        variant="outlined" 
                        value={this.state.name} 
                        onChange={this.handleNameInput}
                        error={this.state.name === ""}
                        helperText={this.state.name === "" ? 'Tomt fält' : ' '}
                    />
                    <TextField 
                        fullWidth 
                        name="price"
                        label="Pris" 
                        variant="outlined" 
                        value={this.state.price} 
                        onChange={this.handlePriceInput}
                        error={isNaN(this.state.price)}
                        helperText={isNaN(this.state.price)? 'Inte en siffra' : ' '}
                    />
                    <TextField 
                        fullWidth 
                        name="imgURL"
                        label="ImgURL" 
                        variant="outlined" 
                        value={this.state.imgURL} 
                        onChange={this.handleimgURLChange}
                        error={this.state.imgURL === ""}
                        helperText={this.state.imgURL === "" ? 'Tomt fält' : ' '}
                    />
                    <TextField 
                        fullWidth 
                        name="description"
                        label="Beskrivning" 
                        variant="outlined" 
                        value={this.state.description} 
                        onChange={this.handleDescriptionInput} 
                        multiline rowsMax="4"
                        error={this.state.description === ""}
                        helperText={this.state.description === "" ? 'Tomt fält' : ' '}
                    />                        
                        <div style={divSpace}/>
                    </form>
                </FormControl>
                <Typography color="primary">
                    {userMassage}
                </Typography>
                {this.state.addedMessage?<Typography color="primary" >Tillagd</Typography>:null}
                <Button 
                    variant="outlined"
                    color="primary" 
                    fullWidth 
                    onClick={() => {
                        this.props.handleNew(newItem);
                        this.added()
                        }}>
                    <AddCircleOutlineOutlinedIcon/> Lägg till
                </Button>
            </div>
        )
    }
}

const divSpace:CSSProperties = {
    margin:"0 0 1em 0"
}
