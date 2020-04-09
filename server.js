const Sequelize = require('sequelize');
const express = require('express');
const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');
const withAuth = require('./middleware/auth');

const bcrypt = require('bcrypt');
const secret = (process.env.SECRET || 'instant-messenger');
const saltRounds = 10;


require('dotenv').config();



const port = (process.env.PORT || 8080);


app.use(express.static(path.join(__dirname, '/client/build')));

app.use(bodyParser.urlencoded({extended: false,}));

app.use(cookieParser());

app.use(bodyParser.json());

const {Op} = Sequelize;

const conn = require('./database').conn;
const {User, Conversation, Message, Reaction, Friendship, FriendRequest} = require('./database').models;
conn.sync({logging: false, force: true});
// conn.sync({logging: false});

// console.log(Conversation)

const seedDb = require('./database/seeders/seed');
seedDb();



app.post('/login', (req,res) => {
    const {username, password} = req.body;

    User.findOne({where: {username: username}}).then(user => {
        if(!user){
            res.status(400).send('User does not exist, Please sign up.')
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    res.status(400).send('Incorrect Password')
                } else {
                    const payload = {username};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '24h',
                    })
                    res.json({token: token});
                }
                
            })
        }
    });
});

app.post('/register', (req, res) => {
    const {username, password} = req.body;

    console.log(username, password);

    console.log(User);

    bcrypt.hash(password, saltRounds, (err, hash) => {
        User.create({
            username: username,
            password: hash,
        }).then((user) => {
            console.log(user);
        })
    });

    
    // add logic here to create first friendship, send some messages in it etc.
    // The messages should explain how the app works


    res.status(200).send('Hit the Register route');
});

app.get('/conversations',withAuth, (req, res) => {
    // console.log(req.headers.authorization);
    console.log('username: ------------------------------------')
    console.log(req.username);

    User.findOne({where: {username: req.username}}).then(user => {
        if(!user){
            res.status(400).send('User not found')
        }else{
            Conversation.findAllConversations(user.id).then(conversations => res.json(conversations))
            // console.log(user);
            // Conversation.findAll({where: {
            //     [Op.or]: [{user1Id: user.id}, {user2Id: user.id}]
            // }}).then(conversations => {
            //     Message.findAll({where})
            // });
            // Conversation.find
        }
    })
});

const getKeyByValue = (object, value) => {
    // return Object.keys(object.find(key => {object[key] === value}))
    if(object.hasOwnProperty(value) ){
        return object[value];
    } else {
        return null;
    }
    
};

const clients = {};

const connection = io
    .of('/connection')
    .on('connection', (socket) => {
        // add socket to the list of clients
        // console.log('this is "socket"')
        // console.log(socket)
        socket.emit('a message', {
            that: 'only',
            '/chat': 'will get'
        });
        // first, add message to the DB,
        // then, find if the reciever of the message is a connected client,
        // if so, send the message to them
        socket.on('message', msg => {

            let message = JSON.parse(msg);
            // add message to the db
            User.findOne({where: {username: socket.username}}).then(user1 => {
                User.findOne({where:{ username: message.receiver}}).then(user2 => {
                    Message.createMessage(message.text, user1.dataValues, user2.dataValues).then(msg => {
                        socket.emit('message',  JSON.stringify(msg));
                        // find if message recipient is cept in the clients object,
                        // and send the message to them
                        let receiver = getKeyByValue(clients, message.receiver);

                        if(receiver){
                            receiver.emit('message', JSON.stringify(msg));
                        }
                        console.log(msg);
                    })
                })
            })
            
            console.log(msg);

            


            // if successfully added to db, emit('response')
            // so that user knows it was delivered

        });
        // a reaction is recieved in a JSON message containing and array with [0] as the message, [1] as the message
        socket.on('reaction', reaction => {
            console.log(reaction);
            const reactionObject = JSON.parse(reaction);

            User.findOne({where: {username: reactionObject.user}}).then(user => {
                Reaction.createReaction(reactionObject.reaction, reactionObject.messageId, user).then(reaction => {
                    console.log(reaction);
                    socket.emit('reaction', JSON.stringify(reaction));
                })
            })
            // Reaction.createReaction(reactionObject.reaction, reactionObject.messageId, reactionObject.user)
        });

        socket.on('typing', conversation => {

        });

        socket.on('stop-typing', conversation => {

        })
        // add socket to the list of clients
        // socket is stored with username: socket as the pair
        socket.on('user-details', details => {
            clients[`${details}`] = socket;
            // console.log(`this is CLIENTS object`)
            // console.log(clients);
            // console.log(`this is clients[details]`)
            // console.log(clients[`${details}`]);
            socket.username = `${details}`;
            // console.log(socket.username);
        });
        // find the socket in the list of clients and remove it
        socket.on('disconnect', () => {
            delete clients[socket.username];
            
            console.log(clients)
            
        });
        // this send a message to EVERYONE on the connections.
        connection.emit('a message', {
            everyone: 'in',
            '/chat': 'will get'
        })
    })
    // connection.on('message', msg => {
    //     console.log(msg)
    // });

    // console.log(io);
// get ALL friends data, friendships, friendRequests
app.get('/friends', withAuth, (req, res) => {
    // find all friends, include: posts
    // find all friend requests
    // User.findOne({where: {username: req.username,}}).then(user => {
    //     FriendRequest.findAllRequests(user.id).then(requests => {
    //         console.log(requests);
    //         res.json(requests);
    //     })
    // });

    User.findOne(
        {where: {username: req.username},
        include: [
            {model: FriendRequest, as: 'friendrequests',
            include:[
                {model: User,
                 }
            ]}]})
            .then(userData => {
            res.json(userData)
        });

    // User.findOne(
    //     {where: {username: req.username}}
    //     )
    //     .then(user => {
    //     FriendRequest.findAll(
    //         {where: {userId: user.id}, include: [
    //         {model: User,
    //         where: {
    //             id: {
    //                 [Op.col]: `friendrequest.friendrequestId`
    //             }
    //         }}
    //     ]})}).then(friendrequests => {
    //         console.log(user);
    //         console.log(friendrequests)
    //     });
    // });

});

app.post('/friends/add/:id', withAuth, (req, res) => {
    console.log(req.username);
    User.findOne({where: {username: req.username}}).then(requester => {
        User.findOne({where: {username: req.params.id}}).then(requestee => {
            FriendRequest.findOrCreateRequest(requester, requestee).then(request => {
                console.log(request);
                res.status(200).send();
            })
        })
    })
});

app.post('/friends/delete/:id', (req, res) => {

});

app.post('/friends/accept/:id', withAuth, (req, res) => {
    console.log(req.params);
    
    FriendRequest.findOne({where: {id: req.params.id}}).then(request => {
        FriendRequest.accept(request).then(friendship => {
            res.json(friendship)
        })
    })
});

app.get('posts', withAuth, (req,res) => {

});

app.post('posts/create', withAuth, (req, res) => {

});

app.delete('/posts/:id', withAuth, (req,res) => {

});

app.put('/posts/:id', withAuth, (req, res) => {

})

app.post('/posts/:id/comments', withAuth, (req,res) => {

});

app.post

server.listen(port);

