import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Cropper = props => {
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


    return (
        <React.Fragment>
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
            <input type='file' onChange={onSelectFile} />
        </React.Fragment>
    );
};

Cropper.propTypes = {
    
};

export default Cropper;