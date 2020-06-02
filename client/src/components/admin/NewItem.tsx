import React, { CSSProperties } from 'react'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core';



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
    description: string,
    nrInStock: number
    category: string
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
            description: "Beskrivning",
            nrInStock: 0,
            category: ''
        }   
    }

    //Updates states so it matches the textboxes content
    handleNameInput = (event: { target: { value: any } }) => this.setState({name:event.target.value})
    handlePriceInput = (event: { target: { value: any } }) => this.setState({price:event.target.value})
    handleimgURLChange = (event: { target: { value: any } }) => this.setState({imgURL:event.target.value})
    handleDescriptionInput = (event: { target: { value: any } }) => this.setState({description:event.target.value})
    handleNumberInStockInput =(event: { target: { value: any} }) => this.setState({nrInStock:event.target.value})
    handleCategoryInput =(event: { target: { value: any} }) => this.setState({category:event.target.value})
    //Let the user know if they added a item correctly or not
    checkInput(){
        let userMassage
        if(
            this.state.name === "" ||
            isNaN(this.state.price) ||
            this.state.imgURL === "" ||
            this.state.description === "" ||
            isNaN(this.state.nrInStock) ||
            this.state.category
        ){
            userMassage = "Något blev fel"
        } else {
            userMassage = ""
        }
        return userMassage
    }

    //Let the admin know if admin have added it 😁
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
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
                            </Grid>

                            <Grid item xs={12} sm={6}>
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
                            </Grid>

                            <Grid item xs={12} sm={6}>
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
                                    error={this.state.description === ""}
                                    helperText={this.state.description === "" ? 'Tomt fält' : ' '}
                                />    
                            </Grid>

                            <Grid item xs={12}>    
                                <TextField
                                    fullWidth
                                    name="nrInStock"
                                    type="number"
                                    label="Produkter i lager"
                                    variant="outlined"
                                    value={this.state.nrInStock}
                                    onChange={this.handleNumberInStockInput}
                                    //onChange={(e) => this.handleNewItemInputs(e, 'nrInStock')}
                                    error={this.state.nrInStock === 0}
                                    helperText={this.state.nrInStock === 0 ? 'Hur många finns i lager?' : ' '}
                                />
                            </Grid>   

                            <Grid item xs={12}>
                            {/* <div>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Ny kategori✏️</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails> */}
                                    <TextField
                                        fullWidth
                                        name="category"
                                        label="Kategorier"
                                        variant="outlined"
                                        //value={this.state.categories} 
                                        onChange={this.handleCategoryInput}
                                        error={this.state.category === ''}
                                        
                                        helperText={
                                            this.state.category === '' ? (
                                                'Skriv in en  Ka👏te👏go👏ri👏'
                                            ) : (
                                                ' '
                                            ) 
                                        }
                                        />
                                            {/*<Button
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                                //onClick={() => this.setState({categories: [...this.state.categories, this.state]})}
                                                // onClick={() => {
                                                //     this.props.handleNew(newItem);
                                                //     this.added()}}
                                            >
                                                <AddCircleOutlineOutlinedIcon /> Ny Katergori
                                            </Button>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </div>*/}
                            </Grid>
                        </Grid>
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

