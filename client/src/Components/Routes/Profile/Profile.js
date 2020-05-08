import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, NavLink, Redirect, useParams, useHistory} from 'react-router-dom';
import {uploadProfilePhoto, getProfileData, makeFriendRequest, acceptFriendRequest, deleteFriendship} from '../../../API';
import { useContext } from 'react';
import { UserContext } from '../../../context';
import { JsonWebTokenError } from 'jsonwebtoken';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styled from 'styled-components';
import { faSignOutAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useIsLoggedInUser, useIsUsersFriend, useHasSentFriendRequest, useReceivedFriendRequest } from '../../Hooks';

import {Back, LoadingSymbol} from '../../Reusable';

const Profile = props => {


    return (
        <Switch>

            <Route path='/profile/:username'>
                <UserProfile />
            </Route>
            
        </Switch>
    )
};

const FeedContainer = styled.div`
    width: 100vw;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;
    background: rgb(250,250,250);
    padding-top: 70px;
    padding-bottom: 60px;

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
const PostHeader = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 16px;
`

const PostHeaderImage = styled.div`
    width: ${({width}) => width ? `${width}` : '30px'};
    height: ${({height}) => height ? `${height}` : '30px'};
    clip-path: circle(40%);
    background-image: url(${({url}) => url ? `${url}` : 'https://picsum.photos/100'});
    background-size: ${({size}) => size ? `${size}` : '30px 30px'};
`

const ProfileHeaderItem = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
`

const ProfileTextBold = styled.h1`
      font-size: 1.3em;
`

const ProfileText = styled.p`
      opacity: 0.7;
`

const ProfileAbout = styled.div`
      width: 100%;
      padding: 16px 16px;
