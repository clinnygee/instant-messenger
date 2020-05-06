const conn = require('./database').conn;

conn.sync({logging: false, force: true});