import React, {createContext} from 'react';

export const UserContext = createContext({
    username: '',
    authenticated: false,
    authenticating: false,
});

export class UserProvider extends React.Component {


    state = {
        username: '',
        authenticated: false,
        authenticating: false,
    }

    changeAuthenticated = () => {
        this.setState({authenticated: !this.state.authenticated});
    };

    changeAuthenticating = () => {
        this.setState({authenticating: !this.state.authenticating})
    };

    render(){
        return(
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
};

export const UserConsumer = UserContext.Consumer;