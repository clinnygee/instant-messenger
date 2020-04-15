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

export const fetchConversationData = ( token) => {
    return fetch('/conversations', {
        method: 'get',
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token} `,
        }
    })
};

export const makeFriendRequest = (name, token) => {
    return fetch(`/friends/add/${name}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
};

export const acceptFriendRequest = (id, token) => {
    return fetch(`/friends/accept/${id}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    })
};

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
    return fetch('/feed/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
    })
};

export const getAllPosts = (token) => {
    return fetch('/feed', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}