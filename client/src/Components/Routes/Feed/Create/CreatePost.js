import React, {useState, useContext, createRef, useRef, useCallback} from 'react';
import styled from 'styled-components'
import {  useHistory} from 'react-router-dom';

import {UserContext} from '../../../../context';
import {uploadNewPost} from '../../../../API';
import {LoadingSymbol} from '../../../Reusable';
import Cropper from './Cropper';

import { Input, PostCommentButton,  
    PostContainer, 
     PostImageContainer, PostImage,
     TagContainer, TagButton, PostCreateForm
    
} from '../styled';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const CreatePost = props => {
    const [postBody, setPostBody] = useState(null);
    const [submittable, setSubmittable] = useState(false);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const context = useContext(UserContext);
    const history = useHistory();
    const [awaiting, setAwaiting] = useState(false);

    const tagInputRef = createRef();

    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    //     setFileUrl(URL.createObjectURL(e.target.files[0]));
    //     checkSubmittable();        
    // };

    const checkSubmittable = () => {
        setSubmittable(croppedImgFile && postBody);
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
    const [img, setImg] = useState();
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({unit: `px`, width: 500, aspect: 1.91/1});
    const [croppedImg, setCroppedImg] = useState();
    const [croppedImgFile, setCroppedImgFile] = useState();
    const[width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            let image = new Image();
            image.src = reader.result;
            
            image.onload = () => {
                // get the maximum width of the image to be displayed
                let maxWidth = window.innerWidth > 600 ? 580 : window.innerWidth - 20;

                // now find what % the width of the image has to change
                let reductionPercent = maxWidth / image.width;

                console.log(reductionPercent)

                setHeight(image.height * reductionPercent);
                setWidth(image.width * reductionPercent);
                console.log(image.height);
                console.log(image.width);
            }
            setImg(reader.result)
            });
          reader.readAsDataURL(e.target.files[0]);
        }
      };

    const onLoad = useCallback(img => {
        imgRef.current = img;
    }, []);

    const makeImageCrop = async crop => {
        if(imgRef.current && crop.width && crop.height){
            createCrop(imgRef.current, crop, 'newFile.jpeg');
        }
    }

    const createCrop = async (image,crop, fileName) => {
        console.log(image);
        console.log(fileName);
        console.log(crop);
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(croppedImg);
            setCroppedImg(window.URL.createObjectURL(blob));
            setCroppedImgFile(blob);
            console.log(croppedImg);
          }, 'image/jpeg');
        });
    };

    

    const onPostUpload = e => {
        console.log('onPostUpload called')
        e.preventDefault();

        const post = new FormData();

        post.append('post-image', croppedImgFile);
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
                {/* <PostImageContainer>
                    <PostImage src={fileUrl ? fileUrl : null}/>
                </PostImageContainer> */}
                <PostCreateForm>
                    <input type='file' onChange={onSelectFile} />
                    <ReactCrop 
                        src={img}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={makeImageCrop}
                        imageStyle={{
                            width: `${width ? `${width}px` : 'auto'}`,
                            height: `${height ? `${height}px` : 'auto'}`
                        }}
                    />
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