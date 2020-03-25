import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import Conversation from './Conversation.view';
import MessageItem from './Message.view'

const Wrapper = styled.div`
    width: 70%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
`

const ConversationListContainer = styled.div`
    width: 43%;
    height: 100%;
`

const Header = styled.div`
    min-height: 100px;
    max-height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 16px 16px 16px 16px;
    align-items: center;
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
    height: calc(100% - 100px - 84px - 50px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;

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
const ConversationContainer = styled.div`
    width: 67%;
    height: 100%;
`

const ConversationSummary = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
`
const ConversationSecondary = styled.p`
    color: rgb(153,153,153);
    font-size: 17px;
`

const ChatContainer = styled.div`
    height: calc(100% - 330px);
    width: 100%;
    overflow-y: scroll;
`

const MessageSubmitContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;

`
const IconContainer = styled.div`
    width: 80px;
    height: 80px;

`




const Conversations = () => {

    return (
        <Wrapper>
            <ConversationListContainer>
                <Header>
                    <ConversationImage>

                    </ConversationImage>
                    <ConversationHeader>
                        Chat
                    </ConversationHeader>

                </Header>
                <SearchBar>
                    <SearchForm>
                        <SearchInput placeholder={`Search For Conversation...`}/>
                    </SearchForm>
                </SearchBar>
                <ConversationList>
                    <Conversation open={true}/>
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </ConversationList>
            </ConversationListContainer>
            <ConversationContainer>
                <Header>
                    <ConversationImage>

                    </ConversationImage>
                    <ConversationSummary>
                        <ConversationHeader>
                            Gym Rats
                        </ConversationHeader>
                        <ConversationSecondary>
                            Last Active
                        </ConversationSecondary>

                    </ConversationSummary>
                    
                </Header>
                <ChatContainer>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                    <MessageItem content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                </ChatContainer>
                <MessageSubmitContainer>
                    <IconContainer>

                    </IconContainer>
                    <IconContainer>

                    </IconContainer>
                    <SearchForm height={`100px`}>
                        <SearchInput>

                        </SearchInput>
                    </SearchForm>

                </MessageSubmitContainer>
                
                
            </ConversationContainer>
            
            
        </Wrapper>
    )
}

export default Conversations;