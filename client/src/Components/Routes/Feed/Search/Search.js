import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../../../context';

import {Post} from '../feed';

const Search = props => {
    const history = useHistory();
    const {tag} = useParams();
    const context = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    console.log(history);

    console.log(tag);

    useEffect(() => {
        console.log(context.token)
        console.log('calling Useeffect in Search')
        fetch(`/api/posts/search/${tag}`,{
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.jwt}`
        }
        }).then(res => res.json()).then(parsedJson => {
            console.log(parsedJson);
            let receivedPosts = parsedJson.map(posttag => {
                return (posttag.post)
            });
            setPosts(receivedPosts);
        })
    }, [tag]);

    console.log(posts);

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

    const DisplayPosts = posts.length > 0 ? createPosts() : null;

    return(
        <React.Fragment>
            {DisplayPosts}
        </React.Fragment>
    )
};

export default Search;