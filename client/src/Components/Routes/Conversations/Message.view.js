import React, {useState, useContext} from 'react';
import {UserContext} from '../../../context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmile, faReply, faEllipsisH, faHeart, faThumbsUp, faThumbsDown, faSadCry, faLaugh} from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const MessageContainer = styled.div`
    width: 100%;
    
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: ${({user}) => user ? 'flex-end' : 'flex-start'};
    
    padding: 8px 16px 8px 16px;
`

const MessageItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 60%;
`
const MessageItem = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({user}) => user ? 'green' : 'blue'};
    border-radius: 16px;
    padding: 8px 8px 8px 8px;
`
const MessageContent = styled.p`
    color: #fff;
    font-size: 20px;
`

const Message = (props) => {
    const [showOptions, setShowOptions] = useState(false);
    const [displayReactions, setDisplayReactions] = useState(false);
    const context = useContext(UserContext)

    const changeShowOptions = () => {
        setShowOptions(!showOptions)
    };

    const changeDisplayReactions = () => {
        setDisplayReactions(!displayReactions);
    };

    const handleReactionClick = reaction => {
        context.sendWsReaction(props.id, reaction);
    }

    console.log(props.user);


    return (
        <React.Fragment>
            <MessageContainer user={props.user} onClick={changeShowOptions}>
                {displayReactions ? <Reaction onReactionClick={handleReactionClick}/> : null}
                <MessageItemContainer>
                    <MessageItem user={props.user}>
                        <MessageContent>
                            {props.content ? props.content : ' '}
                        </MessageContent>
                    </MessageItem>
                    {showOptions ? <Options displayReactions={changeDisplayReactions}/> : null}
                    
                </MessageItemContainer>
                {showOptions ? <DateDisplay date={props.date} /> : null}
                
            </MessageContainer>
        </React.Fragment>
        
    )
};

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    
`

const OptionsItem = styled.div`
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: rgb(220,222,225);
    margin: 8px 8px 8px 8px;

    &:hover{
        color: #000;
        background-color: rgb(220,222,225);
        clip-path: circle(50% at 50% 50%);
    }
`

const Options = (props) => {

    return (
        <OptionsContainer>
            <OptionsItem onClick={props.displayReactions}><FontAwesomeIcon icon={faSmile} /></OptionsItem>
            <OptionsItem><FontAwesomeIcon icon={faReply} /></OptionsItem>
            <OptionsItem><FontAwesomeIcon icon={faEllipsisH} /></OptionsItem>
        </OptionsContainer>
    )
};

const DateDisplay = (props) => {
    const dt = new Date(props.date);
    return (
        <p>{dt.toDateString()}</p>
    )
};

const ReactionContainer = styled.div`
    
    width: 200px;
    height: 50px;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
    
`

const ReactionIcon = styled.div`
    width: 30px;
    height: 30px;
    font-size: 20px;
`

const Reaction = props => {    

    return(
        <ReactionContainer>
            <ReactionItem icon={faHeart} reaction={'heart'} onReactionClick={props.onReactionClick}/>
            <ReactionItem icon={faThumbsUp} reaction={'thumbsUp'} onReactionClick={props.onReactionClick}/>
            <ReactionItem icon={faThumbsDown} reaction={'thumbsDown'} onReactionClick={props.onReactionClick}/>
            <ReactionItem icon={faLaugh} reaction={'laugh'} onReactionClick={props.onReactionClick}/>
            <ReactionItem icon={faSadCry} reaction={'cry'} onReactionClick={props.onReactionClick}/>
            
        </ReactionContainer>
    )
};

const ReactionItem = props => {

    const onReactionClick = () => {
        props.onReactionClick(props.reaction);
    }

    return (
        <ReactionIcon onClick={onReactionClick}>
            <FontAwesomeIcon icon={props.icon} />
        </ReactionIcon>
    )
}

export default Message;