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


    handleAuthentication = async (res, username) => {
        

       

        if( res.status === 200){
            console.log('match');
            this.setState({username: username});
            
            
            await this.initializeUserData();
            await this.getConversationData();
            this.initializeWsClient();
            this.changeAuthenticated();
            
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

    changeAuthenticated = () => {
        this.setState({authenticated: !this.state.authenticated});
    };

    changeAuthenticating = () => {
        this.setState({authenticating: !this.state.authenticating})
    };

    initializeUserData = () => {
        console.log(this.state.jwt);
        return fetchUserData(this.state.jwt).then(res => {
            console.log(res.cookie);
             res.json().then(parsedJson => {
                 this.setState({userData: parsedJson})
            })
        });
    };

    initializeWsClient = () => {
        console.log('in initalizeWsClient')
        console.log(window.location)

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
            console.log(this.state.conversationData);
            const conversationToUpdate = this.state.conversationData.find((conversation) => {
                return conversation._id === newMessage.conversationId;
            });
            if(conversationToUpdate){
                conversationToUpdate.messages.unshift(newMessage);
                this.setState({conversationData: this.state.conversationData})
            } else {
                
                console.log('We need to call the server and find the conversation, then we will add it to the list.');
                fetch(`/api/conversations/${newMessage.conversationId}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.jwt}`
                    }
                }).then(res => res.json().then(conversation => {
                    console.log(conversation);
                    let newConversationData = [...this.state.conversationData];
                    newConversationData.push(conversation);
                    this.setState({conversationData: newConversationData});
                    // window.location.reload();
                }))
            }

            // console.log(conversationToUpdate)
            // console.log(this.state.conversationData);
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
        // sessionStorage.removeItem('instant-messenger-jwt');
        this.setState({authenticated: false, authenticating: false, jwt: null, client: null});
        fetch('/api/auth/logout', {
            method: 'post'
        });
    }

    sendFriendRequest = (user) => {
        makeFriendRequest(user, this.state.jwt).then(res => {
            console.log(res);
        })
    };

    checkCookieJwt = async () => {

        fetch('/api/auth/checkToken', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(async authenticated => {
            console.log(authenticated)
            if(authenticated.status === 200){  
                console.log('check cookie jwt is legit')              
                await this.initializeUserData();
                await this.getConversationData();
                await this.initializeWsClient();
                this.changeAuthenticated();
                this.changeAuthenticating();
            } else {
                console.log('incorrect jwt.')
                this.setState({authenticating: false});
                sessionStorage.removeItem('instant-messenger-jwt');
            }
        })
    }

    componentDidMount = () => {

        this.setState({authenticating: true});
        this.checkCookieJwt();
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