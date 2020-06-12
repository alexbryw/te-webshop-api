import React, { CSSProperties } from "react";

// MATERIAL UI
import {
  Card,
  Typography,
  IconButton
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

// COMPONENTS
import EditItem from "./EditItem";


interface Props {
  productContext: any;
  itemData: any;
  arrayIndex: number;
  handleSubmit: any;
  delete: any;

  refreshProducts: () => void
}

interface State {
  toggleItem: boolean;
  deleted: boolean;
}

export default class ProductAdminList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      toggleItem: false,
      deleted: false,
    };
  }
  // Sends a state that disables the EditItem view
  isDeleted = () => {
    this.setState({ deleted: true });
  };

  //toggles the EditItem view
  toggle = () => {
    this.setState({ toggleItem: !this.state.toggleItem });
  };

  render() {
    return (
      <Card style={adminListStyle} variant="outlined">
        <Typography
          onClick={this.toggle}
          color={this.state.deleted ? "error" : "inherit"}
        >
          <IconButton>
            {this.state.toggleItem ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          {
            "Produkt - " +
            this.props.itemData._id +
            " - " +
            this.props.itemData.title}
          {this.state.deleted ? " - [Raderad]" : ""}
        </Typography>

        {this.state.toggleItem ? (
          <EditItem
            refreshProducts={this.props.refreshProducts}

            productContext={this.props.productContext}
            itemData={this.props.itemData}
            arrayIndex={this.props.arrayIndex}
            delete={this.props.delete}
            handleSubmit={this.props.handleSubmit}
            isDeleted={this.isDeleted}
            deleted={this.state.deleted}
          />
        ) : null}
      </Card>
    );
  }
}

const adminListStyle: CSSProperties = {
  cursor: "pointer",
  padding: "1em",
};