`



const UserProfile = props => {
    const [userData, setUserData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    let { username } = useParams();
    const context = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        getProfileData(context.jwt, username).then(userdata => {
            userdata.json().then(userdata => {
                console.log(userdata);
                setUserData(userdata);
                setLoaded(true);
                
            })
        })
    }, [history.location]);

    const createThumbnails = () => {
        return userData.posts.map(post => {
            return <PostThumbnail key={post.id} id={post.id} url={post.contentUrl}/>
        })
    }

    console.log(userData);

    let thumbnails = (userData && userData.posts.length > 0) ? createThumbnails() : null;


    

    return (
        <FeedContainer>
            <Switch>
                <Route exact path={'/profile/:username'}>
                {loaded ? 
            <React.Fragment>
                <PostHeader>
                    <Back />
                    {/* {userData.username === context.userData.username ? <LogOut /> : null} */}
                    <MessageOrLogOut isCurrentUser={userData.username === context.userData.username} username={userData.username}/>
                    <PostHeaderImage width={`80px`} height={'80px'} url={userData.profileImgUrl} size={'100px 100px'}></PostHeaderImage>
                    <ProfileHeaderItem>
                        <ProfileTextBold>{userData.posts.length}</ProfileTextBold>
                        <ProfileText>Posts</ProfileText>                        
                    </ProfileHeaderItem>
                    <ProfileHeaderItem>
                        <ProfileTextBold>{userData.friendships.length}</ProfileTextBold>
                        <ProfileText>Friends</ProfileText>                        
                    </ProfileHeaderItem>
                </PostHeader>
                <ProfileAbout>
                    <ProfileTextBold>{userData.username}</ProfileTextBold>
                <ProfileText>{userData.about}</ProfileText>
                </ProfileAbout>
                
                <ProfileButton 
                    friendrequests={userData.friendrequests}
                    friendships={userData.friendships}
                    id={userData.id}
                    username={userData.username}
                />
                <MessageButton
                    id={userData.id}
                    username={userData.username}
                />
                <ThumbnailContainer>
                    {thumbnails}
                </ThumbnailContainer>
            </React.Fragment>
                : null
            }
                </Route>
                <Route path={'/profile/:username/edit'}>
                    <ProfileEdit />
                </Route>
            </Switch>
            
            
        </FeedContainer>
    )
};

const ProfileButton = props => {
    // const currentUser = props.username;
    const context = useContext(UserContext);
    const sentFriendRequest = useHasSentFriendRequest(props.friendrequests);
    const receivedFriendRequest = useReceivedFriendRequest(props.id);
    const isFriend = useIsUsersFriend(props.friendships);
    const isCurrentUser = useIsLoggedInUser(props.id);

    // useEffect(() => {

    // });

    const handleFriendRequest = () => {
        makeFriendRequest(context.jwt, props.username).then(res => {
            console.log(res);
            if(res.status ===200){
                window.location.reload();
            }
        })
    };

    const handleAcceptFriendRequest = () => {
        let request = context.userData.friendrequests.filter(request =>{ return (props.id === request.friendrequestId)})
        console.log(request);
        acceptFriendRequest(context.jwt, request[0].id).then(res => {
            if(res.status === 200){
                context.initializeUserData().then(
                    window.location.reload()
                );
            }
            console.log(res);
        })
    };

    const handleRemoveFriend = () => {
        console.log(context.userData.friendships)
        console.log(props.id);
        // console.log(friendship.friendId)
        let friendships = context.userData.friendships.filter(friendship => {return (props.id === friendship.friendId)})
        deleteFriendship(context.jwt, friendships[0].id).then(res => {
            if(res.status === 200){
                context.initializeUserData().then(
                    window.location.reload()
                )
            }
        })
    }

    const renderButton = () => {
        if(isCurrentUser){
            return (
                <Link to={`/profile/${props.username}/edit`} style={{width: '100%', display: 'flex',}}>
                    <EditButton>
                        Edit Profile
                    </EditButton>
                 </Link >
            )
        }else if (isFriend){
            return (
            <EditButton onClick={handleRemoveFriend}>
                Delete Friend
            </EditButton>)
        } else if (receivedFriendRequest){
            return (
            <EditButton onClick={handleAcceptFriendRequest}>
                Accept Friend Request
            </EditButton>)
        }else if (sentFriendRequest){
            return (
            <EditButton>
                Pending Friend Request
            </EditButton>)
        } else {
            return(
            <EditButton onClick={handleFriendRequest}>
                Send Friend Request
            </EditButton>)
        }
    }

    return (
        <EditContainer>
            {renderButton()}
        </EditContainer>
    )
};

const MessageButton = props => {
    const isCurrentUser = useIsLoggedInUser(props.id);

    const renderButton = () => {
        if(isCurrentUser){
            return (
                null
            )
        } else {
            return(
                <Link to={{
                    pathname:`/conversations/${props.username}`,
                    search: props.username
                }} style={{width: '100%', display: 'flex'}}>
                <EditButton>Message</EditButton>
                </Link>
            )
        }
    }

    return (
        <React.Fragment>
            {renderButton()}
        
        
        </React.Fragment>
    )
}

const EditProfileHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Input = styled.input`
    opacity: 0.3;
    border: none;
    width: calc(100% - 33px);
    margin: 8px 8px;
    border-bottom: 1px solid rgb(219,219,219);
    font-size: 25px;

    &:focus {
        outline: none;
        opacity: 1;
    }

`
const ProfileForm = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const PostImageContainer = styled.div`
    width: 100%;
    height: 330px;
`

const PostImage = styled.img`
    width: 100%;
    height: 100%;
`
const PostCommentButton = styled.button`
    border: none;
    background: inherit;
    color: ${({active}) => active ? 'rgb(0,149,246)' : 'rgba(0,149,246,.3)'};
   
    font-size: 30px;
    margin: 16px 0px 0px 0px;
    &:focus: {
        outline: none;
    }
