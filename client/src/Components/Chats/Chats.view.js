import React from 'react';

import styled from 'styled-components';

const ConversationContainer = styled.div`
    width: 90%;
    height: 84px;
    display: flex;
    flex-direction: row;
    padding: 8px 8px 8px 8px;
    line-height: 1.7em;
    border-radius: 16px;
    background-color: ${({open}) => open ? `rgb(238,240,243)` : `#fff`}
`

const ConversationImage = styled.div`
    width: 100px;
    height: 100%;
    clip-path: circle(40%);
    background-image: url(https://picsum.photos/100)
`

const ConversationContent = styled.div`
    width: calc(100% - 100px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px 8px 8px 8px;

`

const ConversationHeader = styled.h1`
    font-size: 21px;
`

const ConversationPreview = styled.p`
    color: rgb(153,153,153);
    font-size: 17px;
`

const Chat = (props) => {


    return (
        <ConversationContainer open={props.open}>
            <ConversationImage />
            <ConversationContent>
                <ConversationHeader>
                    Gym Rats
                </ConversationHeader>
                <ConversationPreview>
                    Hey boys.. Sunday
                </ConversationPreview>
            </ConversationContent>
        </ConversationContainer>
    )
};

export default Chat;