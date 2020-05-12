import React, { useEffect, useState } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import Authentication from '../Authentication';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import {UserProvider, UserConsumer} from '../../context';
import Container from '../Container';

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    font-family: "Comic Sans MS", cursive, sans-serif;
  }
  p{
    rgb(38,38,38);
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`

const AppWrapper = styled.div`
  height: ${(props) => props.vh ? `${props.vh * 100}px` : '100vh'};
  width: 100vw;
  background-color: blue;
  display: flex;
  flex-direction: row;
`


function App() {
  const [vh, setVh] = useState(null);

  useEffect(() => {
    setVh(window.innerHeight * .01);
    // console.log(vh)
    window.addEventListener('resize', checkVh);
    return () => {
      window.removeEventListener('resize', checkVh)
    }
  }, []);

  const checkVh = () => {
    setVh(window.innerHeight * .01);
    
  };
  // console.log(vh * 100);
  // console.log(window.innerHeight)
  // console.log(vh)

  return (
    <Router>
      <UserProvider>
        {/* <Route path='/'> */}
        <UserConsumer>{
          value => (
            <AppWrapper vh={vh}>
              <GlobalStyle />
              {/* {value.authenticated ? <Container /> : <Authentication />} */}
              
               <Container />
              {/* <Conversations context={value}/> */}
              {/* <People /> */}
            </AppWrapper>
          )}   
        </UserConsumer>
        {/* </Route> */}
      </UserProvider>
    </Router>
    
    
  )
}

export default App;
