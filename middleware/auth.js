const jwt = require('jsonwebtoken');

const secret = (process.env.SECRET || 'expense-tracker');

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

    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;


    // const _token = token.split("=");

    // console.log(_token);

    console.log(token);

    if(!token) {
        res.redirect('/');
        // res.status(401).send('Unauthorized: No Logged in user');
    } else {
        console.log('token recieved');
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                console.log(token);
                res.status(401).send('Unauthorized: No Logged in user');
            } else {
                console.log(decoded);
                req.username = decoded.username;
                
                console.log(decoded);
                next();
            }
        })
    }

};

module.exports = withAuth;