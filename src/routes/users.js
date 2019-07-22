const express = require('express');
const client = require('../postgreDB');
const User = require('../models/User.js');
const {builtinModules} = require('module');

const router = express.Router();

// GET all the users
router.get('/api/users', (request, result) => {
    client
        .query('SELECT * FROM users;')
        .then(res => {
            let users = [];
            for (let i = 0; i < res.rows.length; i++) {
                let user = new User(res.rows[i].fullname ,res.rows[i].email, res.rows[i].subscriptions);
                users.push(user);
            }
            result.send(users);
            console.log('Query successful!');
        })
        .catch(e => {
            console.error(e.stack);
            result.status(400);
            result.send(e);
        })
});

// GET the specified user
router.get('/api/users/:email', (request, result) => {
    const getQuery = 'SELECT * FROM users WHERE users.email = $1';

    client
        .query(getQuery, [request.params.email])
        .then(res => {
            let user = {};
            if (res.rows.length == 1) {
                user = new User(res.rows[0].fullname, res.rows[0].email, res.rows[0].subscriptions);
                result.send(user);
            }
            else {
                result.status(204);
                result.send(user);
            }
        })
        .catch(e => {
            console.log(e.stack);
            result.status(400);
            result.send(e);
        })
});

// POST the specified user information
router.post('/api/users', (request, result) => {
    const postQuery = 'INSERT INTO users(fullname, email, subscriptions) VALUES($1, $2, $3);';
    const { fullname, email, subscriptions} = request.body;

    client
        .query(postQuery, [fullname, email, subscriptions])
        .then(res => {
            result.status(200);
            result.send('Ok');
            console.log('Query successful');
        })
        .catch(e => {
            console.log(e.stack);
            result.status(400);
            result.send(e);
        });
});



module.exports = router;