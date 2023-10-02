const expres = require('express');
const {registerUser,loginUser} = require('../implementers/useractionimplementers');

const app = expres();

app.post('/register',registerUser);

app.post('/login',loginUser);

module.exports = app;