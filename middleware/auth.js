const jwt = require('jsonwebtoken');

const secret = (process.env.SECRET || 'instant-messenger');
const {User} = require('../database').models;

// Everything that comes through this middlewares req.username will be = to the username. duh

const withAuth = (req, res, next) => {
    console.log('withAuth');
    // console.log(req.headers.authorization.split(" "));
    // console.log(req.body);
    // const token = 
    // req.headers.token ||
    // req.body.token ||
    // req.query.token ||
    // req.headers['x-access-token'] ||
    // req.cookies.token;

    // comes through in the form of authorization: bearer ${token} ${username}

    // const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

    const username = req.header.authorization ? req.header.authorization.split(' ')[2] : null;


    // const _token = token.split("=");

    // console.log(_token);

    // console.log(token);
    console.log(req.cookies.jwt);

    // if(!token) {
    //     res.redirect('/');
    //     // res.status(401).send('Unauthorized: No Logged in user');
    // } else {
    //     console.log('token recieved');
    //     jwt.verify(token, secret, function(err, decoded){
    //         if(err){
    //             console.log(token);
    //             res.status(401).send('Unauthorized: No Logged in user');
    //         } else {
    //             console.log(decoded);
    //             User.findOne({where: {username: decoded.username}}).then(user=> {
    //                 if(user){
    //                     req.username = decoded.username;
    //                     res.cookie('jwt', token);
    //                     next();
    //                 }else{
    //                     res.status(401).json({error: 'Unauthorized: Invalid token'});
    //                 }
    //             })
    //             // perhaps we also need to store the password in the jwt,

    //             // console.log(decoded);
    //             // req.username = decoded.username;
                
    //             // console.log(decoded);
    //             // next();
    //         }
    //     })
    // }
    console.log(req.headers);
    if(!req.cookies.jwt) {
        // res.redirect('/');
        console.log('valid cookie not recieved');
        
        res.status(403).json({error: 'Unauthorized: No Logged in user'})
        // res.status(401).send('Unauthorized: No Logged in user');
    } else {
        console.log('req.cookies.jwt recieved');
        jwt.verify(req.cookies.jwt, secret, function(err, decoded){
            if(err){
                console.log('some error occured in jwt verify')
                console.log(req.cookies.jwt);
                res.status(401).send('Unauthorized: No Logged in user');
            } else {
                console.log('below is decoded ---------------------------------------------------------------------')
                console.log(decoded.exp);
                
                let current = new Date().getTime() / 1000;
                console.log(current)
                console.log('expiry ----------------------')
                // console.log(expiry.toUTCString());
                if(current < decoded.exp){
                User.findOne({where: {username: decoded.username}}).then(user=> {
                    if(user){
                        req.username = decoded.username;
                        res.cookie('jwt', req.cookies.jwt);
                        next();
                    }else{
                        res.status(401).json({error: 'Unauthorized: Invalid token'});
                    }
                })} else {
                    res.status(401).json({error: 'Expired JWT'});
                }
                
            }
        })
    }

};

module.exports = withAuth;