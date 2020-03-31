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

export const fetchConversationData = (username, token) => {
    return fetch('/conversations', {
        method: 'get',
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token} ${username}`,
        }
    })
}