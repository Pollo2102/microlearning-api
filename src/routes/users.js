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



module.exports = router;