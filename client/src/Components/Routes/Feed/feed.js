import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {UserContext} from '../../../context';
import { Route, Switch, Link, Redirect} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faCameraRetro} from '@fortawesome/free-solid-svg-icons';

import  { uploadNewPost, getAllPosts, createPostComment } from '../../../API';


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
const FeedNav = styled.nav`
    width: 100vw;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    background-color: #fff;
`


const Feed = () => {

    const context = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log(context.jwt);
        console.log(context);

        getAllPosts(context.jwt).then(res => {
            res.json().then(posts => {
                setPosts(posts);
            })
        });
    }, []);

    console.log(posts);

    const createPosts = () => {
        return posts.map(post => {
            return <Post key={post.id} imageUrl={post.contentUrl} text={post.text} created={post.createdAt} user={post.user}/>
        })
    }

    const DisplayPosts = posts.length > 0 ? createPosts() : null;

    

    return (
        <React.Fragment>
        <FeedNav>
                <Link to={'/feed/create'}>
                    <NavItem fontSize={'50px'}>
                        <FontAwesomeIcon icon={faCameraRetro}/>
                    </NavItem>
                </Link>                
        </FeedNav>
        <FeedContainer>
            
            <Switch>
                <Route exact path='/feed'>
                    {DisplayPosts}
                </Route>
                <Route path='/feed/create'>
                    <NewPost />
                </Route>
            </Switch>
            
        </FeedContainer>
        </React.Fragment>
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
    background-image: url(${({url}) => url ? `${url}` : 'https://picsum.photos/100'})    
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
    font-size: ${({fontSize}) => fontSize ? `${fontSize}` : '25px'};
    color: ${({active}) => active ? 'black' : 'rgb(220,222,225)'}
`

const CommentContainer = styled.div`
    margin: 0px 16px;
`

const Time = styled.time`
    color: rgb(142,142,142);
`

const Post = props => {

    const [submittable, setSubmittable] = useState(false);
    const [comment, setComment] = useState(null);
    const context = useContext(UserContext);

    const handleCommentInput = (e) => {
        setComment(e.target.value);
        checkSubmittable();
    };

    const checkSubmittable = () => {
        (comment && comment.length > 0) ? setSubmittable(true) : setSubmittable(false); 
    };

    const handleCommentSubmit = () => {
        e.preventDefault();
        createPostComment(context.jwt, comment, props.key).then(res => {
            console.log(res);
        })
    }

    // this component will handle POST requests to the server at /posts/comment/create

    console.log(props);
    return (
        <PostContainer>
            <PostHeader>
                <PostHeaderImage url={props.user.profileImgUrl}></PostHeaderImage>
                <UserLink >
                    <ConversationHeader>{props.user.username}</ConversationHeader>
                </UserLink>
                
            </PostHeader>
            <PostImageContainer>
                <PostImage src={props.imageUrl}/>
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
                <Comment text={props.text} username={props.user.username}/>
            </CommentContainer>
            <CommentContainer>
                <Time>{props.created}</Time>
            </CommentContainer>
            
            <PostComment>
                <PostCommentForm>
                    <PostCommentInput placeholder='Add a comment..' onChange={handleCommentInput}/>

                    
                    <PostCommentButton type='submit' disabled={!submittable} active={submittable} onClick={handleCommentSubmit}>POST</PostCommentButton>
                </PostCommentForm>
            </PostComment>
           
        </PostContainer>
    )
};

const Comment = props => {

    return (
        <React.Fragment>
            <p><UserLink><span>{props.username}</span></UserLink> {props.text}</p>
        </React.Fragment>
        
    )
};

const PostCreateForm = styled.form`
    display: flex;
    flex-direction: column;
`
const NewPost = props => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [submittable, setSubmittable] = useState(false);
    const context = useContext(UserContext);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        checkSubmittable();
        
    };

    const checkSubmittable = () => {
        setSubmittable(file && postBody);
    }

    const handleBodyInput = e => {
        setPostBody(e.target.value);
        checkSubmittable();

    };

    const onPostUpload = e => {
        e.preventDefault();

        const post = new FormData();

        post.append('post-image', file);
        post.append('post-body', postBody);

        console.log(post.entries());

        uploadNewPost(context.jwt, post).then(res => {
            console.log(res);
        })
    }

    return (
        <PostContainer>
            <PostImageContainer>
                <PostImage src={fileUrl ? fileUrl : null}/>
            </PostImageContainer>
            <PostCreateForm>
                <input type='file' onChange={handleFileChange} />
                <PostCommentInput placeholder='Add a description' onChange={handleBodyInput} />
                <PostCommentButton type='submit' disabled={!submittable} active={submittable} onClick={onPostUpload}>POST</PostCommentButton>
            </PostCreateForm>
        </PostContainer>
    )
}

export default Feed;