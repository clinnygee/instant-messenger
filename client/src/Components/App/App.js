import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import Authentication from '../Authentication'

import {UserProvider, UserConsumer} from '../../context';
import Container from '../Container';

const GlobalStyle = createGlobalStyle`
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
  }
  p{
    rgb(38,38,38);
  }
`

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: blue;
  display: flex;
  flex-direction: row;
`


function App() {

  return (
    <UserProvider>
      <UserConsumer>{
        value => (
          <AppWrapper>
            <GlobalStyle />
            {value.authenticated ? <Container /> : <Authentication />}
            {/* <Conversations context={value}/> */}
            {/* <People /> */}
          </AppWrapper>
        )}   
      </UserConsumer>
    </UserProvider>
      
    
    
  )
}

export default App;
