import React, { CSSProperties } from 'react'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Typography, TextField, Button, FormControl, Grid, InputLabel } from '@material-ui/core'

interface Props {
    refreshProducts: () => void
    handleNew: any
    productContext: any
}

interface State {
    userMassage: string,
    id: number,
    name: string,
    price: number,
    imgURL: string,
    description: string,
    nrInStock: number,
    category: string[],

    file: any
}

export default class NewItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            userMassage: "",
            id: 0,
            name: "",
            price: 0,
            imgURL: "",
            description: "",
            nrInStock: 0,
            category: [],

            file: null
        }
    }

    clearState = () => {
        this.setState({

            userMassage: "",
            id: 0,
            name: "",
            price: 0,
            imgURL: "",
            description: "",
            nrInStock: 0,
            category: [],

            file: null
        }, () => {
            let x: any = document.querySelector("#categories")
            x.value = ""
        })
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

    handleFileInput = () => {
        const input: any = document.querySelector('#imageUploader')

        this.setState({ file: input.files[0] })
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


    disableButton = () => {
        if (
            this.state.name.length > 5 &&
            this.state.price > 0 &&
            this.state.description.length > 5 &&
            this.state.nrInStock > 0 &&
            this.state.category.length > 0 &&
            this.state.file != null
        ) {
            return false
        }


        return true
    }

    render() {
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
                                        required
                                        id='imageUploader'
                                        name="imgURL"
                                        type="file"
                                        onChange={this.handleFileInput}
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
                                <TextField
                                    fullWidth
                                    id="categories"
                                    name="category"
                                    label="Kategorier"
                                    variant="outlined"
                                    onChange={this.handleCategoryInput}

                                    helperText={this.state.category.length >= 1 ? "Tillagda kategorier: " + this.state.category.map(x => ` -${x} `) : "Skriv in en  Ka👏te👏go👏ri👏 och separera dem med ','"}
                                />

                            </Grid>
                        </Grid>
                    </form>
                </FormControl>

                <Button
                    variant='contained'
                    color="primary"
                    fullWidth


                    disabled={this.disableButton()}

                    onClick={(e: any) => {

                        this.props.productContext.postProduct(
                            {
                                title: this.state.name,
                                description: this.state.description,
                                price: this.state.price,
                                category: this.state.category,
                                nrInStock: this.state.nrInStock,
                                file: this.state.file,
                            },
                            () => {
                                this.props.refreshProducts();
                                this.clearState()
                            }
                        );
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

