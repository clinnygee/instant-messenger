import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import Conversations from '../Conversations';
import People from '../People';
import Profile from '../Routes/Profile';
import ConversationDisplay from '../Conversation';
import {AppWrapper} from '../Styled/styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComments, faUserFriends, faAddressCard} from '@fortawesome/free-solid-svg-icons';



const Container = (props) => {
    const [mobileView, setMobileView] = useState(true);
    const [screenWidth, setScreenWidth] = useState(true);

    

    const checkMobile = () => {
        const width = (window.innerWidth > 0 ) ? window.innerWidth : window.screen.width;
        let mobile = false;

        width <= 1600 ? mobile = true : mobile = false;

        setScreenWidth(width);

        

        setMobileView(mobile);
    };

    useEffect(() => {
        
        checkMobile();

        window.addEventListener('resize', checkMobile);

        return() => {
            window.removeEventListener('resize', checkMobile)

        }
    }, []);

    

    return (
        <AppWrapper>
            <Router>
                <View screenWidth={screenWidth}/> 
            </Router>            
        </AppWrapper>           
        
    )
};

const MobileWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`

const View = (props) => {
    const [conversationsDisplay, setConversationsDisplay] = useState(true);
    const [messageDisplay, setMessageDisplay] = useState(false);
    const [receiver, setReceiver] = useState(null);

    const toggleDisplay = () => {
        setMessageDisplay(false);
        setConversationsDisplay(!conversationsDisplay);
    };

    const displayMessage = () => {
        setMessageDisplay(true);
    };

    const selectMessageReceiver = (username) => {
        setReceiver(username);
        setMessageDisplay(true);
    }

    

    useEffect(() => {
        return () => {
            console.log('Container is unmounting')
            
        }
    })

   
    return (
        
        <MobileWrapper>
            <Switch>
                <Route path='/conversations'>
                    <ConversationDisplay />
                </Route>
                <Route path='/friends'>
                    <People mobile={true}/>
                </Route>
                <Route path='/profile'>
                    <Profile />
                </Route>
            </Switch>
            <Nav />
        </MobileWrapper>
            
        
    )
};

const NavWrapper = styled.div`
    width: 100%;
    height: 15%;
    box-shadow: 0px -1px 3px 0px rgba(117,116,117,0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background: #fff;
    padding: 16px 16px 16px 16px;
`

const NavItem = styled.div`
    height: 100%;
    width: 10%;
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '50px'};
    color: ${({active}) => active ? 'black' : 'rgb(220,222,225)'}
`

const Nav = props => {

    return(
        <NavWrapper>
            <Link to='/conversations'>
                <NavItem active={props.conversationsDisplay} onClick={props.toggleDisplay} screenWidth={props.screenWidth}>
                    <FontAwesomeIcon icon={faComments} />
                </NavItem>
            </Link>
            
            <Link to='friends'>
                <NavItem active={!props.conversationsDisplay} onClick={props.toggleDisplay}>
                    <FontAwesomeIcon icon={faUserFriends} />
                </NavItem>
            </Link>
            <Link to='profile'>
                <NavItem>
                    <FontAwesomeIcon icon={faAddressCard} />
                </NavItem>
            </Link>
            
        </NavWrapper>
    )
}

const DesktopView = (props) => {

    return (
        <React.Fragment>
            <Conversations />
            <People />
            
        </React.Fragment>
    )
}

export default Container;