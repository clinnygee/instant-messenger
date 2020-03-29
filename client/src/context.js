import React, {createContext} from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'

export const UserContext = createContext({
    username: '',
    authenticated: false,
    authenticating: false,
    jwt: null,
    client: null,
    setJwt: () => {},
    changeAuthenticated: () => {},
    changeAuthenticating: () => {},
    handleAuthentication: () => {},
    initializeWsClient: () => {},
    sendWsMessage: () => {},
});

export class UserProvider extends React.Component {


    handleAuthentication = (res) => {
        let re = /login/;

        console.log(res.url)

        if(re.test(res.url)){
            console.log('match')
            this.setJwt(res.json());
            this.initializeWsClient();
        }else {
            console.log('url isnt /login')
        }
    }

    setJwt = (jwt) => {
        sessionStorage.setItem('instant-messenger-jwt', jwt);
        this.setState({jwt: jwt});
        this.changeAuthenticated();
    }

    changeAuthenticated = () => {
        this.setState({authenticated: !this.state.authenticated});
    };

    changeAuthenticating = () => {
        this.setState({authenticating: !this.state.authenticating})
    };

    initializeWsClient = () => {
        console.log('in initalizeWsClient')
        console.log(window.location.host)
        const client = new W3CWebSocket(`ws://${window.location.host}`+ '/connection');

        client.onopen = () => {
            console.log('Websocket client connected');
        };

        client.onmessage = (message) => {
            console.log(message)
        }

        this.setState({client: client});

        console.log(client)
    };

    sendWsMessage = (receiver, message) => {

        const msg = {
            receiver: receiver,
            text: message,
        }
        this.state.client.send(JSON.stringify(msg));
    };

    state = {
        username: '',
        authenticated: false,
        authenticating: false,
        jwt: null,
        client: null,
        setJwt: this.setJwt,
        changeAuthenticated: this.changeAuthenticated,
        changeAuthenticating: this.changeAuthenticating,
        handleAuthentication: this.handleAuthentication,
        initializeWsClient: this.initializeWsClient,
        sendWsMessage: this.sendWsMessage,
    }

    render(){
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
};

export const UserConsumer = UserContext.Consumer;