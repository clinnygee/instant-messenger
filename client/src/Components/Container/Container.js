import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Conversations from '../Conversations';
import People from '../People';
import Chats from '../Chats';
import Conversation from '../Conversation';
import {AppWrapper} from '../Styled/styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComments, faUserFriends} from '@fortawesome/free-solid-svg-icons';



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
            {mobileView ? <MobileView screenWidth={screenWidth}/> : <DesktopView />}
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

const MobileView = (props) => {
    const [conversationsDisplay, setConversationsDisplay] = useState(true);
    const [messageDisplay, setMessageDisplay] = useState(false);

    const toggleDisplay = () => {
        setMessageDisplay(false);
        setConversationsDisplay(!conversationsDisplay);
    };

    const displayMessage = () => {
        setMessageDisplay(true);
    };

    const chatsDisplayRender = () => {
        return (
            <React.Fragment>
                {conversationsDisplay ? <Chats mobile={true} createMessage={displayMessage}/> : <People mobile={true}/>}
                <MobileNav conversationsDisplay={conversationsDisplay} toggleDisplay={toggleDisplay}/>
            </React.Fragment>
            
            
            )
    };

    const conversationsDisplayRender = () => {
        return (
            <React.Fragment>
                <Conversation />
                <MobileNav conversationsDisplay={conversationsDisplay} toggleDisplay={toggleDisplay}/>
            </React.Fragment>
        )
    }
    return (
        
        <MobileWrapper>
            {messageDisplay ?
                conversationsDisplayRender()
                :
                chatsDisplayRender()             
                
            }
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

const MobileNav = props => {

    return(
        <NavWrapper>
            <NavItem active={props.conversationsDisplay} onClick={props.toggleDisplay} screenWidth={props.screenWidth}>
                <FontAwesomeIcon icon={faComments} />
            </NavItem>
            <NavItem active={!props.conversationsDisplay} onClick={props.toggleDisplay}>
                <FontAwesomeIcon icon={faUserFriends} />
            </NavItem>
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