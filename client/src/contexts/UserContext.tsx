
import React, { createContext, Component } from "react";
import { AdminView } from "../types/types"


const apiURL = "http://localhost:9000/api/";
const sessionURL = "http://localhost:9000/session/";


interface Props { }
interface State {
    loggedIn: Boolean,
    admin: Boolean,
    name: String,
    _id: string

    adminView: AdminView,
    changeAdminView: (view: AdminView) => void,

    updateUserStatus: (user: {
        _id: string,
        name: string,
        password: string,
        requestsAdmin: boolean,
        admin: boolean
    }) => void,

    getUsers: () => {},

    registerUser: (
        newUser: { name: string, password: string, requestsAdmin: boolean },
        closeModal: () => void,
        errCb: (error: boolean, anchor: string) => void) => void

    loginUser: (
        user: { name: string, password: string },
        closeModal: () => void,
        errCb: (error: boolean, anchor: string) => void) => void
    logOut: () => void
}

export const UserContext = createContext<State>({
    loggedIn: false,
    admin: false,
    name: "",
    _id: "",

    adminView: "products",
    changeAdminView: () => { },

    getUsers: () => { return {} },
    updateUserStatus: () => { },

    registerUser: () => { },
    loginUser: () => { },
    logOut: () => { },

});

export class UserContextProvider extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            loggedIn: false,
            admin: false,
            name: "",
            _id: "",

            adminView: "products",
            changeAdminView: this.changeAdminView,

            getUsers: this.getUsers,

            updateUserStatus: this.updateUserStatus,

            registerUser: this.registerUser,
            loginUser: this.loginUser,
            logOut: this.logOut
        }
    }

    updateUserStatus = async (user: {
        _id: string,
        name: string,
        password: string,
        requestsAdmin: boolean,
        admin: boolean
    }) => {
        const users = await fetch("http://localhost:9000/api/users/" + user._id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user._id,
                name: user.name,
                password: user.password,
                requestsAdmin: true,
                admin: true,
            })
        })
            .then((response) => response.json())
            .then((data) => {
                const users = this.getUsers()
                return users
            })

        return users

    }

    getUsers = async () => {
        const users = await fetch("http://localhost:9000/api/users/", {
            method: "GET",
            credentials: 'include',
        }).then((response) => response.json()).then((data) => {
            console.log(data)
            return data
        })
        // console.log("from get users")
        // console.log(users)
        return users
    }

    changeAdminView = (view: AdminView) => {
        this.setState({
            adminView: view
        })
    }

    registerUser = async (
        newUser: { name: string, password: string, requestsAdmin: boolean },
        closeModal: () => void,
        errCb: (error: boolean, anchor: string) => void) => {
        console.log("register new user");

        await fetch("http://localhost:9000/api/users/", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newUser.name,
                password: newUser.password,
                requestsAdmin: newUser.requestsAdmin,
                admin: false,
            }),
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if (!data.err) {
                console.log(data)
                this.loginUser(data, closeModal, errCb)
            }
            else {
                errCb(true, "register")
            }
        })

    }


    // getUser

    loginUser = async (user: any, closeModal: () => void, errCb: (error: boolean, anchor: string) => void) => {
        console.log("logging in");

        // Create a session
        await fetch(sessionURL + "/login", {
            method: "POST",
            credentials: 'include',
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
            this.setUserInState(data)
        })
    }

    logOut = async () => {
        await fetch(sessionURL + "/logout", {
            method: "DELETE",
            credentials: 'include'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            this.setUserInState({
                err: {
                    msg: ""
                }
            })
        })
    }


    async componentDidMount() {

        let user = await fetch(sessionURL, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((data) => {
                console.log(data);
                return data
            })
        this.setUserInState(user)
    }

    async setUserInState(user: any) {
        if (user.err) console.log(user.err);

        if (user && !user.err) {
            this.setState({
                loggedIn: true,
                admin: user.admin,
                name: user.name,
                _id: user._id
            }, () => console.log("logged in", this.state)
            )
        } else {
            this.setState({
                loggedIn: false,
                admin: false,
                name: "",
                _id: ""
            }, () => console.log("not logged in", this.state)
            )
        }
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
