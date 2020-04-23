import * as React from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    left: 8px;
    top: 8px;
`
const ChatLink = styled.div`
    height: 40px;
    width: 40px;
    font-size: ${({screenWidth}) => screenWidth ? `${screenWidth / 20}px` : '30px'};
    color: ${({submittable}) => submittable ? 'rgb(0,149,246)' : 'rgb(220,222,225)'};
    margin: 8px;
`

export const Back = props => {
    const history = useHistory();
    
    const handleBack = () => {
        history.goBack();
    }

    return (
    <Container>
        <ChatLink submittable={true} onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </ChatLink>
    </Container>
    )
};

