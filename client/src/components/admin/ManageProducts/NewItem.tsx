import React, { CSSProperties } from 'react'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Typography, TextField, Button, FormControl, Grid, InputLabel } from '@material-ui/core'

interface Props {
    handleNew: any
    productContext: any
}

interface State {
    addedMessage: boolean,
    userMassage: string,
    id: number,
    name: string,
    price: number,
    imgURL: string,
    description: string,
    nrInStock: number,
    category: string[]
}

export default class NewItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            addedMessage: false,
            userMassage: "",
            id: 0,
            name: "",
            price: 0,
            imgURL: "",
            description: "",
            nrInStock: 0,
            category: []
        }
    }

    //Updates states so it matches the textboxes content
    handleNameInput = (event: { target: { value: any } }) => this.setState({ name: event.target.value })
    handlePriceInput = (event: { target: { value: any } }) => this.setState({ price: event.target.value })
    //handleimgURLChange = (event: { target: { value: any } }) => this.setState({imgURL:event.target.value})
    handleDescriptionInput = (event: { target: { value: any } }) => this.setState({ description: event.target.value })
    handleNumberInStockInput = (event: { target: { value: any } }) => this.setState({ nrInStock: event.target.value })

    handleCategoryInput = (event: { target: { value: any } }) => {

        const updatedCategories: any[] = []

        const categories = event.target.value.split(", ")

        categories.forEach((x: string) => {
            const y = x.toLowerCase().trim()
            if (y != "") updatedCategories.push(y)
        })

        this.setState({ category: updatedCategories }, () => console.log(this.state.category))
    }




    handleUploadFile = (event: any) => {
        const input: any = document.querySelector('.imageUploader')
        if (input) {
            // this.setState({:event.target.input
            // this.props.productContext.uploadFile(input.files[0])
        }
    }
    //Let the user know if they added a item correctly or not
    checkInput() {
        let userMassage
        if (
            this.state.name === " " ||
            isNaN(this.state.price) ||
            this.state.imgURL === " " ||
            this.state.description === " " ||
            isNaN(this.state.nrInStock) ||
            this.state.category
        ) {
            userMassage = "Något blev fel"
        } else {
            userMassage = ""
        }
        return userMassage
    }

    //Let the admin know if admin have added it 😁
    added() {
        this.setState({ addedMessage: true })
    }


    disableButton = () => {
        if (
            this.state.name.length > 5 &&
            this.state.price > 0 &&
            this.state.description.length > 5 &&
            this.state.nrInStock > 0 &&
            this.state.category.length > 0
        ) {

            return false
        }


        return true
    }

    render() {
        const newItem = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            imgURL: this.state.imgURL,
            description: this.state.description,
            nrInStock: this.state.nrInStock,
            category: this.state.category
        }

        return (

            <div>
                <div style={divSpace} />
                <FormControl fullWidth>
                    <form autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Namn"
                                    variant="outlined"
                                    value={this.state.name}
                                    onChange={this.handleNameInput}
                                    error={this.state.name === " "}
                                    helperText={this.state.name === " " ? 'Tomt fält' : ' '}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth

                                    name="price"
                                    label="Pris"
                                    type="number"

                                    inputProps={{ min: "0", step: "1" }}

                                    variant="outlined"
                                    value={this.state.price}
                                    onChange={this.handlePriceInput}
                                    error={isNaN(this.state.price)}
                                    helperText={isNaN(this.state.price) ? 'Inte en siffra' : ' '}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <span>
                                    <CloudUploadIcon />
                                        Välj bild
                                    <input
                                        // style={inputForUpload}
                                        className={'imageUploader'}
                                        name="imgURL"
                                        type="file"
                                        onChange={this.handleUploadFile}
                                    />
                                </span>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Beskrivning"
                                    variant="outlined"
                                    value={this.state.description}
                                    onChange={this.handleDescriptionInput}
                                    multiline rowsMax="4"
                                    error={this.state.description === " "}
                                    helperText={this.state.description === " " ? 'Tomt fält' : ' '}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel>
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    name="nrInStock"
                                    type="number"

                                    inputProps={{ min: "0", step: "1" }}

                                    label="Produkter i lager"
                                    variant="outlined"
                                    value={this.state.nrInStock}
                                    onChange={this.handleNumberInStockInput}
                                    error={isNaN(this.state.nrInStock)}
                                    helperText={isNaN(this.state.nrInStock) ? 'Hur många finns i lager?' : ' '}
                                />
                            </Grid>

                            <Grid item xs={12}>

                                <InputLabel htmlFor="categories"></InputLabel>
                                <TextField
                                    fullWidth
                                    id="categories"
                                    name="category"
                                    label="Kategorier"
                                    variant="outlined"
                                    onChange={this.handleCategoryInput}

                                    helperText={this.state.category.length >= 1 ? "Tillagda kategorier: " + this.state.category.map(x => ` -${x} `) : "Skriv in en  Ka👏te👏go👏ri👏 och separera dem med ','"}
                                // helperText={
                                //     this.state.category === '' ? (
                                //         'Skriv in en  Ka👏te👏go👏ri👏') : (' ')
                                //     }
                                />

                            </Grid>
                        </Grid>
                    </form>
                </FormControl>


                <Typography color="primary">
                    {this.state.userMassage}
                </Typography>
                {this.state.addedMessage ? <Typography color="primary" >Tillagd</Typography> : null}
                <Button
                    variant='contained'
                    color="primary"
                    fullWidth


                    disabled={this.disableButton()}

                    onClick={(e: any) => {
                        console.log(newItem)
                        const input: any = document.querySelector('.imageUploader')

                        const newProduct = {
                            file: "",
                            title: newItem.name,
                            description: newItem.description,
                            price: newItem.price ? newItem.price : 10,
                            category: newItem.category,
                            nrInStock: newItem.nrInStock ? newItem.nrInStock : 10
                        }

                        this.props.productContext.postProduct(newProduct, input.files[0]);
                        //this.props.handleNew(newItem);
                        this.added()
                    }}>
                    <AddCircleOutlineOutlinedIcon /> Lägg till
                    </Button>
            </div>
        )
    }
}

const divSpace: CSSProperties = {
    margin: "0 0 1em 0"
}

