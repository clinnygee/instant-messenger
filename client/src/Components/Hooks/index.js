import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';
import moment from 'moment';

const useIsLoggedInUser = dataId => {
    const context = useContext(UserContext)
    const [isUsers, setIsUsers] = useState(false);

    useEffect(() => {
        if(context.userData.id === dataId){
            setIsUsers(true);
        }
    });

    return isUsers;
};

const useHasUserLiked = likes => {
    
    const context = useContext(UserContext);
    const [hasLiked, setHasLiked] = useState(false);
    

    useEffect(() => {
        const userLike = likes.filter(like => {
            return like.userId === context.userData.id;
        });

        userLike.length > 0 ? setHasLiked(true) : setHasLiked(false);
    });

    return hasLiked;
};

const useIsUsersFriend = friendships => {
    const context = useContext(UserContext);
    const [isFriends, setIsFriends] = useState(false);

    useEffect(() => {
        const friends = friendships.filter(friendship => {
            return (context.userData.id === friendship.friendId)
        })

        friends.length > 0 ? setIsFriends(true) : setIsFriends(false)
    })

    return isFriends;
};

const useHasSentFriendRequest = friendrequests => {
    const context = useContext(UserContext);
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => {
        const request = friendrequests.filter(friendrequest => {
            console.log(context.userData.id)
            console.log(friendrequest)
            return (context.userData.id === friendrequest.friendrequestId)
        })

        request.length > 0 ? setHasRequested(true) : setHasRequested(false);
    })

    return hasRequested;
};

const useReceivedFriendRequest = id => {
    const context = useContext(UserContext);
    const [hasRequest, setHasRequest] = useState(false);

    

    useEffect(() => {
        const request = context.userData.friendrequests.filter(friendrequest => {
            
            return (id === friendrequest.friendrequestId)
        })
        
        request.length > 0 ? setHasRequest(true) : setHasRequest(false);
    })

    return hasRequest;
};

const useTimeElapsed = dt => {
    const [timeElapsed, setTimeElapsed] = useState('');

    useEffect(() => {
        
        let date = moment(dt),
        now = moment(),
        minutes = now.diff(date, "minutes"),
        hours = now.diff(date, "hours"),
        days = now.diff(date, "days"),
        weeks = now.diff(date, "weeks");

        console.log(now)

        let result = "";

        if(weeks){
            result += weeks + (weeks === 1 ? ' week' : ' weeks') + ' ago';
        } else if(days){
            result += days + (days === 1 ? ' day' : ' days') + ' ago';
        } else if(hours){
            result += hours + (hours === 1 ? ' hour' : ' hours') + ' ago';
        } else{
            result += minutes + (minutes === 1 ? ' minute' : ' minutes') + ' ago';
        }
        
        
        setTimeElapsed(result);
    })

    return timeElapsed;
}

export {useIsLoggedInUser, useHasUserLiked, useIsUsersFriend, useHasSentFriendRequest, useReceivedFriendRequest, useTimeElapsed};