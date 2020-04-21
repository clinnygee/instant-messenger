import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../../context'; 
import styled from 'styled-components';
import Chat from '../Chats/Chats.view';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserPlus, faAddressBook, faPlusCircle, faUserCheck, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons';
import {fetchFriendsData, acceptFriendRequest, getSearchResults} from '../../API';
import { Route, Switch, Link, NavLink, Redirect, useParams, useHistory} from 'react-router-dom';

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
    color: ${({submittable}) => submittable ? 'rgb(0,149,246)' : 'rgb(220,222,225)'};
    margin: 8px;
`

// const People = (props) => {

//     const [addFriend, setAddFriend] = useState(false);
//     const [friendsData, setFriendsData] = useState([]);
//     const context = useContext(UserContext);

//     const changeAddFriend = () => {
//         setAddFriend(!addFriend);
//     };

//     const handleCreateFriendRequest = (user) => {
//         context.sendFriendRequest(user);
//     };

//     const handleAcceptFriendRequest = id => {
//         console.log(id);
//         acceptFriendRequest(id, context.jwt).then(res => {
//             console.log(res);
//         })
//     }

//     useEffect(() => {
//         fetchFriendsData(context.jwt).then(res => {
//             res.json().then(parsedJson => {
//                 setFriendsData(parsedJson);
//             })
//         })
//     }, []);

//     console.log(friendsData);

//     return (
//         <Wrapper mobile={props.mobile}>
//             <Header>
//                 <ConversationImage people={true}></ConversationImage>
//                 <ConversationHeader>People</ConversationHeader>
//                 <IconContainer>
//                     <ChatLink>
//                         <FontAwesomeIcon icon={faAddressBook}/>
//                     </ChatLink>
//                     <ChatLink onClick={changeAddFriend}>
//                         <FontAwesomeIcon icon={faUserPlus} />
//                     </ChatLink>
//                 </IconContainer>
                
                
//             </Header>
//             {addFriend ? <AddFriend onFriendRequest={handleCreateFriendRequest} requests={friendsData.friendrequests} acceptRequest={handleAcceptFriendRequest}/> : null}
//         </Wrapper>
//     )
// };

// const FriendInputWrapper = styled.div`
//     width: 100%;
//     height: 80px;
//     display: flex;
//     flex-direction: row;
//     padding: 8px 16px 8px 16px;
//     align-items: center;
// `

// const FriendInput = styled.input`
//     width: 100px;
//     height: 40px;
//     background-color: #fff;
//     border: none;
    

//     &:focus {
//         outline: none;
//     }
// `

// const AddFriend = (props) => {
//     const [name, setName] = useState('');

//     const updateName = e => {
//         setName(e.target.value);
//     };

//     const onNameSubmit = () => {
//         props.onFriendRequest(name);
//     }

//     let friendRequests = null;
//     if(props.requests.length > 0){
//         friendRequests = props.requests.map(request => {
//             return <FriendRequest id={request.id} acceptRequest={props.acceptRequest} />
//         });
//     }

    

//     console.log(friendRequests);

//     return (
//         <React.Fragment>
//             <FriendInputWrapper>
//                 <FriendInput placeholder={'Name..'} onChange={updateName}/>
//                 <IconContainer>
//                      <ChatLink onClick={onNameSubmit}>
//                          <FontAwesomeIcon icon={faPlusCircle} />
//                      </ChatLink>
//                 </IconContainer>
                
//             </FriendInputWrapper>
//             {/* {props.requests ? {friendRequests} : null}
//              */}
//              {friendRequests}
//         </React.Fragment>
        
//     )
//     };

// const FriendRequest = props => {

//     const onRequestAccept = () => {
//         props.acceptRequest(props.id);
//     }
    
//     return (
//         <FriendInputWrapper>
//             <ConversationImage people={true}></ConversationImage>
//             <p>User</p>
//             <IconContainer>
//                 <ChatLink>
//                     <FontAwesomeIcon icon={faTimes}/>
//                 </ChatLink>
//                 <ChatLink onClick={onRequestAccept}>
//                     <FontAwesomeIcon icon={faUserCheck}/>
//                 </ChatLink>
//             </IconContainer>
            
//         </FriendInputWrapper>
//     )
// }


const SearchBarWrapper = styled.div`
    width: 100%;
    
    display: flex;
    
`

const Input = styled.input`
    opacity: 0.8;
    border: none;
    width: calc(100% - 65px);
    height: 30px;
    padding: 8px;

    &:focus {
        outline: none;
    }
`

const FeedContainer = styled.div`
    width: 100vw;
    max-width: 600px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;
    background: rgb(250,250,250);
    padding-top: 70px;

    &::-webkit-scrollbar {
        display: none;
      }

`
const People = props => {
    const [submittable, setSubmittable] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const context = useContext(UserContext);
    const [results, setResults] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        // handleSearch();
        checkSubmittable();
        if(submittable){
            handleSearch()
        }
    };

    const checkSubmittable = () => {
        searchTerm.length > 0 ? setSubmittable(true) : setSubmittable(false);
    }

    const handleSearch = () => {
        getSearchResults(context.jwt, searchTerm).then(res => res.json()).then(parsedResponse => setResults(parsedResponse))
    };

    const createResults =() => {
        return results.map(result => {
            return <SearchResult 
                username={result.username}
                image={result.profileImgUrl}
            />
        })
    }

    const searchResults = results ? createResults(): null;

    return (
        <FeedContainer>
            <SearchBarWrapper>
                <ChatLink submittable={submittable}>
                    <FontAwesomeIcon icon={faSearch} onClick={handleSearch}/>
                </ChatLink>                
                <Input placeholder='Search' onChange={handleSearchChange}/>
            </SearchBarWrapper>
            {searchResults}
        </FeedContainer>
        
    )
};

const UserImage = styled.img`
    width: 60px;
    height: 60px;
    clip-path: circle(40%);
`

const SearchResultContainer = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
`

const SearchResult = props => {


    return(
        <Link to={`/profile/${props.username}`}>
            <SearchResultContainer>
                <UserImage src={props.image} />
                <h1>{props.username}</h1>            
            </SearchResultContainer>
        </Link>
    )
};





export default People;
