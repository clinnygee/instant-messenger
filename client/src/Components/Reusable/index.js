import * as React from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
    position: absolute;
    left: 8px;
    top: 8px;
    z-index: 999;
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

const RingRotation = keyframes`
  from {
      transform: rotate(0deg);

  }

  to {
      transform: rotate(360deg)
  }
`;

const LoadingRing = styled.div`
    
        display: inline-block;
        width: 80px;
        height: 80px;
      

  :after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #1e56b0 transparent #1e56b0 transparent;
    animation: ${RingRotation} 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingRingContainer = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
`



export const LoadingSymbol = (props) => {

    return (
        
            <LoadingRingContainer>
                <LoadingRing>

                </LoadingRing>
            </LoadingRingContainer>
            

        
    )
};

