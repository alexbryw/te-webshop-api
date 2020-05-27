import React, { createContext, Component } from "react";


const apiURL = "http://localhost:3000/api/";
const sessionURL = "http://localhost:3000/session/";

interface Props { }
interface State {
    loggedIn: Boolean,
    admin: Boolean,

    name: String,

    textLogger: (text: String) => void
}

export const UserContext = createContext<State>({
    loggedIn: false,
    admin: false,

    name: "",

    textLogger: () => { }
});

export class UserContextProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        // not true state, this i template
        this.state = {
            loggedIn: false,
            admin: false,
            name: "Halvdan",

            textLogger: this.textLogger
        }
    }

    textLogger = (text: String): void => {
        console.log(text);
    }


    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContextProvider;
