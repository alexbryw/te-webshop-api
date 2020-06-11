import React, { CSSProperties } from "react";

// INTERFACES
import { Product } from "../../../interfaces/interfaces";

// MATERIAL
import {
  TextField,
  Typography,
  FormControl,
  Container,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/";

// ICONS
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// CONTEXT
import { ProductContext } from "../../../contexts/ProductContext";

interface Props {
  productContext: any;
  itemData: any;
  arrayIndex: number;
  delete: any;
  handleSubmit: any;
  isDeleted: any;
  deleted: boolean;
}

interface State {
  isSentMessage: string;
  id: number;
  name: string;
  price: number;
  imgURL: string;
  description: string;
  nrInStock: number;
  category: string[];
  prevCategory: string[];
  prevNrInStock: number;
}

export default class EditItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSentMessage: "",
      id: props.itemData._id,
      name: props.itemData.title,
      price: props.itemData.price,
      imgURL: props.itemData.file,
      description: props.itemData.description,
      nrInStock: props.itemData.nrInStock,
      category: props.itemData.category,
      prevCategory: [...props.itemData.category],
      prevNrInStock: props.itemData.nrInStock,
    };
  }

  //Updates states so it matches the textboxes content
  handleIdInput = (event: { target: { value: any } }) =>
    this.setState({ id: event.target.value });
  handleNameInput = (event: { target: { value: any } }) =>
    this.setState({ name: event.target.value });
  handlePriceInput = (event: { target: { value: any } }) =>
    this.setState({ price: event.target.value });
  handleimgURLChange = (event: { target: { value: any } }) =>
    this.setState({ imgURL: event.target.value });

  // // TODO om sidan ska kunna redigera produkter
  // handleimgURLChange = (event: any ) => {
  //     const input: any = document.querySelector('.imageUploader')
  //     if(input) {
  //         this.uploadFile(input.files[0])
  //     }
  // }
  // // TODO

  handleDescriptionInput = (event: { target: { value: any } }) =>
    this.setState({ description: event.target.value });
  handleNumberInStockInput = (event: { target: { value: any } }) => {
      this.setState({ nrInStock: event.target.value });
      if (event.target.value === "") {
          this.setState({ nrInStock: this.state.prevNrInStock }, () =>
            console.log(this.state.nrInStock)
          );
        }
  }
  // handleCategoryInput = (event: { target: { value: any } }) => this.setState({ category: event.target.value })

  handleCategoryInput = (event: { target: { value: any } }) => {
    const updatedCategories: any[] = [];

    const categories = event.target.value.split(", ");

    categories.forEach((x: string) => {
      const y = x.toLowerCase().trim();
      if (y != "") updatedCategories.push(y);
    });

    this.setState({ category: updatedCategories }, () =>
      console.log(this.state.category)
    );

    if (event.target.value === "") {
      this.setState({ category: this.state.prevCategory }, () =>
        console.log(this.state.category)
      );
    }
  };

  //Disables the button if there is no content or the number value is NaN
  checkInput() {
    let userMassage;
    if (
      this.state.name === "" ||
      isNaN(this.state.price) ||
      this.state.imgURL === "" ||
      this.state.description === "" ||
      // isNaN( this.state.nrInStock ) ||
      this.state.category
    ) {
      userMassage = "Kan inte skicka";
    } else {
      userMassage = "";
    }
    return userMassage;
  }

  //Let the user know if they updated correctly or not
  isSent() {
    let userMassage;
    if (
      this.state.name === "" ||
      isNaN(this.state.price) ||
      this.state.imgURL === "" ||
      this.state.description === "" ||
      // isNaN(this.state.nrInStock) ||
      this.state.category
    ) {
      this.setState({ isSentMessage: "Uppdaterade inte" });
    } else {
      this.setState({ isSentMessage: "Uppdaterad" });
    }
    return userMassage;
  }

  disableButton = () => {
    if (this.state.nrInStock >= 0 && this.state.category.length > 0) {
      return false;
    }

    return true;
  };

  render() {
    let itemData = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      imgURL: this.state.imgURL,
      description: this.state.description,
      nrInStock: this.state.nrInStock,
      category: this.state.category,
    };
    let userMassage = this.checkInput();
    return (
      <ProductContext.Consumer>
        {(productContext) => (
          <Container>
            {this.props.deleted ? null : (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => {
                  this.props.delete(this.props.arrayIndex);
                  this.props.isDeleted();
                }}
              >
                <RemoveCircleOutlineIcon />
                Ta bort #{this.props.itemData.id}
              </Button>
            )}
            {this.props.deleted ? null : (
              // <div className={classes.divSpace}/>
              <div style={divSpace} />
            )}
            {this.props.deleted ? null : (
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
                    helperText={this.state.name === "" ? "Tomt fält" : " "}
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
                    helperText={
                      isNaN(this.state.price) ? "Inte en siffra" : " "
                    }
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
                    helperText={this.state.imgURL === "" ? "Tomt fält" : " "}
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
                    helperText={
                      this.state.description === "" ? "Tomt fält" : " "
                    }
                  />
                  <Typography variant="overline">
                    Nuvarande antal produkter i lager:{" "}
                    {this.state.prevNrInStock}
                  </Typography>
                  <TextField
                    // required
                    fullWidth
                    name="nrInStock"
                    type="number"
                    label="Uppdatera antal produkter i lager"
                    placeholder="Ett nummer från 0 och uppåt"
                    variant="outlined"
                    inputProps={{ min: "0", step: "1" }}
                    // value={this.state.nrInStock}
                    onChange={this.handleNumberInStockInput}
                    //onChange={(e) => this.handleNewItemInputs(e, 'nrInStock')}
                    // error={this.state.nrInStock ? true : false}
                    helperText={
                      this.state.nrInStock ? "Hur många finns i lager?" : " "
                    }
                  />
                  <Typography variant="overline">
                    Nuvarande kategorier:{" "}
                    {this.state.prevCategory.map((x) => x + " ")}
                  </Typography>
                  <TextField
                    // required
                    fullWidth
                    name="category"
                    label="Uppdatera kategorier"
                    variant="outlined"
                    placeholder="Ex: Svart    Alt: Svart, Koffeinfritt"
                    // value={this.state.category}
                    onChange={this.handleCategoryInput}
                    // error={this.state.category === ' '}
                    // helperText={this.state.category === ' ' ? ('Skriv in en  Ka👏te👏go👏ri👏') : (' ')}
                  />
                </form>
              </FormControl>
            )}
            {this.props.deleted ? null : (
              <Typography color="primary">
                {userMassage + this.state.isSentMessage}
              </Typography>
            )}
            {this.props.deleted ? null : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={this.disableButton()}
                onClick={() => {
                  let updatedProduct = {
                    title: this.state.name,
                    description: this.state.description,
                    price: this.state.price,
                    category: this.state.category,
                    nrInStock: this.state.nrInStock,
                  };
                  // let updatedProduct = [...this.props.itemData]
                  // updatedProduct.nrInStock = this.state.nrInStock
                  this.props.productContext.updateProduct(
                    updatedProduct,
                    this.props.itemData._id
                  );
                  console.log(this.props.itemData);
                  console.log("from click update product");
                  console.log(this.state.nrInStock);
                  console.log(this.state.category);
                  console.log(updatedProduct, "uppdaterade produkten");
                  // this.props.handleSubmit(this.props.arrayIndex, itemData);
                  this.isSent();
                }}
              >
                <EditIcon /> Ändra
              </Button>
            )}
          </Container>
        )}
      </ProductContext.Consumer>
    );
  }
}

const divSpace: CSSProperties = {
  margin: "0 0 1em 0",
};

const inputForUpload: CSSProperties = {
  zIndex: 1,
  cursor: "pointer",
  opacity: 0.7,
  position: "relative",
  padding: "2rem",
  marginRight: "5rem",
  marginBottom: "1.5rem",
};

const buttonForUpload: CSSProperties = {
  marginTop: "2rem",
  margin: "0 0 0em 0",
  top: "50%",
  left: " 50%",
};
