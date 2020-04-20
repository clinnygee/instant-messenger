import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';

const useIsLoggedInUser = dataId => {
    const context = useContext(UserContext)
    const [isUsers, setIsUsers] = useState(false);

    useEffect(() => {

    });

    return isUsers;
}