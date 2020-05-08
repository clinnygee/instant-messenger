import * as React from 'react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Back} from '../../../Reusable';
import {SearchResult} from '../../People/People';
import {useParams} from 'react-router-dom';

const PostLikes = ({posts}) => {
    const [likes, setLikes] = useState([]);
    const {id} = useParams();

    console.log(id);

    useEffect(() => {
        setLikes(getPostLikes());

    },[id]);

    const getPostLikes = () => {
        return (posts.find(post => {
            return post.id === id
        }).postlikes);
    };

    const createLikes = () => {
        return likes.map(like => {
            return (
                <SearchResult 
                    username={like.user.username}
                    image={like.user.profileImgUrl}
                    link={'/profile'}
                />
            )
        })
    }

    console.log(likes);

    const userWhoHasLiked = likes.length > 0 ? createLikes() : null;
    return (
        <React.Fragment>
            <Back />
            {userWhoHasLiked}
        </React.Fragment>
    )
};


export default PostLikes;