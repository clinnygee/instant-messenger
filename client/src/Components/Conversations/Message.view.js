import React from 'react';

import styled from 'styled-components';

const MessageContainer = styled.div`
    width: 100%;
    min-height: 68px;
    display: flex;
    flex-direction: row;
    justify-content: ${({user}) => user ? 'flex-end': 'flex-start'};
    padding: 8px 16px 8px 16px;
`
const Message = styled.div`
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

const MessageItem = (props) => {

    return (
        <MessageContainer user={props.user}>
            <Message user={props.user}>
                <MessageContent>
                    {props.content ? props.content : ' '}
                </MessageContent>
            </Message>
        </MessageContainer>
    )
}

export default MessageItem;