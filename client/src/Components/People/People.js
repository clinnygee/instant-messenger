import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../../context'; 
import styled from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {  faSearch} from '@fortawesome/free-solid-svg-icons';
import { getSearchResults} from '../../API';
import { Route, Link} from 'react-router-dom';

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
    width: ${({width}) => width ? `${width}` : '40px'}; 
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '30px'};
    color: ${({submittable}) => submittable ? 'rgb(0,149,246)' : 'rgb(220,222,225)'};
    margin: 8px;
`



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
            <PeopleNav>
                <Link to='/friends'>
                    <ChatLink width={'auto'} style={{color: 'rgb(0,149,246)'}}>
                        Search
                    </ChatLink>
                </Link>
                <Link to='/friends/friendrequests'>
                    <ChatLink width={'auto'}>
                        Requests
                    </ChatLink>
                </Link>
                <Link to='/friends/friendships'>
                    <ChatLink width={'auto'}>
                        Friends
                    </ChatLink>
                </Link>                
            </PeopleNav>
            <Route exact path='/friends'>
                <PeopleSearch />
            </Route>
            <Route path='/friends/friendships'>
                <FriendShips />
            </Route>
            <Route path='/friends/friendrequests'>
                <FriendRequests />
            </Route>
            
        </FeedContainer>
        
    )
};

const PeopleSearch = props => {
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
        <React.Fragment>
            <SearchBarWrapper>
                <ChatLink submittable={submittable}>
                    <FontAwesomeIcon icon={faSearch} onClick={handleSearch}/>
                </ChatLink>                
                <Input placeholder='Search' onChange={handleSearchChange}/>
            </SearchBarWrapper>
            {searchResults}
        </React.Fragment>
    )
}

const PeopleNav = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 16px 0px;
`

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
        <Link to={{pathname: `/profile/${props.username}`}}>
            <SearchResultContainer>
                <UserImage src={props.image} />
                <h1>{props.username}</h1>            
            </SearchResultContainer>
        </Link>
    )
};

const FriendShips = props => {
    const context = useContext(UserContext);

    const friends = context.userData.friendships.map(friendship => {
        return <SearchResult 
            username={friendship.user.username}
            image={friendship.user.profileImgUrl}
            
        />
    })
    return (
        <React.Fragment>
                {friends}
        </React.Fragment>
        
    )
};

const FriendRequests = props => {
    const context = useContext(UserContext);

    const requests = context.userData.friendrequests.map(request => {
        return <SearchResult
            username={request.user.username}
            image={request.user.profileImgUrl}
        />
    })

    return (
        <React.Fragment>
            {requests}
        </React.Fragment>
    )
}





export default People;
