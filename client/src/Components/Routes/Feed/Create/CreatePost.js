import React, {useState, useContext, createRef} from 'react';
import styled from 'styled-components'
import {  useHistory} from 'react-router-dom';

import {UserContext} from '../../../../context';
import {uploadNewPost} from '../../../../API';
import {LoadingSymbol} from '../../../Reusable';

import { Input, PostCommentButton,  
    PostContainer, 
     PostImageContainer, PostImage,
     TagContainer, TagButton, PostCreateForm
    
} from '../styled';

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
                props.requestUpdate();
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

export const Tag = ({tag, handleTagRemove, index}) => {

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








export default CreatePost;