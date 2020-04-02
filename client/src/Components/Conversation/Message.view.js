import React from 'react';

import styled from 'styled-components';

const MessageContainer = styled.div`
    width: 100%;
    
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: ${({user}) => user ? 'flex-end': 'flex-start'};
    padding: 8px 16px 8px 16px;
`
const MessageItem = styled.div`
    height: 100%;
    max-width: 60%;
    background-color: ${({user}) => user ? 'green' : 'blue'};
    border-radius: 16px;
    padding: 8px 8px 8px 8px;
`
const MessageContent = styled.p`
    color: #fff;
    font-size: 20px;
`

const Message = (props) => {

    return (
        <MessageContainer user={props.user}>
            <MessageItem user={props.user}>
                <MessageContent>
                    {props.content ? props.content : ' '}
                </MessageContent>
            </MessageItem>
        </MessageContainer>
    )
}

export default Message;