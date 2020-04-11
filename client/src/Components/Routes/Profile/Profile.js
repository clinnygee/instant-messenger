import React, { useState } from 'react';
import {uploadProfilePhoto} from '../../../API';
import { useContext } from 'react';
import { UserContext } from '../../../context';

const Profile = props => {
    const [file, setFile] = useState(null);
    const context = useContext(UserContext);

    const onPhotoUpload = (e) => {
        console.log(file);
        e.preventDefault();

        const formData = new FormData();

        formData.append('profile-image', file);
        setTimeout(() => {
            console.log(formData.entries());
        })
        console.log(formData);
        uploadProfilePhoto(context.jwt, formData).then(res => {

        })
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e.target.files);
    }
    return (
        <form>
            <div>
                {/* <img src={fileUrl ? fileUrl : null}></img> */}
            </div>
            <input type='file' onChange={handleFileChange}>
            </input>
            <input type='submit' value='Upload' onClick={onPhotoUpload}/>
        </form>
    );

};

export default Profile;