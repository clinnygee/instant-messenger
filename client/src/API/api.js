export const registerUser = (data) => {
    return fetch('/api/auth/register', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
}

export const logInUser = (data) => {
    return fetch('/api/auth/login', {
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
    return fetch('/api/user', {
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
    return fetch('/api/conversations', {
        method: 'get',
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token} `,
        }
    })
};

export const makeFriendRequest = ( token, name) => {
    return fetch(`/api/friends/add/${name}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
};

export const acceptFriendRequest = (token, id) => {
    return fetch(`/api/friends/accept/${id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    })
};

export const deleteFriendship = (token, id) => {
    return fetch(`/api/friends/delete/${id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const fetchFriendsData = token => {
    return fetch('/api/friends', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};

export const uploadProfilePhoto = (token, formData) => {

    return fetch('/api/profile/image', {
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
    return fetch('/api/posts/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    })
};

export const getAllPosts = (token) => {
    return fetch('/api/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
};

export const deletePost = (token, postId) => {
    console.log(postId);
    return fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        // body: JSON.stringify(postId),
    })
}

export const createPostComment = (token, comment, postId) => {
    console.log(JSON.stringify(comment));
    return fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        
    })
};

export const changePostLike = (token, postId) => {

    return fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    })
};

export const getProfileData = (token, username) => {
    return fetch(`/api/profile/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    })
};

export const getSinglePost = (token, id) => {
    return fetch(`/api/posts/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    })
};

export const getSearchResults = (token, searchTerm) => {
    return fetch(`/api/search/${searchTerm}`, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    })
};

export const getTagSearchResults = (token, searchTerm) => {
    return fetch(`/api/search/tags/${searchTerm}`,{
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    })
}