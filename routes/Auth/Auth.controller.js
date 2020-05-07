const {User, Friendship, FriendRequest} = require('../../database').models;
const bcrypt = require('bcrypt');
const secret = (process.env.SECRET || 'instant-messenger');
const saltRounds = (process.env.SALTROUNDS || 10);
const jwt = require('jsonwebtoken');

const AuthController = {
    // registers the user, and creates friendships between the new user and the 5 original seeder profiles.
    register(req,res){
        const {username, password} = req.body;

        console.log(username, password);

        console.log(User);
        User.findOne({where: {username: username}}).then(user => {
            if(user){
                console.log('User Found');
                res.status(400).json({error: 'User Already Exists'});
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    User.create({
                        username: username,
                        password: hash,
                    }).then((user) => {
                        Promise.all([
                            User.findOne({where: {username: 'Heart'}}),
                            User.findOne({where: {username: 'Fire'}}),
                            User.findOne({where: {username: 'Wind'}}),
                            User.findOne({where: {username: 'Water'}}),
                            User.findOne({where: {username: 'Earth'}}),
                        ]).then(([heart,fire,wind,water,earth]) => {
                            Promise.all([
                                FriendRequest.findOrCreateRequest(user, heart),
                                FriendRequest.findOrCreateRequest(user, fire),
                                FriendRequest.findOrCreateRequest(user, wind),
                                FriendRequest.findOrCreateRequest(user, water),
                                FriendRequest.findOrCreateRequest(user, earth),
                            ]).then(([heartFriendRequest, fireFriendRequest, windFriendRequest, waterFriendRequest, earthFriendRequest]) => {
                                Promise.all([
                                    Friendship.createFriendship(heartFriendRequest),
                                    Friendship.createFriendship(fireFriendRequest),
                                    Friendship.createFriendship(windFriendRequest),
                                    Friendship.createFriendship(waterFriendRequest),
                                    Friendship.createFriendship(earthFriendRequest),
                                ])
                            })
                        }).then(initalizedUserData => {
                            const payload = {username};
                            const token = jwt.sign(payload, secret, {
                                expiresIn: '24h'
                            });
                            console.log(token);
                            res.cookie('jwt', token);
                            res.json({token: token});
                        })
                        // console.log(user);
                        // const payload = {username};
                        // const token = jwt.sign(payload, secret, {
                        //     expiresIn: '24h'
                        // });
                        // console.log(token);
                        // res.cookie('jwt', token);
                        // res.json({token: token});
                        // res.status(200).send('Success!')
                    })
                });
            }
        })
    },
    logIn(req,res){
        const {username, password} = req.body;

    console.log(password);

    User.findOne({where: {username: username}}).then(user => {
        if(!user){
            res.status(400).json({error: 'User does not exist'})
        } else {
            console.log(user);
            bcrypt.compare(password, user.password, (err, result) => {
                if(!result){
                    res.status(401).json({error: 'Incorrect Password'})
                } else {
                    const payload = {username};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h',
                    });
                    res.cookie('jwt', token);
                    res.json({token: token});
                }
                
            })
        }
    });
    },
    checkToken(req,res){
        console.log(req.username);
        if(req.username){
            res.status(200).send('User is authorized');
        } else {
            res.status(400).send('User is unauthorized')
        };
    }
};

module.exports = AuthController;