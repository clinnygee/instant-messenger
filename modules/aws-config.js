const aws = require('aws-sdk');


// aws.config.update({
//     // Your SECRET ACCESS KEY from AWS should go here,
//     // Never share it!
//     // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     // Not working key, Your ACCESS KEY ID from AWS should go here,
//     // Never share it!
//     // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     region: 'us-east-1' // region of your bucket
// });

console.log(aws);

const s3 = aws.s3({// Your SECRET ACCESS KEY from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    // Not working key, Your ACCESS KEY ID from AWS should go here,
    // Never share it!
    // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-east-1' // region of your bucket
});

module.exports = s3;