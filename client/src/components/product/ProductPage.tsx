import React, { CSSProperties } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { RouteMatch } from '../../typings'
import { Product } from '../items/itemListCore'
import { items } from '../../ItemList'
import ViewProduct from './ViewProduct'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

interface Props extends RouteComponentProps {
    match: RouteMatch
}
interface State {
    selectedItem: Product | undefined
}

class ProductPage extends React.Component<Props, State>  {
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedItem: undefined
        }
    }

    findProduct(inUrlId: string) {
        for (let item of items) {
            if (item.id === parseInt(inUrlId)) {
                this.setState({ selectedItem: item })
            }
        }
    }
    componentDidMount() {
        this.findProduct(this.props.match.params.id)
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <>
                <Link to="/" style={backButtonLink}>
                    <IconButton color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                {this.state.selectedItem ?
                    <ViewProduct itemData={this.state.selectedItem} />
                    :
                    <h3>Product not found.</h3>
                }
            </>
        )
    }

}

export default withRouter(ProductPage)

const backButtonLink: CSSProperties = {
    border: 'solid 0.15em #558b2f',
    position: 'absolute',
    left: '1em',
    borderRadius: '3em',
    textDecoration: 'none',
}
const page: CSSProperties = {
    height: "auto"
}