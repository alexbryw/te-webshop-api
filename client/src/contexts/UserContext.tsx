import React, { createContext, Component } from "react";


const apiURL = "http://localhost:9000/api/";
const sessionURL = "http://localhost:9000/session";

interface Props { }
interface State {
    loggedIn: Boolean,
    admin: Boolean,

    name: String,

    textLogger: (text: String) => void
    loginUser: (text: String, closeModal: () => void, errCb: (error: boolean, anchor: string) => void) => void
}

export const UserContext = createContext<State>({
    loggedIn: false,
    admin: false,

    name: "",

    textLogger: () => { },
    loginUser: () => { },

});

export class UserContextProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        // not true state, this i template
        this.state = {
            loggedIn: false,
            admin: false,
            name: "Halvdan",

            textLogger: this.textLogger,
            loginUser: this.loginUser
        }
    }

    textLogger = (text: String): void => {
        console.log(text);
    }


    // getUser

    loginUser = async (user: any, closeModal: () => void, errCb: (error: boolean, anchor: string) => void) => {
        console.log("logging in");

        // Create a session
        await fetch(sessionURL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: user.name,
                password: user.password
            }),
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data.err) closeModal()
            else {
                errCb(true, "login")
            }
            console.log(data);
        })
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
