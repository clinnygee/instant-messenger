import React from 'react';
import styled from 'styled-components';

import Chat from './Chats.view';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPen} from '@fortawesome/free-solid-svg-icons';

const ConversationListContainer = styled.div`
    
    width: ${({mobile}) => mobile ? '100vw' : '43%'};
    
    height: ${({mobile}) => mobile ? '85%' : '100%'};
`

const Header = styled.div`
    min-height: 100px;
    max-height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 16px 16px 16px 16px;
    align-items: center;
    box-shadow: 0px 1px 3px 0px rgba(117,116,117,0.5);
    z-index: 100;
`

const ConversationImage = styled.div`
    width: 100px;
    height: 100px;
    clip-path: circle(40%);
    background-image: url(https://picsum.photos/100)
`

const ConversationHeader = styled.h1`
    font-size: 35px;
    padding: 0px 0px 0px 16px;
`

const ChatLink = styled.div`
    height: 100%;
    width: 10%;
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '40px'};
    color: ${({active}) => active ? 'black' : 'rgb(220,222,225)'};
    margin-left: auto;
`

const SearchBar = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
`

const SearchForm = styled.div`
    width: 80%;
    height: ${({height}) => height ? {height} : `50%`};
    display: flex;
    align-items: center;
    justify-content: center;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    background-color: rgb(238,240,243);
    border-radius: 50px;
    padding: 0 16px 0 16px;
    border: none;
    
    color: rgb(0,0,0);

    &:focus {
        background-color: darken(rgb(241,240,240), 10%);
        border: none;
        outline: none;
    }
`

const ConversationList = styled.div`
    width: 100%;
    height: calc(100%  - 84px - 50px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0px 8px 0px;

    &::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    
    &::-webkit-scrollbar
    {
        width: 12px;
        background-color: #F5F5F5;
    }
    
    &::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: rgb(200, 203, 205);
    }
    
    

    
`

const Chats = props => {

    return (
        <ConversationListContainer mobile={props.mobile}>
            <Header>
                <ConversationImage>
                </ConversationImage>
                <ConversationHeader>
                    Chat
                </ConversationHeader>
                <ChatLink onClick={props.createMessage}>
                    <FontAwesomeIcon icon={faPen} />
                </ChatLink>
            </Header>
            {/* <SearchBar>
                <SearchForm>
                    <SearchInput placeholder={`Search For Conversation...`}/>
                </SearchForm>
            </SearchBar> */}
            <ConversationList>
                <Chat open={true}/>
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
            </ConversationList>
        </ConversationListContainer>
    )
}

export default Chats;