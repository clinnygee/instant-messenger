import React, { useState, useEffect, createRef } from 'react';
import { useHistory } from 'react-router';

import {Tag} from '../Create/CreatePost'
import {LoadingSymbol, Back} from '../../../Reusable'

import { Input, PostCommentButton,  
    PostContainer, 
     PostImageContainer, PostImage,
     TagContainer, TagButton, PostCreateForm
    
} from '../styled';

const EditPost = (props) => {
    
    const history = useHistory();
    const post = useFindPost({posts: props.posts, id: history.location.search});
    const [awaiting, setAwaiting] = useState(true);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [postBody, setPostBody] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [submittable, setSubmittable] = useState(false);

    const tagInputRef = createRef();
    
    useEffect(() => {
        setPostBody(post ? post.text : null);
        setImageUrl(post ? post.contentUrl : null);
        setTags(initializeTags(post ? post.posttags : null));

        setAwaiting(false);
    }, [post]);


    const checkSubmittable = () => {
        setSubmittable(postBody !== post.body);
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

    };

    const initializeTags = (posttags) => {
        if(!posttags){
            return []
        }
        let tags = posttags.map(posttag => {
            return posttag.tag.tag
        });
        console.log(tags);
        return tags;

    }

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
    };

    const handlePostEdit = (e) => {
        e.preventDefault();
        let editBody = JSON.stringify({postBody: postBody, tags: tags});
        fetch(`/api/posts/edit/${post.id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: editBody
        }).then(res => {
            if(res.status === 200){
                history.goBack();
            }
        })
    }

    
    let tagButtons = !awaiting ? createTagButtons() : null;
    
    console.log(post);
    return (
        <React.Fragment>
            <Back />
            {awaiting ? <LoadingSymbol /> :
            <PostContainer>
                <PostImageContainer>
                    <PostImage src={imageUrl}/>
                </PostImageContainer>
                <PostCreateForm>
                    
                    <Input placeholder='Add a description' onChange={handleBodyInput} value={postBody ? postBody : post.text} />
                    <TagContainer>
                    {tagButtons}
                    </TagContainer>
                    
                    <Input placeholder='Enter some tags'  onChange={handleTagInput} ref={tagInputRef}/>
                    <PostCommentButton type='submit' disabled={!submittable} active={submittable} onClick={handlePostEdit}>UPDATE</PostCommentButton>
                </PostCreateForm>
            </PostContainer>            
            }
        </React.Fragment>
        
    );
};

const useFindPost = ({posts, id}) => {
    const [post, setPost] = useState(null);

    id = id.split('?')[1];
    

    useEffect(() => {
        const foundPost = posts.filter(post => {
            
            return post.id === id
        
        });
        
        setPost(foundPost[0]);
        
    }, [posts]);

    return post;
}

export default EditPost;