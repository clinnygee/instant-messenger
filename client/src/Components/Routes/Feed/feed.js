import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {UserContext} from '../../../context';
import { Route, Switch, Link, NavLink, Redirect, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faCameraRetro, faEllipsisH} from '@fortawesome/free-solid-svg-icons';

import  { uploadNewPost, getAllPosts, createPostComment, changePostLike, getSinglePost } from '../../../API';
import {useIsLoggedInUser, useHasUserLiked} from '../../Hooks';


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
            return <Post key={post.id} id={post.id} imageUrl={post.contentUrl} 
                        text={post.text} created={post.createdAt} user={post.user}
                        comments={post.comments}   
                        likes={post.postlikes} 
                    />
        })
    }

    const DisplayPosts = posts.length > 0 ? createPosts() : null;

    

    return (
        <React.Fragment>
        <FeedNav>
                <NavLink to={'/posts/create'}
                    activeStyle={{
                        color: 'black'
                    }}
                >
                    <NavItem fontSize={'50px'}>
                        <FontAwesomeIcon icon={faCameraRetro}/>
                    </NavItem>
                </NavLink>                
        </FeedNav>
        <FeedContainer>
            
            <Switch>
                <Route exact path='/posts'>
                    {DisplayPosts}
                </Route>
                <Route path='/posts/create'>
                    <NewPost />
                </Route>
                <Route path='/posts/:id'>
                    <PostSingle />
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
    background-image: url(${({url}) => url ? `${url}` : 'https://picsum.photos/100'});
    background-size: 30px 30px;    
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

const Input = styled.input`
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
    color: ${({active}) => active ? 'black' : 'rgb(220,222,225)'};
`

const LikeItem = styled.div`
    height: 100%;
    width: 10%;
    font-size: ${({fontSize}) => fontSize ? `${fontSize}` : '25px'};
    color: ${({liked}) => liked ? 'red' : 'rgb(220,222,225)'};
`

const CommentContainer = styled.div`
    margin: 0px 16px;
`

const Time = styled.time`
    color: rgb(142,142,142);
`

const Post = props => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const [image, setImage] = useState({});
    const [body, setBody] = useState('');
    const [time, setTime] = useState(null);

    const [submittable, setSubmittable] = useState(false);
    const [comment, setComment] = useState(null);
    const isUsers = useIsLoggedInUser(props.user.id);
    const userHasLiked = useHasUserLiked(props.likes);
    const context = useContext(UserContext);

    useEffect(() => {
        setComments(props.comments);
        setUser(props.user);
        setImage(props.imageUrl);
        setBody(props.text);
        setTime(props.created);
    }, []);

    const handleCommentInput = (e) => {
        console.log(e.target.value);
        setComment(e.target.value);
        checkSubmittable();
    };

    const resetCommentForm = () => {
        setComment(null);
        checkSubmittable();
    }

    const checkSubmittable = () => {
        (comment && comment.length > 0) ? setSubmittable(true) : setSubmittable(false); 
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        createPostComment(context.jwt, {text: comment}, props.id).then(res => {
            console.log(res);
            console.log('What?')
            if(res.status === 200){
                comments.push({user:{username: context.userData.username, id:context.userData.id}, text: comment});
                resetCommentForm();
            }
        })
    };

    const handlePostLike = e => {
        changePostLike(context.jwt, props.id).then(res => {
            console.log(res);
        })
    }

    const createComments = () => {
        return comments.map(comment => {
            return <Comment 
                username={comment.user.username}
                userId={comment.user.id}
                text={comment.text}
            />
        })
    }

    // this component will handle POST requests to the server at /posts/comment/create

    console.log(props);

    const commentsComponents = (comments && comments.length > 0) ? createComments() : null;
    return (
        <PostContainer>
            <PostHeader>
                <Link to={`/profile/${user.username}`} >
                    <PostHeaderImage url={user.profileImgUrl}></PostHeaderImage>
                </Link>
                <UserLink >
                    <Link to={`/profile/${user.username}`} >
                        <ConversationHeader>{user.username}</ConversationHeader>
                    </Link>
                </UserLink>
                {isUsers ? <PostOptions /> : null}
                
            </PostHeader>
            <PostImageContainer>
                <PostImage src={image}/>
            </PostImageContainer>
            <ReactionContainer>
                <LikeItem onClick={handlePostLike} liked={userHasLiked}>
                    <FontAwesomeIcon icon={faHeart} />
                </LikeItem>
            </ReactionContainer>
            <Reacts>
                <p>Liked by X, Y, Z</p>
            </Reacts>
            <CommentContainer>
                <Comment text={body} username={user.username}/>
                {commentsComponents}
            </CommentContainer>
            <CommentContainer>
                <Time>{time}</Time>
            </CommentContainer>
            
            <PostComment>
                <PostCommentForm>
                    <Input placeholder='Add a comment..' onChange={handleCommentInput}/>

                    
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

const OptionsContainer = styled.div`
    height: auto;
    width: 50px;
    margin-left: auto;
    padding: 0px 8px;
    
`

const PostOptions = props => {
    return (
        <OptionsContainer>
            <NavItem fontSize={'30px'}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
            </NavItem>
        </OptionsContainer>
    )
}

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
                <Input placeholder='Add a description' onChange={handleBodyInput} />
                <PostCommentButton type='submit' disabled={!submittable} active={submittable} onClick={onPostUpload}>POST</PostCommentButton>
            </PostCreateForm>
        </PostContainer>
    )
};

const PostSingle = props => {
    const {id} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [post, setPost] = useState(null);
    const context = useContext(UserContext);

    useEffect(() => {
        getSinglePost(context.jwt, id).then(res => {
            res.json().then(post => {
                setPost(post);
                setLoaded(true);
            })
        })
    }, [])
    return (
        <React.Fragment>
        {loaded ? 
            <Post 
            key={post.id} id={post.id} imageUrl={post.contentUrl} 
            text={post.text} created={post.createdAt} user={post.user}
            comments={post.comments}
        />
        : <div>fetching...</div>
        }
        </React.Fragment>
    )
}

export default Feed;