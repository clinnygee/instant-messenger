import React, {createContext} from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import openSocket from 'socket.io-client';
import {fetchConversationData, makeFriendRequest} from './API'

export const UserContext = createContext({
    username: '',
    authenticated: false,
    authenticating: false,
    jwt: null,
    client: null,
    conversationData: [],
    getConversationData: () => {},
    setJwt: () => {},
    changeAuthenticated: () => {},
    changeAuthenticating: () => {},
    handleAuthentication: () => {},
    initializeWsClient: () => {},
    sendWsMessage: () => {},
    sendWsReaction: () => {},
    sendFriendRequest: () => {},
});

export class UserProvider extends React.Component {


    handleAuthentication = async (res, username) => {
        let re = /login/;

        console.log(res.url)

        if(re.test(res.url) && res.status === 200){
            console.log('match');
            this.setState({username: username});
            this.setJwt(await res.json());
            this.initializeWsClient();
            // this.getConversationData();
        }else {
            console.log('url isnt /login')
        }
    };

    getConversationData = () => {
        fetchConversationData( this.state.jwt)
        .then(res => res.json())
        .then(parsedJSON => this.setState({conversationData: parsedJSON}));
    };

    setJwt = (jwt) => {
        console.log(jwt);
        sessionStorage.setItem('instant-messenger-jwt', jwt.token);
        console.log(jwt)
        this.setState({jwt: jwt.token}, () => {
            this.getConversationData();
        });
        this.changeAuthenticated();
    };

    changeAuthenticated = () => {
        this.setState({authenticated: !this.state.authenticated});
    };

    changeAuthenticating = () => {
        this.setState({authenticating: !this.state.authenticating})
    };

    initializeWsClient = () => {
        console.log('in initalizeWsClient')
        console.log(window.location.host);

        const socket = openSocket(window.location.host + '/connection');

        console.log(socket);

        socket.on('a message', (msg) => {
            console.log(msg);
        });
        // before this is called, we need username in state.
        
        socket.emit('user-details', `${this.state.username}`);

        socket.on('message', msg => {
            console.log(msg);
            const newMessage = JSON.parse(msg);
            console.log(this.conversationData)
            const conversationToUpdate = this.state.conversationData.find((conversation) => {
                return conversation._id === newMessage.conversationId;
            });
            if(conversationToUpdate){
                conversationToUpdate.messages.unshift(newMessage);
                this.setState({conversationData: this.state.conversationData})
            }

            console.log(conversationToUpdate)
            console.log(this.state.conversationData);
        });

        socket.on('reaction', reaction => {
            let reactionObject = JSON.parse(reaction);
            console.log(reactionObject);
        })
        

        this.setState({client: socket});
        
    };

    sendWsMessage = (receiver, message) => {

        console.log('attempting to send to: ' + receiver + 'this message: ' + message)
        const msg = {
            receiver: receiver,
            text: message,
        }
        console.log(this.state.client)
        this.state.client.emit('message', JSON.stringify(msg));
    };

    sendWsReaction = (messageId, reaction) => {
        const Reaction = {
            messageId: messageId,
            reaction: reaction,
            user: this.state.username,
        };

        this.state.client.emit('reaction', JSON.stringify(Reaction));
    };

    sendFriendRequest = (user) => {
        makeFriendRequest(user, this.state.jwt).then(res => {
            console.log(res);
        })
    };

    componentDidMount = () => {
        // let onLoadJwt = sessionStorage.getItem('instant-messenger-jwt');

        // if(onLoadJwt){
        //     console.log(onLoadJwt);
        //     this.setJwt(onLoadJwt);
        // }
    }

    state = {
        username: '',
        authenticated: false,
        authenticating: false,
        jwt: null,
        client: null,
        conversationData: [],
        getConversationData: this.getConversationData,
        setJwt: this.setJwt,
        changeAuthenticated: this.changeAuthenticated,
        changeAuthenticating: this.changeAuthenticating,
        handleAuthentication: this.handleAuthentication,
        initializeWsClient: this.initializeWsClient,
        sendWsMessage: this.sendWsMessage,
        sendWsReaction: this.sendWsReaction,
        sendFriendRequest: this.sendFriendRequest,
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