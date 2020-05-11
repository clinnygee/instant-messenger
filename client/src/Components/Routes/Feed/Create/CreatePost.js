import React, {useState, useContext, createRef} from 'react';
import styled from 'styled-components'
import {  useHistory} from 'react-router-dom';

import {UserContext} from '../../../../context';
import {uploadNewPost} from '../../../../API';
import {LoadingSymbol} from '../../../Reusable';

const CreatePost = props => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [submittable, setSubmittable] = useState(false);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const context = useContext(UserContext);
    const history = useHistory();
    const [awaiting, setAwaiting] = useState(false);

    const tagInputRef = createRef();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
        checkSubmittable();
        
    };

    const checkSubmittable = () => {
        setSubmittable(file && postBody);
    }

    const handleBodyInput = e => {
        setPostBody(e.target.value);
        checkSubmittable();

    };

    const handleTagInput = e => {
        setTag(e.target.value);
        
        if(e.target.value === ' '){
            tagInputRef.current.value = null;
        }
        const regExpTest = /([A-Z]|[a-z])\w+\s/        
        if(regExpTest.test(e.target.value) && tag.length > 0){
            console.log('space hit')
            createTag()
        }
    };

    const createTag = () => {
        console.log(tagInputRef)
        const newTags = tags.concat(tag);
        console.log(newTags);

        setTags(newTags);
        setTag('')
        tagInputRef.current.value = null;

    }

    // const handleTagKeypress = e => {
    //     const regExpTest = /([A-Z]|[a-z])\w+\s/
    //     console.log(e);
    //     if(regExpTest.test(e.target.value) && tag.length > 0){
    //         console.log('space hit')
    //         createTag()
    //     }
    // }

    const onPostUpload = e => {
        console.log('onPostUpload called')
        e.preventDefault();

        const post = new FormData();

        post.append('post-image', file);
        post.append('post-body', postBody);
        if(tags.length > 0){
            post.append('tags', tags);
        };
        setAwaiting(true);
        

        console.log(post.entries());

        uploadNewPost(context.jwt, post).then(res => {
            if(res.status === 200){
                setAwaiting(false);
                history.push('/posts');
            }
            // console.log(res);
        })
    };

    const createTagButtons = () => {

        return tags.map((tag, index )=> {
            return (
                
                    <Tag key={index} tag={tag} handleTagRemove={handleTagRemove} index={index}/>
                
            )
        })
    };

    const handleTagRemove = (index) => {

        

        let newTags = tags.slice();

        newTags.splice(index, 1);

        setTags(newTags);
    }

    const tagButtons = tags ? createTagButtons() : null;

    return (
        <React.Fragment>
            {awaiting ? <LoadingSymbol /> :
            <PostContainer>
                <PostImageContainer>
                    <PostImage src={fileUrl ? fileUrl : null}/>
                </PostImageContainer>
                <PostCreateForm>
                    <input type='file' onChange={handleFileChange} />
                    <Input placeholder='Add a description' onChange={handleBodyInput} />
                    <TagContainer>
                    {tagButtons}
                    </TagContainer>
                    
                    <Input placeholder='Enter some tags'  onChange={handleTagInput} ref={tagInputRef}/>
                    <PostCommentButton type='submit' disabled={!submittable} active={submittable} onClick={onPostUpload}>POST</PostCommentButton>
                </PostCreateForm>
            </PostContainer>            
            }
        </React.Fragment>
        
    )
};

const Tag = ({tag, handleTagRemove, index}) => {

    console.log(tag);
    console.log(index);

    const onTagRemove = (e) => {
        e.preventDefault()
        handleTagRemove(index);
    }

    return (
        <TagButton onClick={onTagRemove}>
            {tag}
        </TagButton>
    )
}

const PostContainer = styled.div`
    border-radius: 3px;
    border: 1px solid rgb(219,219,219);
    
    margin: 0px 0px 60px 0px;
    background-color: #fff;
    line-height: 1.4em;
`
const TagContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 8px;
`
const TagButton = styled.button`
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

const PostImageContainer = styled.div`
    width: 100%;
    height: 330px;
`

const PostImage = styled.img`
    width: 100%;
    height: 100%;
`

const PostCreateForm = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    opacity: 0.3;
    border: none;
    width: calc(100% - 33px);
    margin: 8px 8px;
    border-bottom: 1px solid rgb(219,219,219);

    &:focus {
        outline: none;
    }

`

const PostCommentButton = styled.button`
    border: none;
    background: #fff;
    color: ${({active}) => active ? 'rgb(0,149,246)' : 'rgba(0,149,246,.3)'};
    width: 33px;
    margin: 16px 0px 0px 0px;
    &:focus: {
        outline: none;
    }
`

export default CreatePost;