`

const ProfileEdit = props => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const context = useContext(UserContext);
    const [about, setAbout] = useState(null);
    const [submittable, setSubmittable] = useState(false);
    const [sending, setSending] = useState(false);
    const history = useHistory();

    

    const checkSubmittable = () => {
        setSubmittable(file && about);
    }

    const handleAboutInput = e => {
        setAbout(e.target.value);
        checkSubmittable();

    };

    const onPhotoUpload = (e) => {
        console.log(file);
        e.preventDefault();

        const formData = new FormData();

        formData.append('profile-image', file);
        formData.append('profile-about', about);


        
        // console.log(formData);
        setSending(true);
        uploadProfilePhoto(context.jwt, formData).then(res => {
            res.json().then(parsedJson => {
                console.log(parsedJson);
                context.initializeUserData();
                setSending(false);
                history.push(`/profile/${context.userData.username}`);
                
            })
        })
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        checkSubmittable();
        
    };

    return (
        <React.Fragment>
            {sending ? <LoadingSymbol /> :
            <React.Fragment>
            <EditProfileHeader>
                <Back />
                <PostHeaderImage width={`100px`} height={'100px'} url={context.userData.profileImgUrl} size={'120px 120px'}></PostHeaderImage>
            </EditProfileHeader>
            <ProfileForm>
                <label for='about'></label>
                <Input placeholder={context.userData.about.length > 1 ? context.userData.about : 'Enter an about'} onChange={handleAboutInput} id={'about'}/>
                <PostImageContainer>
                    <PostImage src={fileUrl ? fileUrl : context.userData.profileImgUrl}/>
                </PostImageContainer>
                <input type='file' onChange={handleFileChange} />
                <PostCommentButton active={submittable} onClick={onPhotoUpload} disabled={!submittable}>Submit</PostCommentButton>
            </ProfileForm>
            </React.Fragment >
            }
        </React.Fragment>
    )
}

const EditContainer = styled.div`
    width: 100%;
    display: flex;
`
const EditButton = styled.button`
    width: 80%;
    max-width: 300px;
    margin: 8px auto;
    border-radius: 3px;
    background: inherit;
    border: 1px solid rgb(219, 219, 219);
    color: rgb(110,110,110);
    padding: 8px;
    font-size: 1.1em;
    box-shadow: 4px 4px 10px -5px rgba(0,0,0,0.75);
    

    &:focus{
        outline: none;
    }
`

const ThumbnailContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`


const ThumbnailPostContainer = styled.div`
    width: 118px;
    height: 118px;
    margin: 4px 4px;
`

const ThumbnailPostImage = styled.img`
    width: 100%;
    height: 100%;
`


const PostThumbnail = props => {
    return (
        <Link to={`/posts/${props.id}`}>
            <ThumbnailPostContainer>
                <ThumbnailPostImage src={props.url}/>
            </ThumbnailPostContainer>
        </Link>
    )
};


const LogOutContainer = styled.div`
    position: absolute;
    right: 8px;
    top: 8px;
`
const ChatLink = styled.div`
    height: 40px;
    width: 40px;
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '30px'};
    color: ${({submittable}) => submittable ? 'rgb(0,149,246)' : 'rgb(220,222,225)'};
    margin: 8px;
`

const LogOut = props => {
    const history = useHistory();
    const context = useContext(UserContext);

    const handleLogOut = () => {
        context.logOut()
        history.replace('/');
    }

    return (
        <LogOutContainer onClick={handleLogOut}>
            <ChatLink submittable={true}>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </ChatLink>
        </LogOutContainer>
    )

};

const MessageOrLogOut = props => {

    return (
        <React.Fragment>
            {props.isCurrentUser ? 
            <LogOut /> 
            :
            <MessageLink username={props.username}/>
            }
        </React.Fragment>
    )
};

const MessageLink = props => {

    return (
        <LogOutContainer >
            <Link to={{
                pathname: `/conversations/${props.username}`,
                search: props.username
            }}>
                <ChatLink submittable={true}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </ChatLink>
            </Link>
            
        </LogOutContainer>
    )
}


export default Profile;