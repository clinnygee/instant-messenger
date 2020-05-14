import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {UserContext} from '../../../context';
import { Route, Switch, Link, NavLink, Redirect, useParams, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faCameraRetro, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {GlobalStyle} from '../../App/App';

import  { uploadNewPost, getAllPosts, createPostComment, changePostLike, getSinglePost, deletePost, deleteComment } from '../../../API';
import {useIsLoggedInUser, useHasUserLiked, useTimeElapsed} from '../../Hooks';

import CreatePost from './Create';
import PostLikes from './Likes';
import Search from './Search';
import EditPost from './Edit';
import {LoadingSymbol} from '../../Reusable';

import {PostComment, PostCommentForm, Input, PostCommentButton, UserLink, 
    NavItem, LikeItem, CommentContainer, Time, PostContainer, PostHeader, ConversationHeader,
    PostHeaderImage, PostImageContainer, PostImage, ReactionContainer, Reacts, FeedContainer, FeedNav, ModalContainer,
    ModalBox, ModalButton, OptionsContainer 
} from './styled';

import moment from 'moment';


const Feed = () => {

    const context = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [numberOfPostsLoaded, setNumberOfPostsLoaded] = useState(10);
    

    useEffect(() => {
        console.log(context.jwt);
        console.log(context);

        getAllPosts(context.jwt).then(res => {
            console.log(res);
            res.json().then(posts => {
                setPosts(posts);
                setLoading(false);
            })
        });
    }, [update]);


    

    const createPosts = () => {
        return posts.map(post => {
            return <Post key={post.id} id={post.id} imageUrl={post.contentUrl} 
                        text={post.text} created={post.createdAt} user={post.user}
                        comments={post.comments}   
                        likes={post.postlikes} 
                        tags={post.posttags}
                    />
        })
    };

    const requestUpdate = () => {
        setUpdate(!update);
    }

    const DisplayPosts = posts.length > 0 ? createPosts() : null;

    console.log(posts);

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
            {loading ? 
                <LoadingSymbol />
            
            :
                <FeedRoutes DisplayPosts={DisplayPosts} posts={posts} requestUpdate={requestUpdate}/>
            }
            
            
        </FeedContainer>
        </React.Fragment>
    );
};

const FeedRoutes = ({DisplayPosts, posts, requestUpdate}) => {

    return (
        <Switch>
            <Route exact path='/posts'>
                {DisplayPosts}
            </Route>
            <Route path='/posts/create'>
                <CreatePost requestUpdate={requestUpdate}/>
            </Route>
            <Route path='/posts/search/:tag'>
                <Search />
            </Route>
            <Route path='/posts/edit/*'>
                <EditPost posts={posts} />
            </Route>
            <Route path='/posts/:id/likes'>
                <PostLikes posts={posts}/>
            </Route>
            <Route path='/posts/:id'>
                <PostSingle />
            </Route>
            
        </Switch>
    )
}



