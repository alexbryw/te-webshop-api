import React, { CSSProperties } from 'react'

// INTERFACES
import { Product } from '../../../interfaces/interfaces'

// MATERIAL
import { TextField, Typography, FormControl, Container, Button, makeStyles, Theme, createStyles } from '@material-ui/core/'

// ICONS
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// CONTEXT
import { ProductContext } from '../../../contexts/ProductContext';

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
    id: number
    name: string
    price: number
    imgURL: string
    description: string
    nrInStock?: number
    category?: string
}

export default class EditItem extends React.Component<Props, State> {
   

    constructor(props: Props) {
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
    handleIdInput = (event: { target: { value: any } }) => this.setState({ id: event.target.value })
    handleNameInput = (event: { target: { value: any } }) => this.setState({ name: event.target.value })
    handlePriceInput = (event: { target: { value: any } }) => this.setState({ price: event.target.value })
    handleimgURLChange = (event: { target: { value: any } }) => this.setState({ imgURL: event.target.value })
    



    // // TODO om sidan ska kunna redigera produkter
    // handleimgURLChange = (event: any ) => {
    //     const input: any = document.querySelector('.imageUploader')
    //     if(input) {
    //         this.uploadFile(input.files[0])
    //     }
    // }
    // // TODO 



    handleDescriptionInput = (event: { target: { value: any } }) => this.setState({ description: event.target.value })
    handleNumberInStockInput = (event: { target: { value: any } }) => this.setState({ nrInStock: event.target.value })
    handleCategoryInput = (event: { target: { value: any } }) => this.setState({ category: event.target.value })

    //Disables the button if there is no content or the number value is NaN
    checkInput() {
        let userMassage
        if (
            this.state.name === "" ||
            isNaN(this.state.price) ||
            this.state.imgURL === "" ||
            this.state.description === "" ||
            // isNaN( this.state.nrInStock ) ||
            this.state.category
        ) {
            userMassage = "Kan inte skicka"
        } else {
            userMassage = ""
        }
        return userMassage
    }

    //Let the user know if they updated correctly or not
    isSent() {
        let userMassage
        if (
            this.state.name === "" ||
            isNaN(this.state.price) ||
            this.state.imgURL === "" ||
            this.state.description === "" ||
            // isNaN(this.state.nrInStock) ||
            this.state.category
        ) {
            this.setState({ isSentMessage: "Uppdaterade inte" })
        } else {
            this.setState({ isSentMessage: "Uppdaterad" })
        }
        return userMassage
    }
   
    render() {
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
        return (
            <ProductContext.Consumer>
                {
                    (productContext) => (
                        <Container>
                {this.props.deleted ? null :
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            this.props.delete(this.props.arrayIndex)
                            this.props.isDeleted()
                        }}>
                        <RemoveCircleOutlineIcon />Ta bort #{this.props.itemData.id}
                    </Button>
                }
                {this.props.deleted ? null :
                // <div className={classes.divSpace}/>
                    <div style={divSpace} />}
                {this.props.deleted ? null :
                    <FormControl fullWidth>
                        <form autoComplete="off">
                            <TextField
                                disabled
                                fullWidth
                                name="name"
                                label="Namn"
                                variant="outlined"
                                value={this.state.name}
                                onChange={this.handleNameInput}
                                error={this.state.name === ""}
                                helperText={this.state.name === "" ? 'Tomt fält' : ' '}
                                id="filled-disabled"
                            />
                            <TextField
                                disabled
                                fullWidth
                                name="price"
                                label="Pris"
                                variant="outlined"
                                value={this.state.price}
                                onChange={this.handlePriceInput}
                                error={isNaN(this.state.price)}
                                helperText={isNaN(this.state.price) ? 'Inte en siffra' : ' '}
                            />
                            <TextField
                                disabled
                                fullWidth
                                name="imgURL"
                                label="ImgURL"
                                variant="outlined"
                                value={this.state.imgURL}
                                onChange={this.handleimgURLChange}
                                error={this.state.imgURL === ""}
                                helperText={this.state.imgURL === "" ? 'Tomt fält' : ' '}
                            />
                          
                            
                            {/* <span style={buttonForUpload}>
                                <CloudUploadIcon />
                                    Välj bild
                                <input 
                                    style={inputForUpload}
                                    className={'imageUploader'}
                                    name="imgURL"
                                    type="file"
                                    //onChange={this.handleimgURLChange}
                                />       
                            </span> */}
                           
                            <TextField
                                disabled
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
                                type="number"
                                label="Produkter i lager"
                                variant="outlined"
                                value={this.state.nrInStock}
                                onChange={this.handleNumberInStockInput}
                                //onChange={(e) => this.handleNewItemInputs(e, 'nrInStock')}
                                error={this.state.nrInStock ? true : false}
                                helperText={this.state.nrInStock ? 'Hur många finns i lager?' : ' '}
                            />
                            <TextField
                                fullWidth
                                name="category"
                                label="Kategorier"
                                variant="outlined"
                                value={this.state.category}
                                onChange={this.handleCategoryInput}
                                error={this.state.category === ' '}
                                helperText={this.state.category === ' ' ? ('Skriv in en  Ka👏te👏go👏ri👏') : (' ')}
                            />
                        </form>
                    </FormControl>
                }
                {this.props.deleted ? null :
                    <Typography color="primary">
                        {userMassage + this.state.isSentMessage}
                    </Typography>
                }
                {this.props.deleted ? null :
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            this.props.handleSubmit(this.props.arrayIndex, itemData);
                            this.isSent()
                        }}
                    >
                        <EditIcon /> Ändra #{this.props.itemData.id}
                    </Button>
                }
            </Container>
                    )
                }
            </ProductContext.Consumer>
            
        )
    }
}

const divSpace: CSSProperties = {
    margin: "0 0 1em 0"
}

const inputForUpload: CSSProperties = {
    zIndex: 1,
    cursor: "pointer",
    opacity: 0.7,
    position: "relative",
    padding: "2rem",
    marginRight: "5rem",
    marginBottom: "1.5rem"
}

const buttonForUpload: CSSProperties = {
    marginTop: "2rem",
    margin: "0 0 0em 0",
    top: "50%",
    left:" 50%",
}
