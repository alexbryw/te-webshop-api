import React,{ CSSProperties } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import NewItem from "./NewItem"

interface Props{
    handleNew:any
}

interface State {
    toggleItem: boolean
}

export default class NewItemToggle extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            toggleItem: false
        }   
    }
    //toggles the NewItem view
    toggle = () => { this.setState({toggleItem: !this.state.toggleItem})}

    render(){
        return(
            <Container>
                <div style={space}/>
                <Typography onClick={this.toggle} style={toggleEditPage}>
                    <IconButton>
                        <AddCircleOutlineOutlinedIcon/>
                    </IconButton>
                    Ny produkt
                </Typography>  
                {this.state.toggleItem? <NewItem handleNew={this.props.handleNew}/> : null}
                <div style={space}/>
            </Container>
        )
    }
}


const space:CSSProperties = {
    margin:"0 0 1em 0"
}

const toggleEditPage:CSSProperties = {
    cursor: 'pointer',
}