
// const s3 = require('./aws-config');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-east-1' // region of your bucket
});
// 
// 
// import s3 from './aws-config';
const s3 = new aws.S3();


const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        // contentType: 'image/png',
        bucket: 'instant-messenger',
        
        // metadata: (req, file, cb) => {
        //     cb(null, {fileName: file.fieldname});
        // },
        key: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now().toString()+'.jpeg')
        }
    })
});

module.exports = upload;