export const Post = props => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});
    const [image, setImage] = useState({});
    // const [imageHeight, setImageHeight] = useState();
    const [imageWidth, setImageWidth] = useState();
    const [body, setBody] = useState('');
    const [time, setTime] = useState(null);

    const [doubleTapLike, setDoubleTapLike] = useState(false);

    const [submittable, setSubmittable] = useState(false);
    const [comment, setComment] = useState(null);
    const [likes, setLikes] = useState([]);
    const isUsers = useIsLoggedInUser(props.user.id);
    const userHasLiked = useHasUserLiked(likes);
    const context = useContext(UserContext);

    useEffect(() => {
        
        setComments(props.comments);
        setUser(props.user);
        setImage(props.imageUrl);
        setBody(props.text);
        setTime(props.created);
        setLikes(props.likes);
    }, []);

    const adjustImageSize=(e)=>{
        console.log(e.target.width)
            let maxWidth = window.innerWidth > 600 ? 585 : window.innerWidth - 15;

                // now find what % the width of the image has to change
            let reductionPercent = maxWidth / e.target.width;

            console.log(reductionPercent)

            setImageHeight(e.target.height * reductionPercent);
            setImageWidth(e.target.width * reductionPercent);
    }

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
            return res.json()
            // console.log(res);
        }).then(parsedJson => {
            console.log(parsedJson)
            if(Array.isArray(parsedJson)){
                console.log('Like has been removed')
                // find a way to remove users like from the like array
                let newLikes = likes.filter(like => { return (like.userId !== context.userData.id)});
                setLikes(newLikes);
            } else if(typeof parsedJson === 'object'){
                let newLikes = [parsedJson].concat(likes);
                console.log('this is a new like')
                setLikes(newLikes);
                console.log(likes);
            }
        })
    };

    const tapLike = e => {
        if(doubleTapLike){
            handlePostLike();
            setDoubleTapLike(false);
        }else {
            setDoubleTapLike(true);
            setTimeout(() => {
                setDoubleTapLike(false);
            }, 1000)
        }
    }

    const createComments = () => {
        return comments.map(comment => {
            return <Comment 
                username={comment.user.username}
                id={comment.user.id}
                text={comment.text}
                key={comment.createdAt}
                commentId={comment.id}
            />
        })
    };



    // this component will handle POST requests to the server at /posts/comment/create

    // console.log(props);

    const commentsComponents = (comments && comments.length > 0) ? createComments() : null;
    return (
        <PostContainer>
            <PostHeader>
                <Link to={`/profile/${user.username}`} >
                    <PostHeaderImage url={user.profileImgUrl}></PostHeaderImage>
                </Link>
                {/* <UserLink > */}
                    <Link to={`/profile/${user.username}`} >
                        <ConversationHeader>{user.username}</ConversationHeader>
                    </Link>
                {/* </UserLink> */}
                {isUsers ? <PostOptions id={props.id} post={true}/> : null}
                
            </PostHeader>
            <PostImageContainer onClick={tapLike} >
                <PostImage src={image} width={imageWidth ? `${imageWidth}` : 'auto'} 
                    // height={imageHeight ? `${imageHeight}px`: 'auto'}
                    onLoad={adjustImageSize}
                />
            </PostImageContainer>
            <ReactionContainer>
                <LikeItem onClick={handlePostLike} liked={userHasLiked}>
                    <FontAwesomeIcon icon={faHeart} />
                </LikeItem>
            </ReactionContainer>
            <Likes likes={likes} id={props.id}>

            </Likes>
            <CommentContainer>
                <Comment text={body} username={user.username} tags={props.tags}/>
                {commentsComponents}
            </CommentContainer>
            <CommentContainer style={{margin: '8px 24px'}}>
                <TimeCalculator time={time}/>
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

const TimeCalculator = ({time}) =>{
    const elapsed = useTimeElapsed(time);
    return (
        <Time>{elapsed}</Time>
    )
}

const Comment = props => {
    const context = useContext(UserContext);
    const isUsers = useIsLoggedInUser(props.id);


    const createTags = () => {
        
        return props.tags.map(tag => {
            return (
                <Link to={{
                    pathname: `/posts/search/${tag.tag.tag}`,
                    // search: tag.tag.tag,
                }}
                style={{
                    textDecoration: 'underline',
                }}
                key={tag.id}>
                    <span>{` #${tag.tag.tag} `}</span>
                </Link>
            
            )
        })
    };

    const tags = props.tags && props.tags.length > 0 ? createTags() : null;

    return (
        <div style={{position: 'relative'}}>
            <p >
                <UserLink>
                <span>{props.username}</span>
                </UserLink> {props.text} {tags}
            </p>
            {isUsers ? <PostOptions id={props.commentId} style={{position: 'absolute', top:'0', right: '0', height:'100%'}}/> : null}
        </div>
        
    )
};

const Likes = ({likes, id}) => {
    
    return (
        <Reacts>
            {likes.length > 0 ?
                <p>Liked by 
                    <Link to={`/profile/${likes[0].user.username}`} 
                        style={{fontWeight: 'bold'}}> {likes[0].user.username}
                    </Link> 
                {likes.length > 1 ? 
                <span> and <Link to={`posts/${id}/likes`} style={{fontWeight: 'bold'}}> others </Link></span>
                :null}
                </p>
            : null}
        </Reacts>
    )
};



const PostOptions = props => {
    const [showModal, setShowModal] = useState(false);
    const context = useContext(UserContext);
    const history = useHistory();

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDelete = () => {
        if(props.post){
            deletePost(context.jwt, props.id).then(res => {
                console.log(res);
                if(res.status === 200){
                    window.location.reload();
                }
            });
        }else{
            deleteComment(props.id).then(res => {
                if(res.status === 200)
                window.location.reload();
            })
        }
        
    };

    const handlePostEditClick = () => {
        console.log('handle post edit click');
        console.log(history.location);
        // history.push(`/posts/edit/${props.id}`)
        history.push({pathname: '/posts/edit/', search: props.id});
        
    }

    

    
    return (
        <React.Fragment>
            <PostModal toggleModal={toggleModal} open={showModal} onPostDelete={handleDelete} onPostEditClick={handlePostEditClick} post={props.post || false}/>
            <OptionsContainer style={props.style ? props.style : null}>
                <NavItem fontSize={'30px'} onClick={toggleModal}>
                    <FontAwesomeIcon icon={faEllipsisH}/>
                </NavItem>
            </OptionsContainer>
        </React.Fragment>
    )
};

const PostModal = ({toggleModal, open, onPostDelete, onPostEditClick, post}) => {

    return (
        <React.Fragment>
            {open ? 
                ReactDOM.createPortal(
                    
                    <ModalContainer onClick={toggleModal}>
                        
                        <ModalBox onClick={(e) => e.stopPropagation()}>
                            <ModalButton onClick={onPostDelete}>Delete</ModalButton>
                            {post ? <ModalButton onClick={onPostEditClick}>Edit</ModalButton> :null}
                            <ModalButton onClick={toggleModal}>Cancel</ModalButton>
                        </ModalBox>
                    </ModalContainer>                    
                    , document.body
                )
            : null
            }
        </React.Fragment>
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
    }, []);

    console.log(post);
    return (
        <React.Fragment>
        {loaded ? 
            <Post 
            key={post.id} id={post.id} imageUrl={post.contentUrl} 
            text={post.text} created={post.createdAt} user={post.user}
            comments={post.comments} likes={post.postlikes}
        />
        : <div>fetching...</div>
        }
        </React.Fragment>
    )
}

export default Feed;