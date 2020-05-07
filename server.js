const Sequelize = require('sequelize');
const express = require('express');
const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const withAuth = require('./middleware/auth');



require('dotenv').config();

console.log(process.env.SECRET_ACCESS_KEY);
console.log(process.env.ACCESS_KEY_ID);



const port = (8080);

const AuthRouter = require('./routes/Auth/Auth');
const PostsRouter = require('./routes/Posts/Posts');
const ProfileRouter = require('./routes/Profile/Profile');
const FriendsRouter = require('./routes/Friends/Friends');
const SearchRouter = require('./routes/Search/Search');


app.use(express.static(path.join(__dirname, '/client/build')));

app.use(bodyParser.urlencoded({extended: false,}));

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/api/posts', PostsRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api/friends', FriendsRouter);
app.use('/api/search', SearchRouter);
app.use('/api/auth', AuthRouter)

const {Op} = Sequelize;

const conn = require('./database').conn;
const {User, Conversation, Message, Reaction, Friendship, FriendRequest, Post, Comment, PostLike, Tag} = require('./database').models;
// conn.sync({logging: false, force: true});
conn.sync({logging: false});

// console.log(Conversation)

// const seedDb = require('./database/seeders/seed');
// seedDb();





app.get('/api/user', withAuth, (req, res) => {
    User.findOne(
        {where: 
            {
                username: req.username
            },
            attributes: {
                exclude: 'password'
            },
            include: [
                
                    {
                        model: Friendship,
                        include: [
                            {
                                model: User,
                                attributes: {exclude: ['password']}
                            }
                        ]
                        
                    },
                    {
                        model: FriendRequest,
                        include: [
                        {
                            model: User,
                            attributes: {exclude: 'password'}
                        }
                        ]
                    }
                
            ]
        }).then(user => {
            res.json(user);
        });
});


app.get('/api/conversations/:id', withAuth, (req,res) => {
    Conversation.findOne({where: {_id: req.params.id}, 
        include:[
            {model: Message},
            {
                model: User,
                as: 'user1',
                attributes: {
                  exclude: 'password'
                }
              },
            {
              model: User,
              as: 'user2',
              attributes: {
                exclude: 'password'
              }}
            ]}).then(conversation => {
        console.log(conversation)
        res.json(conversation);
    })
})



app.get('/api/conversations', withAuth, (req, res) => {
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
    });


// app.get('/profile/:id', (req, res) => {

// })

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});



server.listen(port);

