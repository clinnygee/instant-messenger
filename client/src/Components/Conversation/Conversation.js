import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import Message from './Message.view';
import {UserContext} from '../../context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';


const ConversationContainer = styled.div`
    width: 100%;
    height: 85%;
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
    height: calc(100% - 200px);
    width: 100%;
    overflow-y: scroll;
`


const IconContainer = styled.div`
    width: 80px;
    height: 75px;
    font-size: 40px;
    color: ${({active}) => active ? '#000' : `rgb(220, 222, 225)`}

`

const Header = styled.div`
    height: 100px;
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

const SearchForm = styled.div`
    width: 80%;
    height: ${({height}) => height ? height : `50%`};
    display: flex;
    align-items: center;
    justify-content: center;
`

const SearchInput = styled.input`
    width: ${({width}) => width ? width : `100%`};
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
const Conversation = props => {
    const [receiver, setReceiver] = useState(null);
    const context = useContext(UserContext);

    console.log(context)

    const updateReceiver = (name) => {
        setReceiver(name)
    };

    const sendMessage = (message) => {
        context.sendWsMessage(receiver, message)
    };


    return (
        <ConversationContainer>
            <Header>
                {receiver ? 
                    <Recipient receiver={receiver} />
                :
                    <RecipientSelect onSubmit={updateReceiver} />
                }
               
                
            </Header>
            <ChatContainer>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={true}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
                <Message content={'This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message. This is a test message.This is a test message.'} user={false}/>
            </ChatContainer>
            {/* <MessageSubmitContainer>
                <IconContainer>
                </IconContainer>
                <IconContainer>
                </IconContainer>
                <SearchForm height={`75px`}>
                    <SearchInput placeholder={'Message..'}>
                    </SearchInput>
                </SearchForm>
                <IconContainer>
                </IconContainer>
                <IconContainer>
                </IconContainer>
            </MessageSubmitContainer> */}
            <MessageCreate onSubmit={sendMessage}/>
            
            
        </ConversationContainer>
    )
};

const Recipient = props => {
    return (
        <React.Fragment>
            <ConversationImage>
            </ConversationImage>
            <ConversationSummary>
                <ConversationHeader>
                    {props.receiver}
                </ConversationHeader>
                <ConversationSecondary>
                    Last Active: 
                </ConversationSecondary>
            </ConversationSummary>
        </React.Fragment>
        
    )
};

const Form = styled.form`
    
    display: flex;
    flex-direction: row;
    width: 300px !important:
    height: 50px !important;
    box-sizing: border-box;
`

const RecipientInputContainer = styled.div`
    width: 232px;
    height: 50px;
    box-sizing: border-box;
`

const ButtonContainer = styled.div`
    width: 50px;
    height: 50px;
    clip-path: circle(50% at 50% 50%);
    background-color: rgb(238,240,243);
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 0px 16px 0px 16px;
    font-size: 25px;
    
`

const RecipientSelect = props => {
    const [user, setUser] = useState('');

    const updateRecipient = (e) => {
        setUser(e.target.value);
        console.log(user)
    };

    const submit = () => {
        props.onSubmit(user);
    }

    return (
        <Form>
            <RecipientInputContainer>
                <SearchInput placeholder={'Recipient'} onChange={updateRecipient} width={`200px`}/>                
            </RecipientInputContainer>
            <ButtonContainer onClick={submit}>
                <p>+</p>
            </ButtonContainer>
        </Form>
    )
};

const MessageCreateContainer = styled.div`
    width: 100%;
    height: 100px;
    padding: 16px 16px 16px 16px;
    display: flex;
    flex-direction: row;
`

const MessageCreate = props => {

    const [message, setMessage] = useState(null);
    
    const updateMessage = (e) => {
        setMessage(e.target.value);
    };

    const submit = () => {
        props.onSubmit(message);
    }

    return (
        <MessageCreateContainer>
            <SearchForm height={`50px`}>
                    <SearchInput placeholder={'Message..'} onChange={updateMessage} >
                    </SearchInput>
            </SearchForm>
            <IconContainer active={message} onClick={submit}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </IconContainer>
            <IconContainer>
            </IconContainer>
        </MessageCreateContainer>
    )
}

export default Conversation;