const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const secret = (process.env.SECRET || 'instant-messenger');
const saltRounds = 10;


require('dotenv').config();


const app = express();
const port = (process.env.PORT || 8080);


app.use(express.static(path.join(__dirname, '/client/build')));

app.use(bodyParser.urlencoded({extended: false,}));

app.use(cookieParser());

app.use(bodyParser.json());

const conn = require('./database').conn;
const {User, Conversation, Message} = require('./database').models;
conn.sync({force: true});
// const sequelize = new Sequelize(
//     'postgres://clinnygee:cCxG0DxZ@127.0.0.1:5432/instant-messenger'
// );

// const User = sequelize.import('./database/models/user');

// User.sync({force: true});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection to DB has been estsablished successfully');
//     })
//     .catch(err => {
//         console.log('unable to connect to the database: ', err);
//     });

// app.get('/', (req, res) => {
//     console.log(__dirname + '/client/build/index.html');
//     res.sendFile(__dirname + '/client/build/index.html');
// });

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
    })
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
    })

    // User.create({username: username}).then(user => {
    //     console.log('Users auto generated ID:', user.id);
    // })


    res.status(200).send('Hit the Register route');
})

app.listen(port);

