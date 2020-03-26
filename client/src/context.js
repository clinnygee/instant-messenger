import React, {createContext} from 'react';

export const UserContext = createContext({
    username: '',
    authenticated: false,
    authenticating: false,
    jwt: null,
    setJwt: () => {},
    changeAuthenticated: () => {},
    changeAuthenticating: () => {},
    handleAuthentication: () => {},
});

export class UserProvider extends React.Component {


    handleAuthentication = (res) => {
        let re = /login/;

        console.log(res.url)

        if(re.test(res.url)){
            console.log('match')
            this.setJwt(res.json());
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

    state = {
        username: '',
        authenticated: false,
        authenticating: false,
        jwt: null,
        setJwt: this.setJwt,
        changeAuthenticated: this.changeAuthenticated,
        changeAuthenticating: this.changeAuthenticating,
        handleAuthentication: this.handleAuthentication,
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