const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');

require('dotenv').config();


const app = express();
const port = (process.env.PORT || 8080);
const secret = (process.env.SECRET || 'instant-messenger');

app.use(express.static(path.join(__dirname, '/client/build')));


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Messenger.db',
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to DB has been estsablished successfully');
    })
    .catch(err => {
        console.log('unable to connect to the database: ', err);
    });

app.get('/', (req, res) => {
    console.log(__dirname + '/client/build/index.html');
    res.sendFile(__dirname + '/client/build/index.html');
})

app.listen(port);

