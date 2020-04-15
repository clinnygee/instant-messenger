import React, { useState } from 'react';
import styled from 'styled-components';
import {UserContext} from '../../../context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

const FeedContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;
    background: rgb(250,250,250);

`


const Feed = () => {

    const context = useState(UserContext);
    return (
        
        <FeedContainer>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </FeedContainer>
    );
};

const PostContainer = styled.div`
    border-radius: 3px;
    border: 1px solid rgb(219,219,219);
    
    margin: 0px 0px 60px 0px;
    background-color: #fff;
    line-height: 1.4em;
`

const PostHeader = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 16px;
`

const ConversationHeader = styled.h1`
    font-size: 14px;
    padding: 0px 0px 0px 16px;
`

const PostHeaderImage = styled.div`
    width: 30px;
    height: 30px;
    clip-path: circle(40%);
    background-image: url(${({url}) => url ? url : 'https://picsum.photos/100'})    
`

const PostImageContainer = styled.div`
    width: 100%;
    height: 330px;
`

const PostImage = styled.img`
    width: 100%;
    height: 100%;
`

const ReactionContainer = styled.section`
    padding: 0 16px;
    height: 40px;
`

const Reacts = styled.section`
    padding: 0 16px;
`

const Comments = styled.section`
    padding: 0 16px;
`

const PostedTime = styled.div`
    padding: 0 16px;
`

const PostComment = styled.section`
    padding: 0 16px;
    height: 55px;
    display: flex;
    border-top: 1px solid rgb(219,219,219);
`

const PostCommentForm = styled.form`
    display: flex;
    flex-direction: row;
    
    display: flex;
    width: calc(100% - 32px);
    
    
`

const PostCommentInput = styled.input`
    opacity: 0.3;
    border: none;
    width: calc(100% - 33px);

    &:focus {
        outline: none;
    }
`

const PostCommentButton = styled.button`
    border: none;
    background: #fff;
    color: ${({active}) => active ? 'rgb(0,149,246)' : 'rgba(0,149,246,.3)'};
    width: 33px;
    margin: 16px 0px 0px 0px;
    &:focus: {
        outline: none;
    }
`

const UserLink = styled.a`
    font-weight: bold;
`

const NavItem = styled.div`
    height: 100%;
    width: 10%;
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '25px'};
    color: ${({active}) => active ? 'black' : 'rgb(220,222,225)'}
`

const CommentContainer = styled.div`
    margin: 0px 16px;
`

const Time = styled.time`
    color: rgb(142,142,142);
`

const Post = props => {

    return (
        <PostContainer>
            <PostHeader>
                <PostHeaderImage></PostHeaderImage>
                <UserLink>
                    <ConversationHeader>Username</ConversationHeader>
                </UserLink>
                
            </PostHeader>
            <PostImageContainer>
                <PostImage src={'https://scontent-syd2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/93631825_320781435568739_2939823042833971111_n.jpg?_nc_ht=scontent-syd2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=FvTAZ0kifykAX92SVU9&oh=63059bda5c2f146e3c996b1c15dfbdb6&oe=5EBEE4BC'}/>
            </PostImageContainer>
            <ReactionContainer>
                <NavItem>
                    <FontAwesomeIcon icon={faHeart} />
                </NavItem>
            </ReactionContainer>
            <Reacts>
                <p>Liked by X, Y, Z</p>
            </Reacts>
            <CommentContainer>
                <Comment />
            </CommentContainer>
            <CommentContainer>
                <Time>Posted 10 minutes ago</Time>
            </CommentContainer>
            
            <PostComment>
                <PostCommentForm>
                    <PostCommentInput placeholder='Add a comment..' />

                    
                    <PostCommentButton type='submit' >POST</PostCommentButton>
                </PostCommentForm>
            </PostComment>
           
        </PostContainer>
    )
};

const Comment = props => {

    return (
        <React.Fragment>
            <p><UserLink><span>Username</span></UserLink> This is a comment</p>
        </React.Fragment>
        
    )
}

export default Feed;