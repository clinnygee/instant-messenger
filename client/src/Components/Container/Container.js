import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect, useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Authentication from '../Authentication';
import Feed from '../Routes/Feed'

import People from '../Routes/People';
import Profile from '../Routes/Profile';
import ConversationContainer from '../Routes/Conversations';
import Search from '../Routes/Search';
import {AppWrapper} from '../Styled/styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComments, faUserFriends, faAddressCard, faHome, faExclamationCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../context';
import {LoadingSymbol} from '../Reusable';





const Container = (props) => {
    const [mobileView, setMobileView] = useState(true);
    const [screenWidth, setScreenWidth] = useState(true);
    const context = useContext(UserContext);
    const [fetching, setFetching] = useState(true);
    const history=useHistory();
    // console.log(history);

    // console.log(context);

    

    const checkMobile = () => {
        const width = (window.innerWidth > 0 ) ? window.innerWidth : window.screen.width;
        let mobile = false;

        width <= 1600 ? mobile = true : mobile = false;

        setScreenWidth(width);
        console.log(screenWidth)
        

        setMobileView(mobile);
    };

    useEffect(() => {
        
        checkMobile();

        window.addEventListener('resize', checkMobile);

        

        console.log('Calling Container Use Effect')

        return() => {
            window.removeEventListener('resize', checkMobile)

        }
    }, []);

    const renderView = () => {
        if(context.authenticated){
            return (
                <View screenWidth={screenWidth} />
            )
        } else if (context.authenticating){
            return (
                <LoadingSymbol/>
            )
        } else {
            return (
            <Authentication />
            )
        }
    }

    // console.log(context.userData);

    return (
        <React.Fragment>
            {renderView()}
        </React.Fragment>
            
                
                       
                   
        
    )
};

const MobileWrapper = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    
`

const View = (props) => {
    

   
    return (
        
        <MobileWrapper>
            <Switch>
                
                    
                <Route path='/posts'
                    render={()=> <Feed />}    
                />
                    
                <Route path='/conversations' render={
                    () => <ConversationContainer />
                }/>
                    
                <Route path='/friends' 
                    render={() => <People  />}
                />
                   
                <Route path='/profile' 
                    render={() => <Profile />}
                />
                <Route path='/search'>
                    <Search />
                </Route>
                <Route exact path='/'
                    render={() => <Redirect to='/posts' />}
                />
                <Route path='/*' render={() => <div>This page does not exist!</div> }/>
                
            </Switch>
            <Nav />
        </MobileWrapper>
            
        
    )
};

const NavWrapper = styled.div`
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    box-shadow: 0px -1px 3px 0px rgba(117,116,117,0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background: #fff;
    padding: 16px 16px 16px 16px;
`

const NavItem = styled.div`
    height: 25px;
    width: 35px;
    // color: rgb(220,222,225);
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '25px'};
    position: relative;
    
    
`
const Notification = styled.div`
    position: absolute;
    top: 2px;
    right: 2px;
    color: red;
    font-size: 8px;
`

const Nav = props => {
    const context = useContext(UserContext);

    return(
        <NavWrapper style={{color: 'rgb(220,222,225)'}}>
            <NavLink to='/posts'
                activeStyle={{
                    color: 'rgb(0,149,246)'
                }}
            >
                <NavItem >
                    <FontAwesomeIcon icon={faHome} />
                </NavItem>
            </NavLink>
            <NavLink to='/conversations'
                activeStyle={{
                    color: 'rgb(0,149,246)'
                }}
            >
                <NavItem onClick={props.toggleDisplay} screenWidth={props.screenWidth}>
                    <FontAwesomeIcon icon={faComments} />
                </NavItem>
            </NavLink>
            <NavLink to='/search'
                activeStyle={{
                    color: 'rgb(0,149,246)'
                }}
            >
                <NavItem onClick={props.toggleDisplay} screenWidth={props.screenWidth}>
                    <FontAwesomeIcon icon={faSearch} />
                </NavItem>
            </NavLink>
            
            <NavLink to='/friends/friendships'
                activeStyle={{
                    color: 'rgb(0,149,246)'
                }}
            >
                <NavItem active={!props.conversationsDisplay} onClick={props.toggleDisplay}>
                {context.userData.friendrequests.length > 0 ?
                    <Notification>
                        <FontAwesomeIcon icon={faExclamationCircle}/>
                    </Notification>
                : null}
                    <FontAwesomeIcon icon={faUserFriends} />
                </NavItem>
            </NavLink>
            <NavLink to={`/profile/${context.userData.username}`}
                activeStyle={{
                    color: 'rgb(0,149,246)'
                }}
            >
                <NavItem>
                    {/* {context.userData.friendrequests.length > 0 ?  */}
                    
                    {/* // : null                    
                    // } */}
                    <FontAwesomeIcon icon={faAddressCard} />
                </NavItem>
            </NavLink>
            
        </NavWrapper>
    )
}


export default Container;