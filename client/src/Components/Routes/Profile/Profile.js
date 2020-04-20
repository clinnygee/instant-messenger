import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, NavLink, Redirect, useParams} from 'react-router-dom';
import {uploadProfilePhoto, getProfileData} from '../../../API';
import { useContext } from 'react';
import { UserContext } from '../../../context';
import { JsonWebTokenError } from 'jsonwebtoken';

import styled from 'styled-components';

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

    useEffect(() => {
        getProfileData(context.jwt, username).then(userdata => {
            userdata.json().then(userdata => {
                console.log(userdata);
                setUserData(userdata);
                setLoaded(true);
                
            })
        })
    }, []);

    const createThumbnails = () => {
        return userData.posts.map(post => {
            return <PostThumbnail id={post.id} url={post.contentUrl}/>
        })
    }

    console.log(userData);

    let thumbnails = (userData && userData.posts.length > 0) ? createThumbnails() : null;


    

    return (
        <FeedContainer>
            {loaded ? 
            <React.Fragment>
                <PostHeader>
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
                    <ProfileText>Some About Text</ProfileText>
                </ProfileAbout>
                {userData.username === context.userData.username ? 
                    <EditContainer>
                        <Link to={`/profile/${username}/edit`} style={{width: '100%', display: 'flex',}}>
                        <EditButton>
                            Edit Profile
                        </EditButton>
                        </Link >
                    </EditContainer>

                : null
                }
                <ThumbnailContainer>
                    {thumbnails}
                </ThumbnailContainer>
            </React.Fragment>
                : null
            }
            
        </FeedContainer>
    )
};

const EditProfileHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Input = styled.input`
    opacity: 0.3;
    border: none;
    width: calc(100% - 33px);

    &:focus {
        outline: none;
    }
`
const ProfileForm = styled.form`
    width: 100%;
    display: flex;
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
    background: #fff;
    color: ${({active}) => active ? 'rgb(0,149,246)' : 'rgba(0,149,246,.3)'};
    width: 33px;
    margin: 16px 0px 0px 0px;
    &:focus: {
        outline: none;
    }
`

const ProfileEdit = props => {
    const [file, setFile] = useState(null);
    const context = useContext(UserContext);
    const [about, setAbout] = useState(null);
    const [submittable, setSubmittable] = useState(false);

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
        setTimeout(() => {
            console.log(formData.entries());
        })
        console.log(formData);
        uploadProfilePhoto(context.jwt, formData).then(res => {
            res.json().then(parsedJson => {
                console.log(parsedJson);
            })
        })
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files);
    }

    return (
        <React.Fragment>
            <EditProfileHeader>
                <PostHeaderImage width={`100px`} height={'100px'} url={userData.profileImgUrl} size={'120px 120px'}></PostHeaderImage>
            </EditProfileHeader>
            <ProfileForm>
                <Input value={context.userData.about} onChange={handleAboutInput}/>
                <PostImageContainer>
                    <PostImage src={fileUrl ? fileUrl : context.userData.profileImgUrl}/>
                </PostImageContainer>
                <input type='file' onChange={handleFileChange} />
                <PostCommentButton active={submittable}/>
            </ProfileForm>
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
}




// const Profile = props => {
//     const [file, setFile] = useState(null);
//     const context = useContext(UserContext);

//     const onPhotoUpload = (e) => {
//         console.log(file);
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append('profile-image', file);
//         setTimeout(() => {
//             console.log(formData.entries());
//         })
//         console.log(formData);
//         uploadProfilePhoto(context.jwt, formData).then(res => {
//             res.json().then(parsedJson => {
//                 console.log(parsedJson);
//             })
//         })
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//         console.log(e.target.files);
//     }
//     return (
//         <form>
//             <div>
//                 {/* <img src={fileUrl ? fileUrl : null}></img> */}
//             </div>
//             <input type='file' onChange={handleFileChange}>
//             </input>
//             <input type='submit' value='Upload' onClick={onPhotoUpload}/>
//         </form>
//     );

// };

export default Profile;