import React, {useState, useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Message from './Message.view';
import Chats from './Chats';
import {Back} from '../../Reusable'
import {UserContext} from '../../../context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { Switch, Route, useHistory } from 'react-router-dom';


const _ConversationContainer = styled.div`
    width: 100%;
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
    height: calc(100% - 164px);
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
`


const IconContainer = styled.div`
    width: 40px;
    height: 50px;
    font-size: 40px;
    margin-left: 8px;
    color: ${({active}) => active ? 'rgb(0,149,246)' : `rgb(220, 222, 225)`};

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
    background-image: ${(props) => props.image ? `url(${props.image})` : 'url(https://instant-messenger.s3-ap-southeast-2.amazonaws.com/1586585138915.jpeg)'};
    background-size: contain; 
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

const FeedContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;
    background: rgb(250,250,250);
    padding-top: 35px;

    &::-webkit-scrollbar {
        display: none;
      }

`

// This needs to be a container component, which will either display all of your conversations,
// or will allow you to send a new message to a new recipient.
// Show Chats by default, unless a reciever is selected

const ConversationContainer = props => {
    // const [conversationsDisplay, setConversationsDisplay] = useState(true);
    // const [messageDisplay, setMessageDisplay] = useState(false);
    // const [receiver, setReceiver] = useState(null);

    // const displayMessage = () => {
    //     setMessageDisplay(true);
    // };

    // const selectMessageReceiver = (username) => {
    //     setReceiver(username);
    //     setMessageDisplay(true);
    // };

    

    return (
        <FeedContainer>
            <Switch>               
                
                <Route path='/conversations/:username' 
                    render={() => <Conversation />} />
                <Route exact path='/conversations' 
                    render={() => <Chats />} />

            </Switch>
            
        </FeedContainer>
        
    )


}
const Conversation = props => {

    const [receiver, setReceiver] = useState(null);
    const context = useContext(UserContext);
    const [messages, setMessages] = useState(null);
    const history = useHistory();
    const [image, setImage] = useState(null);
    // const [newConversation, setNewConversation] = useState(false);
    // const [update, setUpdate] = useState(false);
    // console.log(history.location.search);

    // console.log(context)

    const updateReceiver = (name) => {

        setReceiver(name);
        findConversationMessages(name);
    };

    const sendMessage = (message) => {
        context.sendWsMessage(receiver, message);
        console.log(receiver);
        // if(newConversation){
        //     setUpdate(true);
        // }
    };

    const findConversationMessages = (receiverUsername) => {

        console.log(context.conversationData);
        console.log(receiver);
        const conversation = context.conversationData.find(conversation => {
            return (conversation.user1Username === receiverUsername || conversation.user2Username === receiverUsername)
        });

        if(conversation) {
            console.log(conversation.messages)
            setMessages(conversation.messages);
            setImage(conversation.user1.username === receiverUsername ? conversation.user1.profileImgUrl : conversation.user2.profileImgUrl)
            // setNewConversation(false);
        } 

        

        
    };

    const createMessages = () => {
        return messages.map((message) => {
            return <Message content={message.text} 
            user={message.user.username != receiver ? true : false}
            date={message.createdAt}
            id={message._id}
            />
        })
    }

    useEffect(() => {
        console.log('calling useEffect in Conversation')
        console.log(history.location.search);
        let search = history.location.search.split('?')[1];
        console.log(search);
        setReceiver(search);
        findConversationMessages(search);
        
        
    }, [history.location]);

    useEffect(()=> {
        findConversationMessages(receiver);
    },[context.conversationData]);


    console.log(props);
    
    const messagesDisplay = messages ? createMessages() : null;

    return (
        <_ConversationContainer>
            <Header>
                <Back />
                {receiver ? 
                    <Recipient receiver={receiver} image={image}/>
                :
                    <RecipientSelect onSubmit={updateReceiver} />
                }
               
                
            </Header>
            <ChatContainer>
                {messagesDisplay}
            </ChatContainer>
            <MessageCreate onSubmit={sendMessage}/>
            
            
        </_ConversationContainer>
    )
};

const Recipient = props => {
    return (
        <React.Fragment>
            <ConversationImage image={props.image}>
            </ConversationImage>
            <ConversationSummary>
                <ConversationHeader>
                    {props.receiver}
                </ConversationHeader>
                <ConversationSecondary>
                    {/* Last Active:  */}
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
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const MessageCreate = props => {

    const [message, setMessage] = useState(null);
    const inputRef = useRef(null);
    console.log(inputRef);
    
    const updateMessage = (e) => {
        setMessage(e.target.value);

    };

    const submit = () => {
        console.log('submitting message');
        props.onSubmit(message);
        setMessage(null);
        inputRef.current.value = "";
    }

    return (
        <MessageCreateContainer>
            <SearchForm height={`50px`}>
                    <SearchInput placeholder={'Message..'} onChange={updateMessage} ref={inputRef}>
                    </SearchInput>
            </SearchForm>
            <IconContainer active={message} onClick={submit}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </IconContainer>
            
        </MessageCreateContainer>
    )
}

export default ConversationContainer;