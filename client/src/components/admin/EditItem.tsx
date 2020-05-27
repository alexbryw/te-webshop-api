import React, { CSSProperties } from 'react'
import { Product } from '../items/itemListCore'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
    itemData: Product
    arrayIndex: number
    delete: any
    handleSubmit: any
    isDeleted: any
    deleted: boolean
}

interface State {
    isSentMessage: string,
    id: number,
    name: string, 
    price: number,
    imgURL: string,
    description: string,
    nrInStock: number,
    category: string
    
}

export default class EditItem extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            isSentMessage: "",
            id: props.itemData.id,
            name: props.itemData.name, 
            price: props.itemData.price,
            imgURL: props.itemData.imgURL,
            description: props.itemData.description,
            nrInStock: props.itemData.nrInStock,
            category: props.itemData.category
        }   
    }

    //Updates states so it matches the textboxes content
    handleIdInput = (event: { target: { value: any } }) => this.setState({id:event.target.value})
    handleNameInput = (event: { target: { value: any } }) => this.setState({name:event.target.value})
    handlePriceInput = (event: { target: { value: any } }) => this.setState({price:event.target.value})
    handleimgURLChange = (event: { target: { value: any } }) => this.setState({imgURL:event.target.value})
    handleDescriptionInput = (event: { target: { value: any } }) => this.setState({description:event.target.value})
    handleNrInStockInput = (event: { target: { value: any } }) => this.setState({nrInStock:event.target.value})
    handleCategoryInput = (event: { target: { value: any } }) => this.setState({category:event.target.value})
    
    //Disables the button if there is no content or the number value is NaN
    checkInput(){
        let userMassage
        if(
            this.state.name === "" ||
            isNaN(this.state.price) ||
            this.state.imgURL === "" ||
            this.state.description === "" ||
            isNaN(this.state.nrInStock) ||
            this.state.category === ""
        ){
            userMassage = "Kan inte skicka"
        } else {
            userMassage = ""
        }
        return userMassage
    }

    //Let the user know if they updated correctly or not
    isSent(){
        let userMassage
        if(
            this.state.name === "" ||
            isNaN(this.state.price) ||
            this.state.imgURL === "" ||
            this.state.description === "" ||
            isNaN(this.state.nrInStock) ||
            this.state.category === ""
        ){
            this.setState({isSentMessage:"Uppdaterade inte"})
        } else {
            this.setState({isSentMessage:"Uppdaterad ✅"})
        }
        return userMassage
    }
    
    render(){
        let itemData = {
            id: this.state.id,
            name: this.state.name, 
            price: this.state.price,
            imgURL: this.state.imgURL,
            description: this.state.description,
            nrInStock: this.state.nrInStock,
            category: this.state.category
        }
        let userMassage = this.checkInput()
        return(
            <Container>
                {this.props.deleted?null:
                <Button 
                    variant="contained"
                    color="primary" 
                    fullWidth 
                    onClick={() => {this.props.delete(this.props.arrayIndex)
                                    this.props.isDeleted()
                    }}>
                    <RemoveCircleOutlineIcon/>Ta bort #{this.props.itemData.id}
                </Button>
                }
                {this.props.deleted?null:
                <div style={divSpace}/>}
                {this.props.deleted?null:
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
                                error = {isNaN(this.state.price)}
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
                                multiline 
                                rowsMax="4"
                                error={this.state.description === ""}
                                helperText={this.state.description === "" ? 'Tomt fält' : ' '}
                            />
                            <TextField
                                fullWidth 
                                name="nrInStock" 
                                label="Produkter i lager" 
                                variant="outlined" 
                                value={this.state.nrInStock} 
                                onChange={this.handleNrInStockInput}
                                error = {isNaN(this.state.nrInStock)}
                                helperText={isNaN(this.state.nrInStock)? 'Hur många finns det i lager? ******' : ' '}
                            />
                            <TextField
                                fullWidth
                                name="category" 
                                label="Kategori" 
                                variant="outlined" 
                                value={this.state.category} 
                                onChange={this.handleCategoryInput}
                                multiline 
                                rowsMax="4"
                                error={this.state.category === ""}
                                helperText={this.state.category === "" ? 'Välj en kategori *****' : ' '}
                            />
                            
                        </form>
                    </FormControl>
                }
                {this.props.deleted?null:
                    <Typography color="primary">
                        {userMassage + this.state.isSentMessage}
                    </Typography>
                }
                {this.props.deleted?null:
                <Button 
                    variant="outlined"
                    color="primary" 
                    fullWidth
                    onClick={() => {this.props.handleSubmit(this.props.arrayIndex, itemData);
                                    this.isSent()
                            }}
                    >
                    <EditIcon/> Ändra #{this.props.itemData.id}
                </Button>
                }
            </Container>
        )
    }
}

const divSpace:CSSProperties = {
    margin:"0 0 1em 0"
}