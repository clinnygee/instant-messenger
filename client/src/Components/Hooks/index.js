import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';

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
}

export {useIsLoggedInUser, useHasUserLiked};