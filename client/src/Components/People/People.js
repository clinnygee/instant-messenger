import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../../context'; 
import styled from 'styled-components';
import Chat from '../Chats/Chats.view';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserPlus, faAddressBook, faPlusCircle, faUserCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {fetchFriendsData, acceptFriendRequest} from '../../API';

const Wrapper = styled.div`
    width: ${({mobile}) => mobile ? `100vw` : `30%`};
    height: ${({mobile}) => mobile ? `85%` : `100%`};
    background-color: #fff;
`

const IconContainer = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
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
    width: ${({people}) => people ? `50px` : '100px'};
    height: ${({people}) => people ? `50px` : '100px'};
    clip-path: circle(40%);
    background-image: url(${({url}) => url ? url : `https://picsum.photos/100`})
`

const ConversationHeader = styled.h1`
    font-size: 35px;
    padding: 0px 0px 0px 16px;
`

const ChatLink = styled.div`
    height: 40px;
    width: 40px;
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '30px'};
    color: ${({active}) => active ? 'black' : 'rgb(220,222,225)'};
    margin: 8px;
`

const People = (props) => {

    const [addFriend, setAddFriend] = useState(false);
    const [friendsData, setFriendsData] = useState([]);
    const context = useContext(UserContext);

    const changeAddFriend = () => {
        setAddFriend(!addFriend);
    };

    const handleCreateFriendRequest = (user) => {
        context.sendFriendRequest(user);
    };

    const handleAcceptFriendRequest = id => {
        console.log(id);
        acceptFriendRequest(id, context.jwt).then(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        fetchFriendsData(context.jwt).then(res => {
            res.json().then(parsedJson => {
                setFriendsData(parsedJson);
            })
        })
    }, []);

    console.log(friendsData);

    return (
        <Wrapper mobile={props.mobile}>
            <Header>
                <ConversationImage people={true}></ConversationImage>
                <ConversationHeader>People</ConversationHeader>
                <IconContainer>
                    <ChatLink>
                        <FontAwesomeIcon icon={faAddressBook}/>
                    </ChatLink>
                    <ChatLink onClick={changeAddFriend}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </ChatLink>
                </IconContainer>
                
                
            </Header>
            {addFriend ? <AddFriend onFriendRequest={handleCreateFriendRequest} requests={friendsData.friendrequests} acceptRequest={handleAcceptFriendRequest}/> : null}
        </Wrapper>
    )
};

const FriendInputWrapper = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    padding: 8px 16px 8px 16px;
    align-items: center;
`

const FriendInput = styled.input`
    width: 100px;
    height: 40px;
    background-color: #fff;
    border: none;
    

    &:focus {
        outline: none;
    }
`

const AddFriend = (props) => {
    const [name, setName] = useState('');

    const updateName = e => {
        setName(e.target.value);
    };

    const onNameSubmit = () => {
        props.onFriendRequest(name);
    }

    const friendRequests = props.requests.map(request => {
        return <FriendRequest id={request.id} acceptRequest={props.acceptRequest} />
    });

    console.log(friendRequests);

    return (
        <React.Fragment>
            <FriendInputWrapper>
                <FriendInput placeholder={'Name..'} onChange={updateName}/>
                <IconContainer>
                     <ChatLink onClick={onNameSubmit}>
                         <FontAwesomeIcon icon={faPlusCircle} />
                     </ChatLink>
                </IconContainer>
                
            </FriendInputWrapper>
            {/* {props.requests ? {friendRequests} : null}
             */}
             {friendRequests}
        </React.Fragment>
        
    )
    };

const FriendRequest = props => {

    const onRequestAccept = () => {
        props.acceptRequest(props.id);
    }
    
    return (
        <FriendInputWrapper>
            <ConversationImage people={true}></ConversationImage>
            <p>User</p>
            <IconContainer>
                <ChatLink>
                    <FontAwesomeIcon icon={faTimes}/>
                </ChatLink>
                <ChatLink onClick={onRequestAccept}>
                    <FontAwesomeIcon icon={faUserCheck}/>
                </ChatLink>
            </IconContainer>
            
        </FriendInputWrapper>
    )
}

export default People;
