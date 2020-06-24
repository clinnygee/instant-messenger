import styled from 'styled-components';

export const PostComment = styled.section`
    padding: 0 16px;
    height: 55px;
    display: flex;
    border-top: 1px solid rgb(219,219,219);
`

export const PostCommentForm = styled.form`
    display: flex;
    flex-direction: row;
    
    display: flex;
    width: calc(100% - 32px);
    
    
`

export const Input = styled.input`
    height: 30px;
    opacity: 0.3;
    border: none;
    // width: calc(100% - 33px);
    width: 100%;

    &:focus {
        outline: none;
        opacity: 1;
    }
`

export const PostCommentButton = styled.button`
    margin: 16px;
    border: none;
    background: #fff;
    color: ${({active}) => active ? 'rgb(0,149,246)' : 'rgba(0,149,246,.3)'};
    // width: 33px;
    // margin: 16px 0px 0px 0px;
    &:focus: {
        outline: none;
    }
    &:hover:{
        cursor: pointer;
    }
`

export const UserLink = styled.a`
    font-weight: bold;
`

export const NavItem = styled.div`
    height: 100%;
    width: 10%;
    font-size: ${({fontSize}) => fontSize ? `${fontSize}` : '25px'};
    color: ${({active}) => active ? 'black' : 'rgb(220,222,225)'};
`

export const LikeItem = styled.div`
    height: 100%;
    width: 10%;
    font-size: ${({fontSize}) => fontSize ? `${fontSize}` : '25px'};
    color: ${({liked}) => liked ? 'red' : 'rgb(220,222,225)'};
`

export const CommentContainer = styled.div`
    margin: 0px 16px;
`

export const Time = styled.time`
    color: rgb(142,142,142);
`

export const PostContainer = styled.div`
    border-radius: 3px;
    border: 1px solid rgb(219,219,219);
    
    margin: 0px 0px 60px 0px;
    background-color: #fff;
    line-height: 1.4em;
`

export const PostHeader = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 16px;
`

export const ConversationHeader = styled.h1`
    font-weight: bold;
    font-size: 14px;
    padding: 0px 0px 0px 16px;
`

export const PostHeaderImage = styled.div`
    width: 30px;
    height: 30px;
    clip-path: circle(40%);
    background-image: url(${({url}) => url ? `${url}` : 'https://picsum.photos/100'});
    background-size: 30px 30px;    
`

export const PostImageContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
`

export const PostImage = styled.img`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`

export const ReactionContainer = styled.section`
    padding: 0 16px;
    height: 40px;
`

export const Reacts = styled.section`
    padding: 0 16px;
`

export const FeedContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;
    background: rgb(250,250,250);
    padding-top: 70px;
    padding-bottom: 70px;

    &::-webkit-scrollbar {
        display: none;
      }

`
export const FeedNav = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 999;
`

export const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.65);
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ModalBox = styled.div`
    width: 100%;
    max-width: 400px;
    
    background-color: #fff;
    border-radius: 12px;

    
`

export const ModalButton = styled.button`
    width: 100%;
    border: none;
    border-top: 1px solid rgb(219,219,219);
    height: 39px;
    background-color: #fff;

    &:first-child{
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        border-top: none;
    }

    &:last-child{
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
    }

    &:focus{
        outline:none;
    }

`

export const OptionsContainer = styled.div`
    height: auto;
    width: 50px;
    margin-left: auto;
    padding: 0px 8px;
    
`

// FOR CREATE AND EDIT

export const TagContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 8px;
`
export const TagButton = styled.button`
    border-radius: 8px;
    background-color: rgba(0, 149,246,.3);
    color: rgb(0,149,246);
    border: none;
    height: 20px;
    font-size: 15px;
    margin-right: 8px;
    &:focus{
        outline: none;
    }
    
`


export const PostCreateForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`