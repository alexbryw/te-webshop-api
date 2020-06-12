import React from "react";

// MATERIAL UI
import {
  TextField,
  Typography,
  FormControl,
  Button,
  Grid
} from "@material-ui/core/";

// ICONS
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Edit";


interface Props {
  productContext: any;
  itemData: any;
  arrayIndex: number;
  delete: any;
  handleSubmit: any;
  isDeleted: any;
  deleted: boolean;

  refreshProducts: () => void
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


  handleDescriptionInput = (event: { target: { value: any } }) =>
    this.setState({ description: event.target.value });
  handleNumberInStockInput = (event: { target: { value: any } }) => {
    this.setState({ nrInStock: event.target.value });
    if (event.target.value === "") {
      this.setState({ nrInStock: this.state.prevNrInStock }
      );
    }
  }

  handleCategoryInput = (event: { target: { value: any } }) => {
    const updatedCategories: any[] = [];

    const categories = event.target.value.split(", ");

    categories.forEach((x: string) => {
      const y = x.toLowerCase().trim();
      if (y != "") updatedCategories.push(y);
    });

    this.setState({ category: updatedCategories }
    );

    if (event.target.value === "") {
      this.setState({ category: this.state.prevCategory }
      );
    }
  };


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

    return (
      <FormControl fullWidth>
        <form autoComplete="off">

          <Grid container spacing={2} justify="center">

            <Grid item xs={6} md={4}>
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
            </Grid>

            <Grid item xs={6} md={4}>

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
            </Grid>

            <Grid item xs={12} md={7}>
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
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">
                Nuvarande antal produkter i lager:{" "}
                {this.state.prevNrInStock}
              </Typography>
              <TextField
                required
                fullWidth
                name="nrInStock"
                type="number"
                label="Uppdatera antal produkter i lager"
                placeholder="Ett nummer från 0 och uppåt"
                variant="outlined"
                inputProps={{ min: "0", step: "1" }}
                onChange={this.handleNumberInStockInput}
                helperText={
                  this.state.nrInStock ? "Hur många finns i lager?" : " "
                }
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">
                Nuvarande kategorier:{" "}
                {this.state.prevCategory.map((x) => x + " ")}
              </Typography>
              <TextField
                required
                fullWidth
                name="category"
                label="Uppdatera kategorier"
                variant="outlined"
                placeholder="Ex: Svart, Koffeinfritt"
                onChange={this.handleCategoryInput}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  this.props.productContext.deleteProduct(
                    this.props.itemData._id,
                    this.props.refreshProducts
                  );

                }}
              >
                <RemoveCircleOutlineIcon />
                    Ta&nbsp;bort
                  </Button>
            </Grid>

            <Grid item xs={6} md={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={this.disableButton()}
                onClick={() => {
                  this.props.productContext.updateProduct(
                    {
                      title: this.state.name,
                      description: this.state.description,
                      price: this.state.price,
                      category: this.state.category,
                      nrInStock: this.state.nrInStock,
                    },
                    this.props.itemData._id,
                    this.props.refreshProducts
                  );
                }}
              >
                <EditIcon /> Ändra
          </Button>
            </Grid>
          </Grid>



        </form>
      </FormControl>
    );
  }
}

