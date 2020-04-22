export const registerUser = (data) => {
    return fetch('/register', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}

export const logInUser = (data) => {
    return fetch('/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
};

export const fetchUserData = token => {
    console.log(token)
    return fetch('/user', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
};

export const fetchConversationData = ( token) => {
    console.log('fetch conversation data is called')
    return fetch('/conversations', {
        method: 'get',
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token} `,
        }
    })
};

export const makeFriendRequest = ( token, name) => {
    return fetch(`/friends/add/${name}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
};

export const acceptFriendRequest = (token, id) => {
    return fetch(`/friends/accept/${id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    })
};

export const deleteFriendship = (token, id) => {
    return fetch(`/friends/delete/${id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const fetchFriendsData = token => {
    return fetch('/friends', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const uploadProfilePhoto = (token, formData) => {

    return fetch('/profile/image', {
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            // 'Content-type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    })
};

export const uploadNewPost = (token, formData) => {
    return fetch('/posts/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    })
};

export const getAllPosts = (token) => {
    return fetch('/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
};

export const createPostComment = (token, comment, postId) => {
    console.log(JSON.stringify(comment));
    return fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        
    })
};

export const changePostLike = (token, postId) => {

    return fetch(`/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    })
};

export const getProfileData = (token, username) => {
    return fetch(`/profile/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    })
};

export const getSinglePost = (token, id) => {
    return fetch(`/posts/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    })
};

export const getSearchResults = (token, searchTerm) => {
    return fetch(`/search/${searchTerm}`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    })
}