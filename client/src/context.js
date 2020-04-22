import React, {createContext} from 'react';

import openSocket from 'socket.io-client';
import {fetchConversationData, makeFriendRequest, fetchUserData} from './API'

export const UserContext = createContext({
    userData: [],
    username: '',
    authenticated: false,
    authenticating: true,
    jwt: null,
    client: null,
    conversationData: [],
    initializeUserData: () => {},
    getConversationData: () => {},
    setJwt: () => {},
    changeAuthenticated: () => {},
    changeAuthenticating: () => {},
    handleAuthentication: () => {},
    initializeWsClient: () => {},
    sendWsMessage: () => {},
    sendWsReaction: () => {},
    sendFriendRequest: () => {},
    logOut: () => {},
});

export class UserProvider extends React.Component {

    // constructor(){
    //     super();
    //     let onLoadJwt = sessionStorage.getItem('instant-messenger-jwt');
    //     console.log('constructor');
    //     if(onLoadJwt){
    //         console.log('jwt');
    //         this.setState({authenticating: true});
    //         this.checkJwtToken(onLoadJwt);
    //         // this.setJwt(onLoadJwt);
    //     } else {
    //         console.log('no jwt');
    //         let authenticating = false;
    //         // this.setState({authenticating: authenticating});
    //         this.changeAuthenticating();
    //     }
    // }

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

    getConversationData =  () => {
        console.log(this.state.jwt)
        return fetchConversationData( this.state.jwt)
        .then(res => res.json())
        .then(parsedJSON => this.setState({conversationData: parsedJSON}));
    };

    setJwt = async (jwt) => {
        if(jwt.token){
            jwt = jwt.token;
        }
        console.log(jwt);
        sessionStorage.setItem('instant-messenger-jwt', jwt);
        console.log(jwt)
        this.setState({jwt: jwt}, async () => {
            console.log('calling initializeUserData');
            await this.initializeUserData();
            await this.getConversationData();
            await this.initializeWsClient();
            this.changeAuthenticated();
            this.changeAuthenticating();
        });
        
    };

    changeAuthenticated = () => {
        this.setState({authenticated: !this.state.authenticated});
    };

    changeAuthenticating = () => {
        this.setState({authenticating: !this.state.authenticating})
    };

    initializeUserData = () => {
        console.log(this.state.jwt);
        return fetchUserData(this.state.jwt).then(res => {
             res.json().then(parsedJson => {
                 this.setState({userData: parsedJson})
            })
        });
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
        
        socket.emit('user-details', `${this.state.userData.username}`);

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
            user: this.state.userData.username,
        };

        this.state.client.emit('reaction', JSON.stringify(Reaction));
    };

    logOut = () => {
        sessionStorage.removeItem('instant-messenger-jwt');
        this.setState({authenticated: false, authenticating: false, jwt: null});
    }

    sendFriendRequest = (user) => {
        makeFriendRequest(user, this.state.jwt).then(res => {
            console.log(res);
        })
    };

    checkJwtToken = jwt => {
        console.log(jwt);
        fetch('/user/checkToken', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }).then(authenticated => {
            if(authenticated.status === 200){
                this.setJwt(jwt);
            } else {
                sessionStorage.removeItem('instant-messenger-jwt');
            }
        })
    }

    componentDidMount = () => {
        let onLoadJwt = sessionStorage.getItem('instant-messenger-jwt');
            console.log('constructor');
            if(onLoadJwt){
                console.log('jwt');
                this.setState({authenticating: true});
                this.checkJwtToken(onLoadJwt);
                // this.setJwt(onLoadJwt);
            } else {
                console.log('no jwt');
                let authenticating = false;
                // this.setState({authenticating: authenticating});
                this.changeAuthenticating();
            }
    }

    state = {
        userData: [],
        username: '',
        authenticated: false,
        authenticating: true,
        jwt: null,
        client: null,
        conversationData: [],
        getConversationData: this.getConversationData,
        initializeUserData: this.initializeUserData,
        setJwt: this.setJwt,
        changeAuthenticated: this.changeAuthenticated,
        changeAuthenticating: this.changeAuthenticating,
        handleAuthentication: this.handleAuthentication,
        initializeWsClient: this.initializeWsClient,
        sendWsMessage: this.sendWsMessage,
        sendWsReaction: this.sendWsReaction,
        sendFriendRequest: this.sendFriendRequest,
        logOut: this.logOut,
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