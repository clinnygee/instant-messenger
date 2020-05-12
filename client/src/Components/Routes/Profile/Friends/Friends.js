import * as React from 'react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Back} from '../../../Reusable';
import {SearchResult} from '../../People/People';
import {useParams} from 'react-router-dom';

const Friends = ({friendships}) => {

    console.log(friendships);
    

    const createFriendList = () => {
        return friendships.map(friend => {
            return (
                <SearchResult 
                    username={friend.user.username}
                    image={friend.user.profileImgUrl}
                    link={'/profile'}
                    key={friend.id}
                />
            )
        })
    }

    

    const friends = friendships.length > 0 ? createFriendList() : null;
    return (
        <React.Fragment>
            <Back />
            {friends}
        </React.Fragment>
    )
};

export default Friends;