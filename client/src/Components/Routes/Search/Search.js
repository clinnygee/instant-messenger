import React, {useState} from 'react';
import styled from 'styled-components';

import { Route, Link, NavLink, useHistory, useParams} from 'react-router-dom';

import{ PeopleSearch} from '../../People/People';


const Search = props => {
    const [tagSearch, setTagSearch] = useState(false);
    const history = useHistory();
    const params = useParams();

    console.log(history);
    console.log(params);

    return (
        <FeedContainer>
            <PeopleNav>
                <NavLink exact to='/search'
                    activeStyle={{color: 'rgb(0,149,246)'}}
                >
                    <ChatLink width={'auto'} >
                        People
                    </ChatLink>
                </NavLink>
                <NavLink to={{pathname: '/search/tags', search:'tags'}}
                    activeStyle={{color: 'rgb(0,149,246)'}}
                >
                    <ChatLink width={'auto'} >
                        Tags
                    </ChatLink>
                </NavLink>
            </PeopleNav>        
            <Route exact path ='/search'>
                <PeopleSearch link={'/profile'}/>
            </Route>
            <Route path='/search/tags'>
                <PeopleSearch link={'/posts/search'} tags={true}/>
            </Route>
        </FeedContainer>
        
        
    )
};

const PeopleNav = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 16px 0px;
    color: rgb(220,222,225);
`

const ChatLink = styled.div`
    height: 40px;
    width: ${({width}) => width ? `${width}` : '40px'}; 
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '30px'};
    // color: ${({submittable}) => submittable ? 'rgb(0,149,246)' : 'rgb(220,222,225)'};
    margin: 8px;
    position: relative;
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

export default Search;