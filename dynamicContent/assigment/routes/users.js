const express = require('express');
const router = express.Router();

const {usersNames} = require('./main');

router.get('/users', (req,res,next) => {
    res.render('users', {users: usersNames, pageTitle: "Users list"});
})

module.exports = router;