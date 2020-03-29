import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${({mobile}) => mobile ? `100vw` : `30%`};
    height: ${({mobile}) => mobile ? `85%` : `100%`};
    background-color: green;
`

const People = (props) => {

    return (
        <Wrapper mobile={props.mobile}>
            People Component
        </Wrapper>
    )
}

export default People;
