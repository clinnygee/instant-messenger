import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import Feed from '../Routes/Feed'

import People from '../People';
import Profile from '../Routes/Profile';
import ConversationDisplay from '../Conversation';
import {AppWrapper} from '../Styled/styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComments, faUserFriends, faAddressCard, faHome} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context';





const Container = (props) => {
    const [mobileView, setMobileView] = useState(true);
    const [screenWidth, setScreenWidth] = useState(true);
    const context = useContext(UserContext);
    const [fetching, setFetching] = useState(true);

    

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

        context.initializeUserData().then(success => {
            
            setFetching(false);
        })

        return() => {
            window.removeEventListener('resize', checkMobile)

        }
    }, []);

    console.log(context.userData);

    return (
        <AppWrapper>
            <Router>
                {/* conditional here while we fetch user data */}
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
    // const context = useContext(UserContext);
    // const context = useContext(UserContext); 

    

    // useEffect(() => {
    //     return () => {
    //         console.log('Container is unmounting')
            
    //     }
    // })

   
    return (
        
        <MobileWrapper>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/posts' />
                </Route>
                <Route path='/posts'>
                    <Feed />
                </Route>
                <Route path='/conversations'>
                    <ConversationDisplay />
                </Route>
                <Route path='/friends'>
                    <People mobile={true}/>
                </Route>
                <Route path='/profile'>
                    <Profile />
                </Route>
                <Route path='/*'>
                    <div>This page does not exist!</div>
                </Route>
            </Switch>
            <Nav />
        </MobileWrapper>
            
        
    )
};

const NavWrapper = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
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
    color: rgb(220,222,225);
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '25px'};
    
    
`

const Nav = props => {
    const context = useContext(UserContext);

    return(
        <NavWrapper>
            <NavLink to='/posts'
                activeStyle={{
                    color: 'black'
                }}
            >
                <NavItem >
                    <FontAwesomeIcon icon={faHome} />
                </NavItem>
            </NavLink>
            <NavLink to='/conversations'
                activeStyle={{
                    color: 'black'
                }}
            >
                <NavItem onClick={props.toggleDisplay} screenWidth={props.screenWidth}>
                    <FontAwesomeIcon icon={faComments} />
                </NavItem>
            </NavLink>
            
            <NavLink to='/friends'
                activeStyle={{
                    color: 'black'
                }}
            >
                <NavItem active={!props.conversationsDisplay} onClick={props.toggleDisplay}>
                    <FontAwesomeIcon icon={faUserFriends} />
                </NavItem>
            </NavLink>
            <NavLink to={`/profile/${context.userData.username}`}
                activeStyle={{
                    color: 'black'
                }}
            >
                <NavItem>
                    <FontAwesomeIcon icon={faAddressCard} />
                </NavItem>
            </NavLink>
            
        </NavWrapper>
    )
}


export default Container;