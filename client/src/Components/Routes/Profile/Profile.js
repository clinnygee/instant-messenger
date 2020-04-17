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
                <ThumbnailContainer>
                    {thumbnails}
                </ThumbnailContainer>
            </React.Fragment>
                : null
            }
            
        </FeedContainer>
    )
};

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